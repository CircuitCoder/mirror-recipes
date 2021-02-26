mkdir -p output

tar -czf output/presets.tgz presets
tar -czf output/recipes.tgz presets
sha256sum ./output/presets.tgz > ./output/presets.tgz.sha256
sha256sum ./output/recipes.tgz > ./output/presets.tgz.sha256
