use std::collections::HashMap;
use serde::Deserialize;

#[derive(Deserialize, Debug)]
pub struct Preset {
  pub presets: HashMap<String, HashMap<String, String>>
}