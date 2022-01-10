const Jimp = require('jimp');

async function resize(path) {
  const image = await Jimp.read(path);
  await image.resize(250, 250, Jimp.RESIZE_BILINEAR);
  await image.writeAsync(path);
}

module.exports = resize;
