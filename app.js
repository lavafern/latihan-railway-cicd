require("dotenv").config()
const express = require("express")
const app = express()
const Sentry = require("@sentry/node")
const {PORT,SENTRY_DSN } = process.env

Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Sentry.Integrations.Express({ app }),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0,
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,
  });
  
// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());


app.get('/',(req,res,next) => {
    try {

    
    console.log(nama);
    res.json({
        message : "hello world",
        status : "ok"
    })
    }catch (err) {
        next(err)
    }
})

app.use(Sentry.Handlers.errorHandler());

app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.json({
        status : "error",
        message : err.message
    });
  });
app.listen(PORT,() => console.log("listening to port",PORT))