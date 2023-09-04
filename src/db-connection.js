const mongoose = require('mongoose');

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 30000
};

const connect = async (url) => {
    return new Promise(async (resolve, reject) => {
        const connection = await mongoose.createConnection(url, mongoOptions,
            (err) => {
                if (err) throw new Error(err);
                else {
                    console.info('***************************************************************');
                    console.info('\t\tDATABASE CONNECTION SUCCESSFULL');
                    console.info('***************************************************************');
                }
            }).asPromise();
        resolve(connection);
    })
};

module.exports = { connect };