const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = {
  plugins: [
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: './src/service-worker.js', // Your custom service worker
      swDest: 'service-worker.js', // Destination in the build folder
    }),
  ],
};
