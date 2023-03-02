FROM node:18

# install git
RUN \
  apt update && \
  apt install -y git

# clone server code
WORKDIR /usr/src/backend
COPY package*.json ./
RUN npm install
COPY . .

ENV PORT=$port

EXPOSE $PORT
EXPOSE 8080

RUN mkdir ./logs

VOLUME [ "/usr/src/backend/logs" ]

CMD [ "npm", "run", "start:prod" ]
