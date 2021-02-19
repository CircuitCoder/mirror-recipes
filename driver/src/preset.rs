use serde::Deserialize;
use std::collections::HashMap;

#[derive(Deserialize, Debug)]
pub struct Preset {
    pub presets: HashMap<String, HashMap<String, String>>,
}
