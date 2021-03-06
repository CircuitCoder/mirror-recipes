cd web/homepage
yarn --frozen-lockfile
yarn build

cp -r build/* ../../output
