const { createProxyMiddleware } = require("http-proxy-middleware"); // occurs error if you use es6 `import`

module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.REACT_APP_API_SERVER
        ? process.env.REACT_APP_API_SERVER
        : "http://localhost:8080",
      chageOrigin: true,
    })
  );
};
