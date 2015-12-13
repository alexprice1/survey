module.exports = {
  context: __dirname,
  entry: {
    'admin': './private/admin/entry.jsx',
    'customer': './private/customer/entry.jsx'
  },
  output: {
      devtoolModuleFilenameTemplate: '[resourcePath]',
      devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]',
      // this is our app/assets/javascripts-old directory, which is part of the Sprockets pipeline
      path: './public/js/',
      // the filename of the compiled bundle, e.g. app/assets/javascripts-old/bundle.js
      filename: '[name].js',
      // if the webpack code-splitting feature is enabled, this is the path it'll use to download bundles
      publicPath: '/assets'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: [/node_modules/],
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  debug: true,
  displayErrorDetails: true,
  outputPathinfo: true,
  devtool: 'sourcemap'
};

