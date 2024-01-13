const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
 entry: './src/index.tsx',
 output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
 },
 module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
 },
 resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
 plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
 ],
 devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
    open: true,
 },
};