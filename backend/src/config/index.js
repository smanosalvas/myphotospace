require('dotenv').config();

const config = {
    prod: process.env.NODE_ENV,
    bucket: process.env.GCLOUD_STORAGE_BUCKET
}

module.exports = {
    config
}