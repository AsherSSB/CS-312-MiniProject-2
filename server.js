const ViteExpress = require('vite-express');
const app = require('./app');

const PORT = 8000;

ViteExpress.listen(app, PORT, () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);
});

