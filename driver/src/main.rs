mod args;
mod exec;
mod params;
mod preset;
mod recipe;

use std::{collections::HashMap, fs::File, path::PathBuf};

use args::*;
use colored::Colorize;
use preset::*;
use recipe::*;

#[paw::main]
fn main(args: Args) {
    env_logger::init();

    std::process::exit(match inner_main(args) {
        Ok(()) => 0,
        Err(e) => {
            log::error!("{:?}", e);
            1
        }
    });
}

fn inner_main(args: Args) -> anyhow::Result<()> {
    let Args { cmd, storage } = args;

    ctrlc::set_handler(move || {
        println!("{}", "".clear());
        std::process::exit(1);
    })?;

    match cmd {
        Command::Apply {
            preset,
            recipe,
            params: cli_params,
            non_interactive,
            no_overwrite_backup,
            dry_run,
            shell,
            from,
        } => {
            let shell = shell.or_else(|| std::env::var_os("SHELL").map(PathBuf::from));
            let shell = shell.ok_or_else(|| {
                anyhow::anyhow!(
                    "Cannot determine shell path from $SHELL. Use -s to specify explicitly."
                )
            })?;

            let preset_path = preset.as_ref().map(|p| {
                let mut path = storage.clone();
                path.push("presets");
                path.push(p.to_owned() + ".yaml");
                path
            });
            let mut recipe_path = storage;
            recipe_path.push("recipes");
            recipe_path.push(recipe.clone() + ".yaml");

            let recipe_file: Recipe = serde_yaml::from_reader(
                File::open(&recipe_path)
                    .map_err(|_| anyhow::anyhow!("Recipe not found: {}", recipe))?,
            )?;
            let preset_file: Option<Preset> = match preset_path {
                None => None,
                Some(p) => serde_yaml::from_reader(File::open(&p).map_err(|_| {
                    anyhow::anyhow!("Preset not found: {}", preset.clone().unwrap())
                })?)?,
            };

            let mut params_stash: HashMap<String, String> = preset::env_detect().into();

            if let Some(Preset {
                mut presets,
                shared,
            }) = preset_file
            {
                if let Some(inner) = shared {
                    params_stash.extend(inner);
                }

                if let Some(inner) = presets.remove(&recipe) {
                    params_stash.extend(inner.into_iter());
                } else {
                    log::error!("Preset `{}` is not applicable to recipe `{}`. Use the subcommand `show preset` to show applicable recipes.", preset.unwrap(), recipe);
                    return Err(anyhow::anyhow!("Invalid parameters"));
                }
            }

            params_stash.extend(cli_params.into_iter());

            // Expand all params provided by the stash
            let mut params_expanded = params::expand_params(&params_stash)?;

            let Recipe {
                params: param_spec,
                steps,
                procedures,
            } = recipe_file;

            // Validate params
            let mut invalid_params = Vec::new();
            let mut params = HashMap::new();
            for (key, spec) in param_spec {
                let cli_value = params_expanded.remove(key.as_str());

                if non_interactive {
                    match spec.get_non_interactive(cli_value, &shell)? {
                        Some(v) => {
                            params.insert(key, v);
                        }
                        None => {
                            invalid_params.push(key);
                        }
                    }
                } else {
                    let value = spec.get_interactive(&key, cli_value, &shell)?;
                    params.insert(key, value);
                }
            }

            if !invalid_params.is_empty() {
                return Err(anyhow::anyhow!(
                    "Invalid parameters: {}",
                    invalid_params.join(", ")
                ));
            }

            // Find matching proc
            let proc = procedures.into_iter().find(|p| p.test(&params));
            let proc = proc.ok_or_else(|| anyhow::anyhow!("No matching procedure found"))?;

            log::debug!("{:#?}", params);
            log::debug!("{:#?}", proc);
            log::debug!("{:#?}", steps);

            let step_cnt = proc.steps.len();
            if from > step_cnt {
                println!("{}: --from option value is out of range, as the procedure only have {} steps.", "Error".red(), step_cnt);
                return Err(anyhow::anyhow!("Invalid from argument"));
            }

            let step_cnt_str = format!("/{}", step_cnt);
            for (idx, step) in proc.steps.into_iter().enumerate() {
                if idx < from - 1 { continue; }

                let step = match step {
                    ProcStep::Ref { r#do: key } => steps
                        .get(&key)
                        .ok_or_else(|| anyhow::anyhow!("Step ref not found: {}", key))?,
                    ProcStep::Inline(ref step) => step,
                };

                println!("\n{} {}{}", "Step".green(), idx + 1, step_cnt_str.dimmed());
                step.execute(
                    non_interactive,
                    !no_overwrite_backup,
                    dry_run,
                    &shell,
                    &params,
                )?;
            }
            Ok(())
        }
        Command::List(_) => unimplemented!(),
        Command::Show(_) => unimplemented!(),
        Command::Update {
            presets,
            recipes,
            upstream,
        } => unimplemented!(),
    }
}
