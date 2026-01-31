FROM node:18-alpine

WORKDIR /app

# Install wireguard tools
RUN apk add --no-cache wireguard-tools

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "worker.js"]
