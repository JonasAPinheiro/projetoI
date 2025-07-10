import express from "express";
import { EmprestimoService } from "./service/EmprestimoService";
import { RegisterRoutes } from "./route/routes";
import { setupSwagger } from "./config/swagger";
import { inicializarTabelas } from "./database/Initializer";

async function main() {
  await inicializarTabelas();

  const emprestimoService = new EmprestimoService();
  const app = express();
  app.use(express.json());

  const PORT = process.env.PORT ?? 3090;

  const apiRouter = express.Router();
  RegisterRoutes(apiRouter);
  app.use("/library", apiRouter);

  setupSwagger(app);

  setInterval(async () => {
    console.log("Verificando empréstimos atrasados");
    try {
      await emprestimoService.verificarAtrasosPendentes();
      console.log("Verificação de suspensões concluída");
    } catch (err) {
      console.error("Erro na verificação automática:", err);
    }
  }, 1000 * 60 * 60 * 24);

  app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
}

main().catch((error: any) => {
  console.error("Erro ao iniciar a aplicação:", error);
});

