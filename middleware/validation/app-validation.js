const Joi = require('joi');
const ClientError = require('../../errors/ClientError');

const applicationSchema = Joi.object({
  id: Joi.string().required(),
  candidateId: Joi.string().required(), 
  jobId: Joi.string().required(), 
  appliedDate: Joi.date().required(),
  status: Joi.string().valid('Pending', 'Interview', 'Accepted', 'Rejected'),
});

const validateApplication = (req, res, next) => {
  try {
    const { error } = applicationSchema.validate(req.body); 

    if (error) {
      throw new ClientError(error.message); 
    }

    next(); 
  } catch (error) {
    next(error); 
  }
};

module.exports = validateApplication; 
