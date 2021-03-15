const CracoLessPlugin = require('craco-less');



module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#748AB6',
            '@link-color': '#748AB6',
            '@text-color': '#5A6467',
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