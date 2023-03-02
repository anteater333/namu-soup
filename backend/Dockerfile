FROM node:18

# install git
RUN \
  apt update && \
  apt install -y git

# clone server code
WORKDIR /usr/src/app
RUN git clone https://github.com/anteater333/namu-soup.git
WORKDIR /usr/src/app/namu-soup/backend

RUN npm install

ENV PORT=$port

EXPOSE $PORT
EXPOSE 8080

COPY .env ./.env
COPY entrypoint.sh ./entrypoint.sh

RUN mkdir /logs

VOLUME [ "/logs" ]

ENTRYPOINT ["bash", "./entrypoint.sh"]