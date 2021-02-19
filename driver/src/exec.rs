use std::io::Write;
use std::path::Path;
use std::process::*;

pub fn exec_blocking<P: AsRef<Path>>(shell: P, script: &str) -> anyhow::Result<String> {
    let mut file = tempfile::NamedTempFile::new()?;
    file.write_all(script.as_bytes())?;

    let path = file.into_temp_path();

    let output = Command::new(shell.as_ref().as_os_str()).arg(path.as_os_str()).output()?;
    if !output.status.success() {
        return Err(anyhow::anyhow!(
            "Command failed with status {}",
            output.status
        ));
    }

    String::from_utf8(output.stdout)
        .map_err(|e| anyhow::anyhow!("Unable to parse command output as UTF-8: {}", e))
}
