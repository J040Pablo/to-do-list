// Importações
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Importar suas rotas
import userRoutes from "./src/routes/UserRouter.js";
import taskRoutes from "./src/routes/TaskRouter.js";

// Configurações iniciais
dotenv.config(); // Carregar variáveis de ambiente
const app = express();

// Conexão com o banco de dados e inicialização do servidor
const uri = process.env.MONGO_URI || "mongodb://localhost:27017/to-do-list"; // Usar a variável de ambiente ou um valor default

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Conexão com o MongoDB e inicialização do servidor
const PORT = process.env.PORT || 3000;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Conectado ao MongoDB");
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((error) => console.log("Erro ao conectar ao MongoDB:", error));
