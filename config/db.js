


const logMsg = (msg) => {
  console.log(msg);
};

const dbConfig = async (mongoose, DATABASE_URL) => {
  try {
      mongoose.connect(DATABASE_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
      });
      const dbConnection = mongoose.connection;
      // handle errors after initial connection was established
      dbConnection.on('error', (err) => logMsg(err));
      dbConnection.once('open', () => logMsg('Connected to Mongoose'));
  } catch (err) {
      logMsg(err);
  }
};

module.exports = dbConfig;












// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//   const conn = await mongoose.connect(process.env.DATABASE_URL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   });
//   console.log(
//     `Mongo database connected on ${conn.connection.host}`.cyan.underline.bold);
//   } catch (err) {
//     console.log(`Error: ${err.message}`.red);
//     process.exit(1);
//   }
// }

// module.exports = connectDB;
