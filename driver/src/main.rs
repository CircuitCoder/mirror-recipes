mod args;
mod recipe;
mod preset;

use std::{collections::HashMap, fs::File};

use recipe::*;
use args::*;
use preset::*;

#[paw::main]
fn main(args: Args) -> anyhow::Result<()> {
    env_logger::init();

    let Args {
        cmd, storage,
    } = args;

    match cmd {
        Command::Apply { preset, recipe, .. } => {
            let preset_path = preset.as_ref().map(|p| {
                let mut path = storage.clone();
                path.push("presets");
                path.push(p.to_owned() + ".yaml");
                path
            });
            let mut recipe_path = storage;
            recipe_path.push("recipes");
            recipe_path.push(recipe.clone() + ".yaml");

            let recipe_file: Recipe = serde_yaml::from_reader(File::open(&recipe_path)?)?;
            let preset_file: Option<Preset> = match preset_path {
                None => None,
                Some(p) => serde_yaml::from_reader(File::open(&p)?)?,
            };
            log::debug!("{:#?}", recipe_file);
            log::debug!("{:#?}", preset_file);

            let params = if let Some(mut pf) = preset_file {
                match pf.presets.remove(&recipe) {
                    None => {
                        println!("Preset `{}` is not applicable to recipe `{}`. Use the subcommand `show preset` to show applicable recipes.", preset.unwrap(), recipe);
                        return Err(anyhow::anyhow!("Invalid parameters"));
                    },
                    Some(inner) => inner,
                }
            } else {
                HashMap::new()
            };
            unimplemented!()
        },
        Command::List(_) => unimplemented!(),
        Command::Show(_) => unimplemented!(),
        Command::Update { presets, recipes, upstream } => unimplemented!(),
    }
}

