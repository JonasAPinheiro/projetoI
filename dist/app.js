"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT ?? 3090;
app.get("/", (req, res) => {
    res.status(200).json({ message: "Deu certo" });
});
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
