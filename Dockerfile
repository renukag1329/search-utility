FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY .env.example .env
RUN curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
RUN apt-get install nodejs
RUN apt-get install build-essential
RUN npm install express
Run npm install nodemon -g --save
RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 4000
EXPOSE 3000
CMD [ "npm", "start" ]
