# imagem do Node (leve e rápida)
FROM node:20-alpine

# cria pasta da aplicação lá dentro
WORKDIR /app

# copia os arquivos de dependência primeiro
COPY package*.json ./

# instala as dependências
RUN npm install

# copia o resto do seu código
COPY . .

# libera a porta 3333
EXPOSE 3333

# comando para rodar a aplicação
CMD ["npm", "run", "dev"]
