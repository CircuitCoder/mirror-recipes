use std::io::Write;
use std::path::Path;
use std::process::*;

use tempfile::TempPath;

fn prepare_cmd<P: AsRef<Path>>(
    shell: P,
    script: Option<&str>,
) -> anyhow::Result<(Command, Option<TempPath>)> {
    let mut cmd = Command::new(shell.as_ref().as_os_str());

    if let Some(s) = script {
        let mut file = tempfile::NamedTempFile::new()?;
        file.write_all(s.as_bytes())?;

        let path = file.into_temp_path();
        cmd.arg(path.as_os_str());
        Ok((cmd, Some(path)))
    } else {
        Ok((cmd, None))
    }
}

pub fn exec_blocking_output<P: AsRef<Path>>(
    shell: P,
    script: Option<&str>,
) -> anyhow::Result<String> {
    let (mut cmd, _persisted) = prepare_cmd(shell, script)?;
    let output = cmd.output()?;

    if !output.status.success() {
        return Err(anyhow::anyhow!(
            "Command failed with status {}",
            output.status
        ));
    }

    String::from_utf8(output.stdout)
        .map_err(|e| anyhow::anyhow!("Unable to parse command output as UTF-8: {}", e))
}

pub fn exec_blocking_pipe<P: AsRef<Path>>(shell: P, script: Option<&str>) -> anyhow::Result<bool> {
    let (mut cmd, _persisted) = prepare_cmd(shell, script)?;
    let status = cmd.status()?;
    Ok(status.success())
}
