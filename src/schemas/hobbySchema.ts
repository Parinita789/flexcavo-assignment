import Joi from 'joi';
import { PASSION_LEVEL } from '../constants/passionLevel';

export const hobbySchema = Joi.object({
  name: Joi.string().required(),
  from: Joi.number().required(),
  user: Joi.string().required(),
  passion_level: Joi.string().valid(...Object.values(PASSION_LEVEL)).required()
})

export const updateHobbySchema = Joi.object({
  name: Joi.string().optional(),
  from: Joi.number().optional(),
  passion_level: Joi.string().valid(...Object.values(PASSION_LEVEL)).optional()
})