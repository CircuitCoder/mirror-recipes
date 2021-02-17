use std::fs::File;

mod args;
mod recipe;

use recipe::Recipe;

#[paw::main]
fn main(args: args::Args) -> anyhow::Result<()> {
    env_logger::init();

    let recipe: Recipe = serde_yaml::from_reader(File::open(&args.recipe)?)?;
    log::debug!("{:#?}", recipe);

    unimplemented!()
}

