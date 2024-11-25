FROM node:16

# Uygulama dizinine geç
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama dosyalarını kopyala
COPY . .

# Uygulamayı başlat
CMD ["npm", "start"]

EXPOSE 5000
