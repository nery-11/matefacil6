# Usa una imagen oficial de Node.js como base
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia todo el contenido excepto lo que esté en .dockerignore
COPY . .

# Expone el puerto en el que corre la aplicación (ajusta según tu app)
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación
CMD ["node", "server.js"]
