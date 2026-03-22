import app from "./src/app.js";
import { testConnection } from "./src/database/pool.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await testConnection();
    console.log("Conectado a la base de datos MySQL local");
  } catch (error) {
    console.error("No se pudo conectar a MySQL", error);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Servidor encendido en el puerto ${PORT}`);
  });
};

startServer();
