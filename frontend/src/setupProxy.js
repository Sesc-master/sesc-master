const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/graphql',
        createProxyMiddleware({
            target: 'https://sescmaster.ru/graphql',
            changeOrigin: true,
        })
    );
};