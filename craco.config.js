const CracoLessPlugin = require('craco-less');



module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#c8e3f5',
            '@link-color': '#c8e3f5',
            '@text-color': '#8c979a',
            '@font-family': 'Source Sans Pro',
            '@layout-header-background': '#415881',
          },
            
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};