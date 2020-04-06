FROM node:13

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
