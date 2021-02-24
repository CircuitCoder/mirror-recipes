use std::{error::Error, path::PathBuf};

use structopt::StructOpt;

// TODO: recipe/preset storage, update command?

#[derive(StructOpt)]
pub struct Args {
    /// Path the the storage
    #[structopt(long, short, default_value = "~/.local/share/mirror-recipes")]
    pub storage: PathBuf,

    #[structopt(subcommand)]
    pub cmd: Command,
}

#[derive(StructOpt)]
pub enum Command {
    Apply {
        recipe: String,
        preset: Option<String>,

        /// Parameters set through CLI interface
        /// These parameters will be validated as if they are passed using the TUI prompt, and will reprompt if they are misformatted
        #[structopt(short, long="param", parse(try_from_str = parse_key_val), number_of_values = 1)]
        params: Vec<(String, String)>,
        /// Actually does nothing

        /// Specify a shell to use for scripts and manual steps. By default this is the same as $SHELL
        #[structopt(short, long)]
        shell: Option<PathBuf>,

        /// Non interactive. Hard error on all absent / misformat parameters. Will overwrite backup files.
        /// Also errors when the recipe cannot run under non-interactive mode (e.g. has `manually` steps)
        #[structopt(short, long)]
        non_interactive: bool,

        /// Change the default behavior of overwriting backup files to discard old content during non-interactive usage
        #[structopt(long)]
        no_overwrite_backup: bool,

        /// Actually does nothing
        #[structopt(short, long)]
        dry_run: bool,

        /// Skip steps in the beginning. e.g. --from 2 will skip the first step.
        /// Useful if the script failed previously, and the problem have been fixed manually
        /// Note tha this argument is 1-based
        #[structopt(long, default_value="1")]
        from: usize,
    },

    List(ListCommand),
    Show(ShowCommand),

    Update {
        #[structopt(long, short)]
        presets: bool,

        #[structopt(long, short)]
        recipes: bool,

        #[structopt(long, short)]
        upstream: String,
    },
}

#[derive(StructOpt)]
pub enum ListCommand {
    Recipes,
    Presets,
}

#[derive(StructOpt)]
pub enum ShowCommand {
    Recipes { recipe: String },

    Presets { preset: String },
}

fn parse_key_val<T, U>(s: &str) -> Result<(T, U), Box<dyn Error>>
where
    T: std::str::FromStr,
    T::Err: Error + 'static,
    U: std::str::FromStr,
    U::Err: Error + 'static,
{
    let pos = s
        .find('=')
        .ok_or_else(|| format!("invalid KEY=value: no `=` found in `{}`", s))?;
    Ok((s[..pos].parse()?, s[pos + 1..].parse()?))
}
