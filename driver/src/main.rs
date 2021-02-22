mod args;
mod exec;
mod preset;
mod recipe;

use std::{collections::HashMap, fs::File, path::PathBuf};

use args::*;
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

    match cmd {
        Command::Apply {
            preset,
            recipe,
            params: cli_params,
            non_interactive,
            no_overwrite_backup,
            dry_run,
            shell,
        } => {
            let shell = shell.or(std::env::var_os("SHELL").map(PathBuf::from));
            let shell = shell.ok_or(anyhow::anyhow!(
                "Cannot determine shell path from $SHELL. Use -s to specify explicitly."
            ))?;

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

            if let Some(mut pf) = preset_file {
                if let Some(inner) = pf.presets.remove(&recipe) {
                    params_stash.extend(inner.into_iter());
                } else {
                    log::error!("Preset `{}` is not applicable to recipe `{}`. Use the subcommand `show preset` to show applicable recipes.", preset.unwrap(), recipe);
                    return Err(anyhow::anyhow!("Invalid parameters"));
                }
            }

            params_stash.extend(cli_params.into_iter());

            let Recipe {
                params: param_spec,
                steps,
                procedures,
            } = recipe_file;

            // Validate params
            let mut invalid_params = Vec::new();
            let mut params = HashMap::new();
            for (key, spec) in param_spec {
                let cli_value = params_stash.remove(&key);

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

            if invalid_params.len() > 0 {
                return Err(anyhow::anyhow!("Invalid parameters: {}", invalid_params.join(", ")));
            }

            // Find matching proc
            let proc = procedures.into_iter().find(|p| p.test(&params));
            let proc = proc.ok_or(anyhow::anyhow!("No matching procedure found"))?;

            log::debug!("{:#?}", proc);
            log::debug!("{:#?}", steps);

            unimplemented!()
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
