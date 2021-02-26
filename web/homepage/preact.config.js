export default function (config, env, helpers) {
  config.module.rules.push({
    test: /\.ya?ml$/,
    type: 'json',
    use: 'yaml-loader',
  });
  config.resolve.extensions.push('.yaml');
  config.resolve.extensions.push('.yml');
}
