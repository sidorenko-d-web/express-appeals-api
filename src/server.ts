import { createApp } from './app';
import { connectDB, prisma } from './config/db';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB(); // Подключение к sqlite

  const app = createApp();
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer().catch(async (err) => {
  console.error('Failed to start server:', err);
  await prisma.$disconnect(); // Закрываем соединение при ошибке
  process.exit(1);
});