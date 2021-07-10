
const path = require('path');

const IN_PROD = process.env.NODE_ENV === 'production';
if (!IN_PROD) {
    // eslint-disable-next-line global-require,  import/no-extraneous-dependencies
    const dotenv = require('dotenv');
    dotenv.config({path: "./config/config.env" });
}

// env
const { DATABASE_URL, SESSION_SECRET } = process.env;
const PORT = process.env.PORT || 5000;

// imports
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const passportConfig = require('./config/passport');
const dbConfig = require('./config/db');
//const connectDb = require("./config/db");

// routers
const userRouter = require('./routes/user');
const movieRouter = require('./routes/movie');
const genreRouter = require('./routes/genre');
const reviewRouter = require('./routes/review');

// configure passport and database
passportConfig(passport);
dbConfig(mongoose, DATABASE_URL);

// session
const sessionStore = new MongoDBStore({
       mongooseConnection: mongoose.connection,
           collection: 'sessions'
  });
  

const app = express();
// middleware
app.use(cors({ credentials: true }));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(
    session({
        secret:  process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        proxy: true, // heroku required, reference: https://stackoverflow.com/questions/14463972/how-to-set-secure-cookie-using-heroku-node-js-express
        rolling: true,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // maxAge = 1 day (1day * 24hr/1day * 60 min/1hr * 60sec/1min * 1000ms/1sec)
            secure: IN_PROD
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userRouter);
app.use('/api/movies', movieRouter);
app.use('/api/genre', genreRouter);
app.use('/api/review', reviewRouter);

if (IN_PROD) {
    // Serve any static files
   app.use(express.static(path.join(__dirname, "/client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", (req, res) =>{
   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
   // app.use(express.static(path.join(__dirname, '../client/build')));
  
  //  app.get('*', (req, res) => {
   //     res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}
app.listen(PORT);















// //NODE_ENV=production npm run dev

// // imports
// const path = require('path');
// const dotenv = require('dotenv');
// const { unknownEndpoints, errorHandler } = require("./middleware/error");
// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const mongoose = require('mongoose');
// const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
// const passport = require('passport');
// const passportConfig = require('./config/passport');
// //const dbConfig = require('./config/database');
// const colors = require("colors");
// const connectDb = require("./config/db");

// // routers
// const userRouter = require('./routes/user');
// const movieRouter = require('./routes/movie');
// const genreRouter = require('./routes/genre');
// const reviewRouter = require('./routes/review');


// // configure passport and database
// dotenv.config({path: "./config/config.env" });
// passportConfig(passport);
// connectDb();
// //const { SESSION_SECRET } = process.env;

// const PORT = process.env.PORT || 5000



// // session
// const sessionStore = new MongoDBStore({
//      mongooseConnection: mongoose.connection,
//         collection: 'sessions'
// });

// const app = express();
// // middleware
// app.use(cors({ credentials: true }));
//   app.use(function(req, res, next) {
//     //to allow cross domain requests to send cookie information.
//     res.header('Access-Control-Allow-Credentials', true);
    
//     // origin can not be '*' when crendentials are enabled. so need to set it to the request origin
//     res.header('Access-Control-Allow-Origin',  req.headers.origin);
    
//     // list of methods that are supported by the server
//     res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');
    
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');
    
//         next();
//     });


// app.use(morgan('dev'));
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: false, limit: '10mb' }));
// app.use(
//     session({
//         secret:  process.env.SESSION_SECRET,
//         resave: false,
//         saveUninitialized: false,
//         store: sessionStore,
//         proxy: true, // heroku required, reference: https://stackoverflow.com/questions/14463972/how-to-set-secure-cookie-using-heroku-node-js-express
//         rolling: true,
//         cookie: {
//             maxAge: 24 * 60 * 60 * 1000, // maxAge = 1 day (1day * 24hr/1day * 60 min/1hr * 60sec/1min * 1000ms/1sec)
//            // secure: IN_PROD
//         }
//     })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// if(process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
//  }


// app.use('/api/user', userRouter);
// app.use('/api/movies', movieRouter);
// app.use('/api/genre', genreRouter);
// app.use('/api/review', reviewRouter);



// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/client/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//   );
// } else {
//     app.get("/", (req, res) => {
//       res.send("API is running....");
//     });
//   }

//   app.use(unknownEndpoints);
//   app.use(errorHandler);
  




//   const server = app.listen(app.get( 'PORT' ), function() {
//     console.log(
//       `Server running in ${process.env.NODE_ENV} mode on port : ${PORT}`.yellow.bold
//     )
//     });
  
//   //Handle unhandle promise rejection
  
//   process.on("unhandledRejection", (err, promise) => {
//     console.log(`Error: ${err.message}`.red.bold);
//     //close the server
//     server.close(() => process.exit(1));
//   });
  





// "server": "nodemon server.js",
// "client": "npm start --prefix client",
// "build": "npm run build --prefix client",
// "dev": "concurrently \"npm run server\" \"npm run client\"",
// "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
//  /* /index.html 200   _redirects   http://localHOST:5000  /client/build
//  package-lock.json  

// node_modules
// /node_modules