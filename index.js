const express = require("express");

const { PORT } = require("./config/serverConfig");
const passport = require('./config/passport.js');
const ApiRoutes = require('./routes/index');


const setUpAndStartServer = async () => {

    //create the express object
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(passport.initialize());


    app.use('/api', ApiRoutes);

    // Handle unhandled routes (404)
    app.use((req, res, next) => {
        res.status(404).json({
            success: false,
            message: "Route not found",
            error: `Cannot ${req.method} ${req.originalUrl}`,
        });
    });

    // Global error handler
    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            success: false,
            message: error.message || 'Internal Server Error',
            error: 'Something went wrong'
        });
    });

    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);
    })

}

setUpAndStartServer();