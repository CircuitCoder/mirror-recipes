set -e

mkdir -p output

cd web/renderer
yarn add preact --peer --frozen-lockfile

cd ../homepage
yarn --frozen-lockfile
yarn build

cp -r build/* ../../output
