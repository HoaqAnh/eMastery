const { createApp } = require('../dist/serverless');

let app;

module.exports = async (req, res) => {
  if (!app) {
    app = await createApp();
  }
  app(req, res);
};
