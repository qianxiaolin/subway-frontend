const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
	outputDir: 'dist',
	indexPath: 'index.html',
	lintOnSave: false,
    transpileDependencies: true,
})



