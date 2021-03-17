set -e

mkdir -p output

# cd web/renderer
# yarn add preact --peer --frozen-lockfile

cd web/homepage
yarn --frozen-lockfile
yarn link ../renderer
yarn build

cp -r build/* ../../output
