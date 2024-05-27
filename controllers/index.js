const candidateControllers = require('./candidate.controller');
const jobControllers = require('./job.controller');
const appControllers = require('./app.controller');
const userControllers = require('./user.controller');
const authControllers = require('./auth.controller');

module.exports = {
  ...candidateControllers,
  ...jobControllers,
  ...appControllers,
  ...userControllers,
  ...authControllers,
};