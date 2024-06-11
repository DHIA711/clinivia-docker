# Utiliser l'image de base Node.js pour construire l'application Angular
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --prod

# Utiliser l'image de base Nginx pour servir l'application Angular
FROM nginx:alpine
COPY --from=build /app/dist/cliniva/browser /usr/share/nginx/html
