# mirror-recipes

This is a WIP effort to provider general recipes for applying mirrors of various opensource projects. The recipes can be executed (with a driver) as a script, used as a source to render help entries, or directly used as a reference for command-line users.

## Well-known parameters names
Some special parameters are automatically detected in a best-effort manner. These include:

- ARCH: Host archetecture
- OS: Host OS
- DIST: Host Linux distribution (Only when running on Linux)

Note that these parameters are just plain parameters in other aspects. So to use them, script must list them in the params sections.

## Site presets
Well-known mirrors have presets for various recipes. For example, using the TUNA preset on the ubuntu recipe avoids manually setting the BASE parameter.

## Step types
A step may have one of the following three types:

- replace-file: Replace(or create) a file at a specific path
- run: Run a command/script (optionally specifying a interpreter)
- manually: Do something manually. Driver will spin up a shell

## Decisions to be made
This is a WIP effort. Some important design descisions are still to be made:

- [ ] Recipes are also intended to serve as manuals. How to do i18n?
- [ ] Do we need complex procedure conditions? (Beyond AND-ing param checks)
- [ ] Do we need a way to skip a certain step (in a procedure or in general)?
  - [x] Option `--from` has been added to driver
- [ ] Embedding procedures! (It's getting close to being turing-complete)
- [x] Well-known script interpreter names? (Optionally for highlighting code chunks)
  - Now interpreters are searched within PATH, so we can use well-known names
- An POC driver is written in Rust, so we get CLI options / readline / highlighting easily. How to distribute statically-linked executables to multiple OSes?
- [x] Recursive variable expansion?
- [ ] Preset inheritance
- [ ] Packed preset/recipe distribution for simpler updating
- [ ] Viewing recipe with driver
