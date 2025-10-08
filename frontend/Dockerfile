FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

# Käynnistä Vite dev-serveri host 0.0.0.0 jotta Docker pääsee käsiksi
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]