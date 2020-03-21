

const { 
    override,
    addLessLoader,
    fixBabelImports,
    addDecoratorsLegacy
} = require('customize-cra')


const modifyVars = require('./lessVars')

module.exports = override(
    addLessLoader({
        javascriptEnabled: true,
        modifyVars
    }),
    addDecoratorsLegacy(),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
)