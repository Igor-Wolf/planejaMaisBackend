# planejaMaisBackend
Backend do projeto Planeja + projeto de gerenciamento de gastos.


Para criar a imagem docker utilizei:
docker build -t <nome-da-imagem> .

Para montar o container utilizei:
docker run -d -p 3333:3333 --mount type=bind,source=".env",target=/app/.env app-node
