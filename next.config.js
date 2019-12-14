const { withPlugins, optional } = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

const {
  PHASE_PRODUCTION_BUILD,
  PHASE_DEVELOPMENT_SERVER
} = require('next/constants');

module.exports = withPlugins([
  [optimizedImages, {
    inlineImageLimit: 1024
  }],

  [optional(() => require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })), [PHASE_PRODUCTION_BUILD]]
], {
  // next config
  compress: false, // handled by nginx
})
