mod args;
mod recipe;
mod preset;

use std::{collections::HashMap, fs::File};

use recipe::*;
use args::*;
use preset::*;

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
    let Args {
        cmd, storage,
    } = args;

    match cmd {
        Command::Apply {
            preset,
            recipe,
            params,
            non_interactive,
            no_overwrite_backup,
            dry_run,
        } => {
            let preset_path = preset.as_ref().map(|p| {
                let mut path = storage.clone();
                path.push("presets");
                path.push(p.to_owned() + ".yaml");
                path
            });
            let mut recipe_path = storage;
            recipe_path.push("recipes");
            recipe_path.push(recipe.clone() + ".yaml");

            let recipe_file: Recipe = serde_yaml::from_reader(File::open(&recipe_path).map_err(
                |_| anyhow::anyhow!("Recipe not found: {}", recipe)
            )?)?;
            let preset_file: Option<Preset> = match preset_path {
                None => None,
                Some(p) => serde_yaml::from_reader(File::open(&p).map_err(
                    |_| anyhow::anyhow!("Preset not found: {}", preset.clone().unwrap())
                )?)?,
            };
            log::debug!("{:#?}", recipe_file);
            log::debug!("{:#?}", preset_file);

            let mut joint_params = if let Some(mut pf) = preset_file {
                match pf.presets.remove(&recipe) {
                    None => {
                        log::error!("Preset `{}` is not applicable to recipe `{}`. Use the subcommand `show preset` to show applicable recipes.", preset.unwrap(), recipe);
                        return Err(anyhow::anyhow!("Invalid parameters"));
                    },
                    Some(inner) => inner,
                }
            } else {
                HashMap::new()
            };

            joint_params.extend(params.into_iter());

            unimplemented!()
        },
        Command::List(_) => unimplemented!(),
        Command::Show(_) => unimplemented!(),
        Command::Update { presets, recipes, upstream } => unimplemented!(),
    }
}

