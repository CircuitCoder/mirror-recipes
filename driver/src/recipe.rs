use colored::Colorize;
use serde::Deserialize;
use serde_with::serde_as;
use std::{
    collections::HashMap,
    ffi::OsString,
    fs::OpenOptions,
    io::Write,
    path::{Path, PathBuf},
};

#[derive(Deserialize, Debug)]
pub struct Recipe {
    pub params: HashMap<String, Param>,
    pub steps: HashMap<String, Step>,
    pub procedures: Vec<Proc>,
}

#[serde_as]
#[derive(Deserialize, Debug)]
#[serde(untagged)]
pub enum PossibleValue {
    Enum(Vec<String>),
    Regex(#[serde_as(as = "serde_with::DisplayFromStr")] regex::Regex),
}

#[derive(Deserialize, Debug)]
#[serde(rename_all = "kebab-case")]
pub enum DefaultValue {
    ObtainedBy(String),
    Default(String),
}

#[derive(Deserialize, Debug)]
#[serde(rename_all = "kebab-case")]
pub struct Param {
    pub description: Option<String>,
    pub possible_value: Option<PossibleValue>,

    #[serde(flatten)]
    pub default: Option<DefaultValue>,
}

#[derive(Deserialize, Debug)]
#[serde(untagged)]
pub enum Step {
    Manually(#[serde(rename = "manually")] String),

    Replace { replace: String, with: String },

    Append { append: String, with: String },

    Run { run: String, with: Option<String> },
}
#[derive(Deserialize, Debug)]
#[serde(untagged)]
pub enum ProcStep {
    Ref { r#do: String },
    Inline(Step),
}

#[derive(Deserialize, Debug)]
pub struct Proc {
    pub when: Option<HashMap<String, String>>,
    pub steps: Vec<ProcStep>,
}

impl Step {
    pub fn execute<P: AsRef<Path>>(
        &self,
        non_interactive: bool,
        default_replace_backup: bool,
        dry_run: bool,
        shell: P,
        params: &HashMap<String, String>,
    ) -> anyhow::Result<()> {
        match self {
            Step::Manually(hint) => {
                if non_interactive {
                    println!(
                        "{}: Manual steps cannot be executed in non-interactive mode.",
                        "Error".red()
                    );
                    println!("You may follow the hint after the script exists, and then use the `--from` option to skip this step and previous steps.");
                    return Err(anyhow::anyhow!("Manual step in non-interactive mode"));
                }

                println!("{} do the following:", "Manually".magenta());
                for line in hint.trim().lines() {
                    println!("> {}", line);
                }

                loop {
                    println!("{}: Spin up a shell", "S".magenta());
                    println!("{}: Cancel and stop the recipe now", "N".magenta());
                    println!("{}: Do nothing and continue", "C".magenta());

                    let input = dialoguer::Input::new()
                        .with_prompt("S/N/C")
                        .validate_with(|input: &String| -> Result<(), &str> {
                            if input.len() != 1 {
                                Err("Please input only one character")
                            } else {
                                let c = input.chars().next().unwrap();
                                let c = c.to_ascii_uppercase();
                                if c == 'S' || c == 'C' || c == 'N' {
                                    Ok(())
                                } else {
                                    Err("Please choose one of the options")
                                }
                            }
                        })
                        .interact()?;

                    let action = input.chars().next().unwrap().to_ascii_uppercase();

                    match action {
                        'S' => {
                            crate::exec::exec_blocking_pipe(&shell, None)?;
                        }
                        'C' => break Ok(()),
                        'N' => break Err(anyhow::anyhow!("User canceled")),
                        _ => unreachable!(),
                    }

                    println!("If you are done, select {}", "C".magenta());
                }
            }
            Step::Replace { replace, with } => Self::modify_file(
                &replace,
                &with,
                false,
                non_interactive,
                default_replace_backup,
                dry_run,
                shell,
                params,
            ),
            Step::Append { append, with } => Self::modify_file(
                &append,
                &with,
                true,
                non_interactive,
                default_replace_backup,
                dry_run,
                shell,
                params,
            ),
            Step::Run { run, with } => {
                // Interpolate
                let mut interpolated = crate::params::expand(run, params)?;

                loop {
                    println!("{}:", "Running".magenta());

                    bat::PrettyPrinter::new()
                        .input_from_bytes(interpolated.as_bytes())
                        .line_numbers(true)
                        .language(with.as_ref().map_or("bash", |inner| inner.as_str()))
                        .grid(true)
                        .print()
                        .unwrap();

                    if let Some(w) = with.as_ref() {
                        println!("{}: Run with {}", "Y".magenta(), w.yellow());
                    } else {
                        println!("{}: Run with current shell", "Y".magenta());
                    }
                    println!("{}: Run the script with custom interpreter", "I".magenta());
                    println!("{}: Cancel and stop the recipe now", "N".magenta());
                    println!("{}: Spin up a shell to examine\n   The content above will be available in a temporary file. Edits will be reflected.", "S".magenta());
                    println!("{}: Do nothing and continue", "C".magenta());

                    let action = if non_interactive {
                        let act = "Y";
                        println!("Choosing {}", act.magenta());
                        act.chars().next().unwrap()
                    } else {
                        let prompt = "Y/I/N/S/C";
                        let input = dialoguer::Input::new()
                            .with_prompt(prompt)
                            .validate_with(|input: &String| -> Result<(), &str> {
                                if input.len() != 1 {
                                    Err("Please input only one character")
                                } else {
                                    let c = input.chars().next().unwrap();
                                    let c = c.to_ascii_uppercase();
                                    if c == 'Y' || c == 'I' || c == 'S' || c == 'C' || c == 'N' {
                                        Ok(())
                                    } else {
                                        Err("Please choose one of the options")
                                    }
                                }
                            })
                            .interact()?;

                        input.chars().next().unwrap().to_ascii_uppercase()
                    };
                    match action {
                        'C' => break Ok(()),
                        'N' => break Err(anyhow::anyhow!("User canceled")),
                        'S' => {
                            // TODO: suffix
                            let mut file = tempfile::NamedTempFile::new()?;
                            file.write_all(interpolated.as_bytes())?;

                            let path = file.into_temp_path();
                            let path_disp = format!("{}", path.display());
                            println!("Script available at {}", path_disp.blue());

                            crate::exec::exec_blocking_pipe(&shell, None)?;

                            let opened = std::fs::read_to_string(path);
                            if let Ok(inner) = opened {
                                interpolated = inner;
                            } else {
                                println!(
                                    "{}: {} is not readable anymore.",
                                    "Warning".yellow(),
                                    path_disp.blue()
                                );
                            }
                        }
                        'Y' | 'I' => {
                            if dry_run {
                                break Ok(());
                            }

                            let interpreter = if action == 'I' {
                                let mut input = dialoguer::Input::new();
                                input.with_prompt("Using");
                                if let Some(inner) = with {
                                    input.default(inner.clone()).show_default(true);
                                }
                                let result = input.interact()?;

                                if result == "" {
                                    None
                                } else {
                                    Some(result)
                                }
                            } else {
                                with.clone()
                            };

                            // Lookup
                            let buf: PathBuf;
                            let lookup: &dyn AsRef<Path> = if let Some(ref int) = interpreter {
                                match which::which(int) {
                                    Err(_) => {
                                        println!("{}: Interpreter {} not found in PATH or not executable", "Error".red(), int.blue());
                                        continue;
                                    }
                                    Ok(p) => {
                                        buf = PathBuf::from(p);
                                        &buf
                                    }
                                }
                            } else {
                                &shell
                            };

                            let path_disp = format!("{}", lookup.as_ref().display());
                            println!("{} {}", "Interpreter found at:".dimmed(), path_disp.blue());

                            crate::exec::exec_blocking_pipe(lookup, Some(&interpolated))?;

                            break Ok(());
                        }
                        _ => panic!("Unexpected input {}", action),
                    }
                }
            }
        }
    }

    fn modify_file<P1: AsRef<Path>, P2: AsRef<Path>>(
        path: P1,
        content: &str,
        append: bool,
        non_interactive: bool,
        default_replace_backup: bool,
        dry_run: bool,
        shell: P2,
        params: &HashMap<String, String>,
    ) -> anyhow::Result<()> {
        let path_disp = format!("{}", path.as_ref().display());

        let mut interpolated = crate::params::expand(content, params)?;

        // Detect backup file
        let mut backup_file = path.as_ref().to_path_buf();
        let mut backup_file_name = match backup_file.file_name() {
            None => OsString::new(),
            Some(filename) => OsString::from(filename),
        };
        backup_file_name.push(".mr-bak");
        backup_file.set_file_name(backup_file_name);

        let formatted_backup_file = format!("{}", backup_file.display());

        loop {
            if append {
                println!(
                    "{} {} the following:",
                    "Append to".magenta(),
                    path_disp.blue()
                )
            } else {
                println!("{} {} with:", "Replace".magenta(), path_disp.blue())
            }

            // Ignore printed result
            bat::PrettyPrinter::new()
                .input_from_bytes(interpolated.as_bytes())
                .line_numbers(true)
                .grid(true)
                .print()
                .unwrap();

            // TODO: check if already the same
            let target_exists = path.as_ref().exists();
            let backup_exists = backup_file.exists();

            if target_exists && backup_exists {
                println!(
                    "Backup file at {} already exists. Choose one action:",
                    formatted_backup_file.blue()
                );
                println!(
                    "{}: Keep current file at {}",
                    "K".magenta(),
                    formatted_backup_file.blue()
                );
                println!("{}: Overwrite", "O".magenta());
            } else {
                if target_exists {
                    println!(
                        "Original file will be moved to {}. Choose one action:",
                        formatted_backup_file.blue()
                    );
                } else {
                    println!("A new file will be created. Choose one action:");
                }
                println!("{}: Confirm", "Y".magenta());
            }
            println!("{}: Cancel and stop the recipe now", "N".magenta());
            println!("{}: Spin up a shell to examine\n   The content above will be available in a temporary file. Edits will be reflected.", "S".magenta());
            println!("{}: Do nothing and continue", "C".magenta());

            let prompt = if target_exists && backup_exists {
                "K/O/N/S/C"
            } else {
                "Y/N/S/C"
            };

            let action = if non_interactive {
                let act = if target_exists && backup_exists {
                    if default_replace_backup {
                        "O"
                    } else {
                        "K"
                    }
                } else {
                    "Y"
                };

                println!("Choosing {}", act.magenta());
                act.chars().next().unwrap()
            } else {
                let input = dialoguer::Input::new()
                    .with_prompt(prompt)
                    .validate_with(|input: &String| -> Result<(), &str> {
                        if input.len() != 1 {
                            Err("Please input only one character")
                        } else {
                            let c = input.chars().next().unwrap();
                            let c = c.to_ascii_uppercase();
                            if target_exists && backup_exists && (c == 'K' || c == 'O') {
                                Ok(())
                            } else if !(target_exists && backup_exists) && c == 'Y' {
                                Ok(())
                            } else if c == 'S' || c == 'C' || c == 'N' {
                                Ok(())
                            } else {
                                Err("Please choose one of the options")
                            }
                        }
                    })
                    .interact()?;

                input.chars().next().unwrap().to_ascii_uppercase()
            };

            match action {
                'C' => break Ok(()),
                'N' => break Err(anyhow::anyhow!("User canceled")),
                'S' => {
                    let mut file = tempfile::NamedTempFile::new()?;
                    file.write_all(interpolated.as_bytes())?;

                    let path = file.into_temp_path();
                    let path_disp = format!("{}", path.display());
                    println!("Content available at {}", path_disp.blue());

                    crate::exec::exec_blocking_pipe(&shell, None)?;

                    let opened = std::fs::read_to_string(path);
                    if let Ok(inner) = opened {
                        interpolated = inner;
                    } else {
                        println!(
                            "{}: {} is not readable anymore.",
                            "Warning".yellow(),
                            path_disp.blue()
                        );
                    }
                }
                'Y' | 'O' | 'K' => {
                    if dry_run {
                        break Ok(());
                    }

                    if target_exists && action != 'K' {
                        std::fs::copy(&path, &backup_file)?;
                    }

                    // TODO: restore umask
                    let mut f = if append {
                        OpenOptions::new().append(true).create(true).open(&path)?
                    } else {
                        std::fs::File::create(&path)?
                    };
                    f.write_all(interpolated.as_bytes())?;

                    break Ok(());
                }
                _ => panic!("Unexpected input {}", action),
            }
        }
    }
}

impl Proc {
    pub fn test(&self, params: &HashMap<String, String>) -> bool {
        let conds = if let Some(c) = self.when.as_ref() {
            c
        } else {
            return true;
        };

        for (k, v) in conds.iter() {
            if params.get(k) != Some(v) {
                return false;
            }
        }

        true
    }
}
enum ParamSelect<'s> {
    Execute(String),
    Value(&'s str),
    Input(Option<String>),
}

impl Param {
    pub fn get_non_interactive<P: AsRef<Path>>(
        self,
        default: Option<String>,
        shell: P,
    ) -> anyhow::Result<Option<String>> {
        if let Some(s) = default {
            if self.possible_value.validate(&s) {
                return Ok(Some(s));
            }
        }

        match self.default {
            None => Ok(None),
            Some(DefaultValue::ObtainedBy(s)) => {
                let result = crate::exec::exec_blocking_output(&shell, Some(&s))?;
                Ok(Some(result.trim().to_owned()))
            }
            Some(DefaultValue::Default(v)) => Ok(Some(v)),
        }
    }

    pub fn get_interactive<P: AsRef<Path>>(
        self,
        name: &str,
        default: Option<String>,
        shell: P,
    ) -> anyhow::Result<String> {
        if let Some(s) = default {
            if self.possible_value.validate(&s) {
                return Ok(s);
            }
        }

        let mut options = Vec::new();
        match self.default {
            Some(DefaultValue::Default(d)) => return Ok(d),
            Some(DefaultValue::ObtainedBy(s)) => {
                options.push(ParamSelect::Execute(s));
            }
            None => {}
        };

        if let Some(PossibleValue::Enum(ref vals)) = self.possible_value {
            for val in vals.iter() {
                options.push(ParamSelect::Value(val.as_str()));
            }
        } else if let Some(PossibleValue::Regex(ref regex)) = self.possible_value {
            options.push(ParamSelect::Input(Some(regex.to_string())));
        } else {
            options.push(ParamSelect::Input(None));
        }

        let items: Vec<_> = options
            .iter()
            .map(|o| match o {
                ParamSelect::Execute(s) => {
                    let fmt = fmt_shell(s.as_str());
                    format!("{} {}", "Execute".magenta(), fmt.as_str().clear())
                }
                ParamSelect::Value(val) => {
                    format!("\"{}\"", val.blue())
                }
                ParamSelect::Input(Some(r)) => {
                    format!("{}, matching {}", "Input manually".magenta(), r.cyan())
                }
                ParamSelect::Input(None) => {
                    format!("{}", "Input manually".magenta())
                }
            })
            .collect();

        let prompt = format!("{} {}", "Parameter".green(), name);

        loop {
            // Render options
            let result = dialoguer::Select::new()
                .with_prompt(&prompt)
                .items(&items)
                .interact()?;
            let result = &options[result];
            let result = match result {
                ParamSelect::Execute(s) => {
                    let r = crate::exec::exec_blocking_output(&shell, Some(&s))?;
                    let r = r.trim().to_string();
                    println!("{} \"{}\"", "Execution result:".clear().dimmed(), r.blue());
                    r
                }
                ParamSelect::Value(v) => v.to_string(),
                ParamSelect::Input(_) => dialoguer::Input::new().interact()?,
            };

            if self.possible_value.validate(&result) {
                return Ok(result);
            }
        }
    }
}

impl PossibleValue {
    pub fn validate(&self, val: &str) -> bool {
        match self {
            PossibleValue::Enum(values) => values.iter().any(|v| v == val),
            PossibleValue::Regex(regex) => regex.is_match(val),
        }
    }
}

trait ValidateExt {
    fn validate(&self, val: &str) -> bool;
}

impl ValidateExt for Option<PossibleValue> {
    fn validate(&self, val: &str) -> bool {
        self.as_ref().map(|pv| pv.validate(val)).unwrap_or(true)
    }
}

fn fmt_shell(input: &str) -> String {
    use syntect::easy::HighlightLines;
    use syntect::highlighting::{Style, ThemeSet};
    use syntect::parsing::SyntaxSet;
    use syntect::util::{as_24_bit_terminal_escaped, LinesWithEndings};

    // Load these once at the start of your program
    let ps = SyntaxSet::load_defaults_nonewlines();
    let ts = ThemeSet::load_defaults();

    let syntax = ps.find_syntax_by_extension("sh").unwrap();
    let theme = ts.themes["Solarized (dark)"].clone();
    // theme.settings.background = None;
    let mut h = HighlightLines::new(syntax, &theme);

    let mut collected = String::new();
    for line in LinesWithEndings::from(input) {
        let ranges: Vec<(Style, &str)> = h.highlight(line, &ps);
        let escaped = as_24_bit_terminal_escaped(&ranges[..], false);
        collected += &escaped;
    }

    collected.split('\n').next().unwrap().to_string()
}
