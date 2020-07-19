module.exports = {
    mongodbMemoryServerOptions: {
        instance: {
            dbName: 'gameshare'
        },
        binary: {
            version: '4.2.0',
            skipMD5: true
        },
        autoStart: false
    }
}