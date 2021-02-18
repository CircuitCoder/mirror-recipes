use std::collections::HashMap;
use serde::Deserialize;

#[derive(Deserialize, Debug)]
pub struct Preset {
  pub presets: HashMap<String, HashMap<String, String>>
}

/*
pub fn get_preset(preset: &str, recipe: &str) -> anyhow::Result<HashMap<String, String>> {
  let preset_fn = preset.to_owned() + ".yaml";
  let file = Store::get(&preset_fn).ok_or(anyhow::anyhow!("Preset \"{}\" not found\nTo show all presets, use the flag --list-presets", preset))?;
  let mut parsed: Preset = serde_yaml::from_slice(file.borrow())?;

  // One time use parsed result
  parsed.presets.remove(recipe).ok_or(anyhow::anyhow!("Recipe \"{}\" not found in preset \"{}\". To show all applicable recipies, use the flag --list-preset-recipies {}", recipe, preset, preset))
}

pub fn list_presets() -> Vec<String> {
  Store::iter().map(|file| {
    let file: &str = file.borrow();
    let path = Path::new(file);
    let basename = path.file_stem().unwrap();
    basename.to_str().unwrap().to_owned()
  }).collect()
}
*/