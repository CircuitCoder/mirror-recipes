use serde::Deserialize;
use std::collections::HashMap;

#[derive(Deserialize, Debug)]
pub struct Preset {
    pub presets: HashMap<String, HashMap<String, String>>,
}

pub struct ExecEnv {
  pub os: String,
  pub arch: String,
  pub dist: String,
}

pub fn env_detect() -> ExecEnv {
    let os = std::env::consts::OS;
    let arch = std::env::consts::OS;

    let dist = if os == "linux" {
        match sys_info::linux_os_release() {
            Ok(info) => info.id.unwrap_or_else(|| "linux".to_owned()),
            Err(_) => "linux".to_owned(),
        }
    } else {
        os.to_owned()
    };

    ExecEnv {
        dist,
        os: os.to_owned(),
        arch: arch.to_owned(),
    }
}

impl Into<HashMap<String, String>> for ExecEnv {
    fn into(self) -> HashMap<String, String> {
        let mut ret = HashMap::new();
        ret.insert("OS".to_string(), self.os);
        ret.insert("ARCH".to_string(), self.arch);
        ret.insert("DIST".to_string(), self.dist);
        ret
    }
}
