require('dotenv').config();

const { PORT } = process.env;
const MONGODB_URI = process.env.NODE_ENV === 'dev' ? process.env.MONGODB_URI_DEV : process.env.MONGODB_URI;

module.exports = { PORT, MONGODB_URI };