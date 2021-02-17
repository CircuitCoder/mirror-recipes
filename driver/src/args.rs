use std::path::PathBuf;

use structopt::StructOpt;

#[derive(StructOpt)]
pub struct Args {
  /// Path the the recipe
  pub recipe: PathBuf
}