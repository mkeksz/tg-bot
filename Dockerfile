FROM node:18

ADD . /app
WORKDIR /app

RUN npm install --omit=dev

ENV PORT=8443

EXPOSE $PORT

CMD ["npm", "run", "start"]
