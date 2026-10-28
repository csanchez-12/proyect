FROM node:24-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package.json ./
RUN npm install --omit=dev && npm audit --omit=dev

COPY index.js ./
COPY bot.js ./

EXPOSE 3000

CMD ["node", "index.js"]