process.env.PORT = process.env.PORT || 3000;

// Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Database environment

let urlDB;

if (process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/supercafe'
} else {
    urlDB = process.env.mongoURI;
}

process.env.URLDB = urlDB;

// Token expiration date

process.env.tokenExp = 60 * 60 * 24 * 30;

// Seed (authentication secret)

process.env.SEED = process.env.SEED || 'secret'

// Google Client

process.env.CLIENT_ID = process.env.CLIENT_ID || '7284099987-s770kplc0atg46u4oj6odp431tebp4nn.apps.googleusercontent.com';