FROM node:10

ENV GCLOUD_STORAGE_BUCKET=myphotospace-bucket

WORKDIR /opt/myphotospace/api/

COPY package.json package-lock.json ./

RUN npm install --only=production

COPY . . 

EXPOSE 9090
EXPOSE 8080

CMD [ "npm", "start" ]