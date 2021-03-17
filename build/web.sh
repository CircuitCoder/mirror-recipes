set -e

mkdir -p output

cd web/renderer
yarn link

cd web/homepage
yarn --frozen-lockfile
yarn link mirror-recipes-renderer
yarn build

cp -r build/* ../../output
