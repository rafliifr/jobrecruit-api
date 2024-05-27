const Joi = require('joi');

const candidateSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(), 
  email: Joi.string().email().required(), 
  phoneNumber: Joi.string().required().min(10).max(15), 
});

const validateCandidate = (req, res, next) => {
  try {
    const { error } = candidateSchema.validate(req.body); 

    if (error) {
      return res.status(400).json({
        error: error.details[0].message, 
      });
    }

    next(); 
  } catch (error) {
    next(error); 
  }
};

module.exports = validateCandidate;
