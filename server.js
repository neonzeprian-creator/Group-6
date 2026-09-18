import 'dotenv/config';
import app from './src/app.js';
import db from './src/config/database.js';

const PORT = process.env.SERVER_PORT || 3000;

const startServer = async () => {
  await db.query('SELECT 1');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error('Unable to start server:', error.message);
  process.exit(1);
});