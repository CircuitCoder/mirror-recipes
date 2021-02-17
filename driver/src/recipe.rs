use std::collections::HashMap;

use serde::Deserialize;

#[derive(Deserialize, Debug)]
pub struct Recipe {
  pub params: HashMap<String, Param>,
  pub steps: HashMap<String, Step>,
  pub procedures: Vec<Proc>,
}

#[derive(Deserialize, Debug)]
#[serde(untagged)]
pub enum PossibleValues {
  Enum(Vec<String>),
  Regex(String),
}

#[derive(Deserialize, Debug)]
#[serde(rename_all="kebab-case")]
pub struct Param {
  pub obtained_by: Option<String>,
  pub description: Option<String>,
  pub possible_values: Option<PossibleValues>,
  pub default: Option<String>,
}

#[derive(Deserialize, Debug)]
#[serde(untagged)]
pub enum Step {
  Manually(#[serde(rename="manually")] String),

  #[serde(rename_all="kebab-case")]
  ReplaceFile {
    replace_file: String,
    with: String,
  },

  Run {
    run: String,
    with: Option<String>,
  },
}
#[derive(Deserialize, Debug)]
#[serde(untagged)]
pub enum ProcStep {
  Ref(#[serde(rename="do")] String),
  Inline(Step),
}

#[derive(Deserialize, Debug)]
pub struct Proc {
  pub when: Option<HashMap<String, String>>,
  pub steps: Vec<ProcStep>,
}