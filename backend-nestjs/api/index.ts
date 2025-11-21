import serverlessExpress from '@vendia/serverless-express';

let server: any;

export const handler = async (event, context) => {
  if (!server) {
    const { createApp } = await import('../dist/serverless.js');

    const app = await createApp();
    server = serverlessExpress({ app });
  }

  return server(event, context);
};
