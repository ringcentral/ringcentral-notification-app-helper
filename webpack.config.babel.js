const defaultConfig = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.ts',
  output: {
    filename: 'ringcentral-notification-integration-helper.js',
    library: 'RingCentralNotificationIntegrationHelper',
    libraryTarget: 'umd',
    globalObject: 'this' // fix window undefined issue in node
  },
  resolve: {
    fallback: {
      url: require.resolve('url')
    },
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  }
}

export default defaultConfig
