set -e

mkdir -p output

cd web/renderer
mkdir node_modules
yarn link

cd ../homepage
yarn --frozen-lockfile
yarn link mirror-recipes-renderer
ln -s $(readlink -f node_modules/preact) ../renderer/node_modules/preact
yarn build

cp -r build/* ../../output
