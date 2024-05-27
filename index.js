const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const router = require('./routers');
const NotFoundMiddleware = require('./middleware/not-found');
const ErrorHandlerMiddleware = require('./middleware/error-handler');

const app = express()
const port = 3000

app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.SECRET_KEY));
app.use('/api', router);

app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})