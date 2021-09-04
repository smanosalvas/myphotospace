FROM node:10

WORKDIR /opt/myphotospace/api/

COPY package.json package-lock.json ./

RUN npm install --only=production

COPY . . 

EXPOSE 9090

CMD [ "npm", "start" ]