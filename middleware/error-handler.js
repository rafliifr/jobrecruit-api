const ClientError = require('../errors/ClientError');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
  return res.status(500).json({
    message: 'Internal Server Error',
  });
};

module.exports = errorHandler;