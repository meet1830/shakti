const {
  getDefaultConfig,
  mergeConfig,
} = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const defaultConfig =
  getDefaultConfig(__dirname);
const {
  assetExts,
  sourceExts,
} = defaultConfig.resolver;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {},
  resolver: {
    assetExts: [
      ...assetExts.filter(
        ext => ext !== 'svg',
      ),
      'obj',
      'mtl',
      'mp3',
      'JPG',
      'vrx',
      'hdr',
      'gltf',
      'glb',
      'bin',
      'arobject',
      'hdr',
      'gif',
    ],
    sourceExts: [
      ...sourceExts,
      'svg',
    ],
  },
};

module.exports = wrapWithReanimatedMetroConfig(mergeConfig(
  defaultConfig,
  config,
));
