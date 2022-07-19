FROM node:carbon

# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
COPY .env.example .env
RUN apt-get update; \
    apt-get install -y curl gnupg; \
    curl -sL https://deb.nodesource.com/setup_8.x | bash -; \
    apt-get install -y nodejs; \
    rm -rf /var/lib/apt/lists/*
#RUN nodejs -v
#RUN npm -v
#RUN apt install build-essential
#RUN npm install express
#RUN npm install nodemon -g --save
COPY . .

EXPOSE 4000
EXPOSE 3000
CMD [ "npm", "start" ]


