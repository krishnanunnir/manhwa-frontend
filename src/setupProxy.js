const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({ target: process.env.REACT_APP_PROXY_HOST })
  );
  app.use(
    "/media",
    createProxyMiddleware({ target: process.env.REACT_APP_PROXY_HOST })
  );
};
