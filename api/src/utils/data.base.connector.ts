import mongoose from 'mongoose';

export const dbDisconnect = () => mongoose.disconnect();

export const dbConnectToPlatform = (platform?: string) => {
    mongoose.set('useCreateIndex', true);

    let dataBaseUrl = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_HOST + '/' + process.env.DB_NAME + '?retryWrites=true' + '&w=majority';
    // if (process.env.NODE_ENV === "local") { dataBaseUrl = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME + '&retryWrites=false'; }
    return mongoose.connect(dataBaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })

    // let dataBaseUrl = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME + '?ssl=true' + '&retryWrites=false';
    // if (process.env.NODE_ENV === "local") { dataBaseUrl = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME + '&retryWrites=false'; }
    // return mongoose.connect(dataBaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
};
