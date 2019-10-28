process.env.PORT = process.env.PORT || 3000;

// Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Database environment

let urlDB;

if (process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/supercafe'
} else {
    urlDB = 'mongodb+srv://anabc56:pyhYxF6EtwCr97uM@cluster0-yqobm.mongodb.net/Users'
}

process.env.URLDB = urlDB;