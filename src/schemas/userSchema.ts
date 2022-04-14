import Joi from 'joi';

export const userSchema = Joi.object({
  first_name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  last_name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  hobbies: Joi.string()
    .optional()
})

export const updateUserSchema = Joi.object({
  first_name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .optional(),
  last_name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .optional()
})
