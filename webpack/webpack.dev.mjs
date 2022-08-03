import {internalIpV4} from 'internal-ip'
import {merge} from 'webpack-merge'
import {getPort} from 'portfinder-sync'
import {common} from './webpack.common.mjs'

export default (env, args) => {
    return merge(common, {
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
            host: '0.0.0.0',
            port: getPort(8080),
            contentBase: './dist',
            watchContentBase: true,
            open: true,
            https: false,
            useLocalIp: true,
            disableHostCheck: true,
            overlay: true,
            noInfo: true,
            after: function (app, server, compiler) {
                const port = server.options.port
                const https = server.options.https ? 's' : ''
                const localIp = internalIpV4()
                const domain1 = `http${https}://${localIp}:${port}`
                const domain2 = `http${https}://localhost:${port}`

                console.log(`Project running at:\n  - ${domain1}\n  - ${domain2}`)
            }
        }
    })
}
