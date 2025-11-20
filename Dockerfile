# 1. Fase de Build do Código (Aqui não precisamos mais do node_modules)
FROM node:20 as builder

WORKDIR /app

# Copia tudo (incluindo package.json, package-lock.json e o código)
COPY . .

# Executa o build (mas sem instalar dependências)
RUN npm install --production=false && npm run dist

# 2. Fase Final (Imagem de Produção) - Mais leve e segura
FROM node:20-slim

WORKDIR /app

# Copia apenas o código da aplicação compilado
COPY --from=builder /app/dist ./dist

# Copia os arquivos de configuração para a instalação
COPY package.json package-lock.json* ./


RUN npm install --only=production

# Define a porta de exposição
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["node", "./dist/server.js"]