import * as Express from 'express';
import * as BodyParser from 'body-parser';
import { normalizePort, validateEnv } from './utils';
import ifttt from './routes/ifttt';

// validateEnv([]);

const app = Express();
const API_BASE = '/api';

// Verify Headers
app.use((req, res, next) => {
  if (!req.accepts('application/json') || !req.acceptsCharsets('utf-8') ||
    !req.acceptsEncodings(['gzip', 'deflate'])) {
    res.status(406).send("Not Acceptable");
  }
  next();
});

// Verify Channel Key
app.use((req, res, next) => {
  let key = req.header('IFTTT-Channel-Key');
  if (key === process.env.IFTTT_CHANNEL_KEY) {
    next();
  } else {
    res.status(401).json({
      errors: [{ message: 'Invalid IFTTT Channel Key' }],
    });
  }
});

app.use(BodyParser.json());

app.use(API_BASE, ifttt);

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

const errorHandler: Express.ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500);
  res.send('Server Error');
}
app.use(errorHandler);

let port = normalizePort(process.env.PORT)
app.listen(port, () => {
  console.log('Listening on port 3000!');
});
