use std::path::PathBuf;

use structopt::StructOpt;

// TODO: recipe/preset storage, update command?

#[derive(StructOpt)]
pub struct Args {
  /// Path the the storage
  #[structopt(long, short, default_value="~/.local/share/mirror-recipes")]
  pub storage: PathBuf,

  #[structopt(subcommand)]
  pub cmd: Command,
}

#[derive(StructOpt)]
pub enum Command {
  Apply {
    recipe: String,
    preset: Option<String>,
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
  Recipes, Presets,
}

#[derive(StructOpt)]
pub enum ShowCommand {
  Recipes {
    recipe: String,
  },

  Presets {
    preset: String,
  },
}