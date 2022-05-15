import Joi from 'joi';
import { LENGTH_UNIT } from '../constants/lengthUnits';
import { LIQUID_UNIT } from '../constants/liquidUnit';

export const telematicDataSchema = Joi.object({
  equipment_header: Joi.object({
    OEM_name: Joi.string().required(),
    model: Joi.string().required(),
    serial_number: Joi.string().required(), 
    snapshot_time: Joi.string().required()
  }),
  location: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(), 
    altitude: Joi.number().required(),
    altitude_units: Joi.string().valid(...Object.values(LENGTH_UNIT)).required()
  }),
  cumulative_idle_hours: Joi.object({
    hour: Joi.number().required() 
  }),
  cumulative_operating_hours: Joi.object({ 
    hour: Joi.number().required()
  }), 
  distance: Joi.object({
    odometer_units: Joi.string().valid(...Object.values(LENGTH_UNIT)).required(),
    odometer: Joi.number().required()
  }),
  engine_status: Joi.object({ 
    running: Joi.boolean().required()
  }), 
  fuel_used: Joi.object({
    fuel_units: Joi.string().valid(...Object.values(LIQUID_UNIT)).required(),
    fuel_consumed: Joi.number().required()
  }),
  fuel_remaining: Joi.object({ 
    percent: Joi.number().required()
  })
})
