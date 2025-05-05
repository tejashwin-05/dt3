import app from './src/app.js';

const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API base URL: http://localhost:${PORT}/api`);
  console.log(`Payment endpoints available at: http://localhost:${PORT}/api/payment/*`);
});