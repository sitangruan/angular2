# Build stage
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

# Serve stage
FROM nginx:1.25-alpine
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist/angular2/browser /usr/share/nginx/html
RUN printf 'server {listen 80; root /usr/share/nginx/html; location / { try_files $uri $uri/ /index.html; }}' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
