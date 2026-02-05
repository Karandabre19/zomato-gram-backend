// config/imagekit.js
const ImageKit = require("imagekit"); // Changed from "@imagekit/nodejs"

const imageKit = new ImageKit({ // Capital 'K' here
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

module.exports = imageKit;