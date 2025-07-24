function setupProxy({ tls }) {
  const conf = [
    {
      context: ['/api', '/services', '/management', '/v3/api-docs', '/h2-console', '/auth', '/health'],
      target: `http${tls ? 's' : ''}://localhost:8080`,
      secure: false,
      changeOrigin: tls,
    },
    {
      context: ['/sqlite-console'],
      target: `http://localhost:8092`,
      secure: false,
      changeOrigin: options.tls,
    },
  ];
  return conf;
}

module.exports = setupProxy;
