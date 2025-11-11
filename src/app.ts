import express from "express";
import cors from "cors";
import router from "./routes";

function createApp() {
    const app = express();

    //Middleware para analisar JSON
    app.use(express.json())

    // Definindo CORS globalmente para todas as rotas
    app.use(cors({
        origin: '*',  // Permite qualquer origem
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],  // Cabeçalhos permitidos
    }));

    // Suas rotas
    app.use("/api", router); // Isso aplica as rotas definidas no seu arquivo de rotas

    // Responde corretamente às requisições OPTIONS (preflight), se necessário
    app.options('*', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.status(204).end(); // Resposta 204 para o preflight
    });

    return app;
}

export default createApp;