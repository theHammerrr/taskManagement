const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './src/index.tsx',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true,
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: 'ts-loader',
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.svg$/,
            type: 'asset/inline', // or 'asset/resource' for separate files
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
      static: path.join(__dirname, 'public'),
      port: 3000,
      open: true,
   },
   optimization: {
      splitChunks: {
         cacheGroups: {
            vendor: {
               test: /[\\/]node_modules[\\/]/,
               name(module, chunks, cacheGroupKey) {
                  const moduleFileName = module
                     .identifier()
                     .split('/')
                     .reduceRight(item => item);
                  const allChunksNames = chunks.map((item) => item.name).join('~');
                  return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
               },
               chunks: 'all',
               filename: 'vendors-[contenthash].js',

            },
         },
      },
   },
};