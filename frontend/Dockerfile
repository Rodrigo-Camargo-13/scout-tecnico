# Usando imagem oficial do Node.js
FROM node:18

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Copiar o package.json e package-lock.json (se existir)
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o código da aplicação
COPY . .

# Construir a aplicação para produção
RUN npm run build

# Expor a porta que o frontend vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
