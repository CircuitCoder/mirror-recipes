# mirror-recipes
------

This is a WIP effort to provider general recipes for applying mirrors of various opensource projects. The recipes can be executed (with a driver) as a script, used as a source to render help entries, or directly used as a reference for command-line users.

## Well-known parameters names
Some special parameters are handled differently. These include:

- BASE: Mirror base. This may be expanded from an well-known shorthand (e.g. TUNA + ubuntu recipe expands to https://mirrors.tuna.tsinghua.edu.cn/ubuntu)
- ARCH: Host archetecture
- OS: Host OS
- DIST: Host Linux distribution (Only when running on Linux)

## Step types
A step may have one of the following three types:

- replace-file: Replace(or create) a file at a specific path
- run: Run a command/script (optionally specifying a interpreter)
- manually: Do something manually. Driver will spin up a shell

## Decisions to be made
This is a WIP effort. Some important design descisions are still to be made:

- Recipes are also intended to serve as manuals. How to do i18n?
- Do we need complex procedure conditions? (Beyond AND-ing param checks)
- Do we need a way to skip a certain step (in a procedure or in general)?
- Embedding procedures! (It's getting close to being turing-complete)
- Well-known script interpreter names? (Optionally for highlighting code chunks)
- An POC driver is written in Rust, so we get CLI options / readline / highlighting easily. How to distribute statically-linked executables to multiple OSes?
