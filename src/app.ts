import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT ?? 3090;

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));