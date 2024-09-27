# Use a imagem base Python 3.11
FROM python:3.11

# Defina o diretório de trabalho
WORKDIR /app

# Copie o arquivo requirements.txt para o contêiner
COPY requirements.txt .

# Instale as dependências listadas no requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copie o código da aplicação para o contêiner
COPY . .

# Baixar o script wait-for-it para garantir que o MySQL esteja pronto antes de rodar o Flask
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

# Exponha a porta 5000
EXPOSE 5000

# Comando para iniciar a aplicação Flask após garantir que o MySQL está acessível
CMD ["./wait-for-it.sh", "mysql:3306", "--", "flask", "run", "--host=0.0.0.0"]
