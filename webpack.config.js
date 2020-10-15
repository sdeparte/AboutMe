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
    .setPublicPath('/about-me/build')
    .setManifestKeyPrefix('build')
    .addEntry('homepage', './assets/js/homepage.js')
    .addEntry('technologies', './assets/js/technologies.js')
    .addEntry('realisations', './assets/js/realisations.js')
    .addEntry('curriculum', './assets/js/curriculum.js')
    .addEntry('computer', './assets/js/computer.js')
    .addEntry('smartphone', './assets/js/smartphone.js')
    .addEntry('fontawesome', './assets/css/fontawesome/fontawesome.css')
    .addEntry('bootstrap', './assets/js/bootstrap/bootstrap.min.js')
    .splitEntryChunks()
    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .autoProvidejQuery()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })
;

module.exports = Encore.getWebpackConfig();
