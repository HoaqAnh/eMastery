const serverlessExpress = require('@vendia/serverless-express');
let server;

exports.handler = async (event, context) => {
  if (!server) {
    const { createApp } = require('../dist/serverless.js');
    const app = await createApp();
    server = serverlessExpress({ app });
  }

  return server(event, context);
};
