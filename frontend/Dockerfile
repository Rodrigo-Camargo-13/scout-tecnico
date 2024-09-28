# Etapa de build
FROM node:17-alpine as build
WORKDIR /app
COPY package.json ./ 
RUN npm install
COPY . . 
RUN npm run build

# Usar nginx para servir o frontend
FROM nginx:alpine

# Copiar a configuração customizada do NGINX
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar o build do React para o NGINX
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
