use std::io::Write;
use std::path::Path;
use std::process::*;

pub fn exec_blocking<P: AsRef<Path>>(shell: P, script: Option<&str>) -> anyhow::Result<String> {
    let mut cmd = Command::new(shell.as_ref().as_os_str());

    let output = if let Some(s) = script {
        let mut file = tempfile::NamedTempFile::new()?;
        file.write_all(s.as_bytes())?;

        let path = file.into_temp_path();
        cmd.arg(path.as_os_str()).output()?
    } else {
        cmd.output()?
    };

    if !output.status.success() {
        return Err(anyhow::anyhow!(
            "Command failed with status {}",
            output.status
        ));
    }

    String::from_utf8(output.stdout)
        .map_err(|e| anyhow::anyhow!("Unable to parse command output as UTF-8: {}", e))
}

pub fn exec_blocking_shell<P: AsRef<Path>>(shell: P) -> anyhow::Result<bool> {
    let mut status = Command::new(shell.as_ref().as_os_str()).status()?;
    Ok(status.success())
}
