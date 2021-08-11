var Encore = require('@symfony/webpack-encore');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/')
    //.setPublicPath('/build')

    // @ToDo: remove in prod
    .setPublicPath('/build')
    .setManifestKeyPrefix('build')
    .addEntry('app', './assets/js/app.js')
    .addEntry('homepage', './assets/js/homepage.js')
    .addEntry('technologies', './assets/js/technologies.js')
    .addEntry('realisations', './assets/js/realisations.js')
    .addEntry('curriculum', './assets/js/curriculum.js')
    .addEntry('bubbles', './assets/js/bubbles.js')
    .addEntry('fontawesome', './assets/css/fontawesome/fontawesome.css')
    .addEntry('bootstrap', './assets/css/bootstrap/bootstrap.min.css')
    .addEntry('computer', './assets/js/classes/ComputerAnimation.js')
    .addEntry('smartphone', './assets/js/classes/SmartphoneAnimation.js')
    .addEntry('me360', './assets/js/classes/Me360Animation.js')
    .splitEntryChunks()
    .enableVueLoader()
    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .autoProvidejQuery()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .configureBabel((config) => {
        config.plugins.push('@babel/plugin-proposal-class-properties');
    })
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })
;

module.exports = Encore.getWebpackConfig();
