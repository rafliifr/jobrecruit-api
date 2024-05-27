const Joi = require('joi');
const ClientError = require('../../errors/ClientError');

const jobSchema = Joi.object({
  id: Joi.string().required(),
  company: Joi.string().required(),
  position: Joi.string().required(),
});

const validateJob = (req, res, next) => {
  try {
    const { error } = jobSchema.validate(req.body);

    if (error) {
      throw new ClientError(error.message);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateJob;
