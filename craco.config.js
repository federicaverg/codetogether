const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#28527a',
            '@link-color': '#54748e',
            '@text-color': '#5A6467',
            '@warning-color': '#B33A3A',
            '@font-family': 'Source Sans Pro',
            '@layout-header-background': '#28527a',
            '@text-selection-bg': '#bfcdd6',
            '@font-size-base': '16px',
            '@font-size-sm': '16px',
            '@label-color': '#A2ADB8',
            '@form-item-label-font-size': '14px',
          },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};