FROM selenium/standalone-firefox

# install git
RUN \
  sudo apt update && \
  sudo apt install -y git

# install node
RUN curl -fsSL https://deb.nodesource.com/setup_17.x | sudo -E bash - && \
  sudo apt-get install -y nodejs

# clone server code
WORKDIR /home/seluser
RUN git clone https://github.com/anteater333/namu-soup.git
WORKDIR /home/seluser/namu-soup/crawler

RUN npm install

ENV PORT=$port

EXPOSE $PORT
