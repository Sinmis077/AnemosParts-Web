FROM node:25.2.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:25.2.0-alpine 
RUN npm install -g serve
RUN apk add --no-cache gettext
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY /public/config.template.js ./dist/config.template.js
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 3000
ENTRYPOINT [ "/entrypoint.sh" ]