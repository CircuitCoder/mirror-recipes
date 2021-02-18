use std::{collections::HashMap, error::Error, path::PathBuf};

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

    /// Parameters set through CLI interface
    /// These parameters will be validated as if they are passed using the TUI prompt, and will reprompt if they are misformatted
    #[structopt(short, long="param", parse(try_from_str = parse_key_val), number_of_values = 1)]
    params: Vec<(String, String)>,

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
