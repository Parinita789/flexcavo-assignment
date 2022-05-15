import { ObjectId } from 'bson';
import { Model, model, Schema } from 'mongoose';
import { LENGTH_UNIT } from '../constants/lengthUnits';
import { LIQUID_UNIT } from '../constants/liquidUnit';

export interface ITelematicDataDocument extends ITelematicData {
  _id: ObjectId,
  created_at: Date,
  updated_at: Date
}

export interface ITelematicData {
  equipment_header: IEqipmentHeader;
  location: ILocation;
  cumulative_idle_hours: ICumulativeHours,
  cumulative_operating_hours: ICumulativeHours,
  engine_status: IEngineStatus,
  distance: IDistance,
  fuel_remaining: IFuelRemaining,
  fuel_used: IFuelUsed
}

interface IEqipmentHeader {
  OEM_name: string,
  model: string,
  serial_number: string,
  snapshot_time: Date
}

interface ILocation {
  latitude: number,
  longitude: number,
  altitude: number,
  altitude_units: string
}

interface ICumulativeHours {
  hour: number
}

interface IEngineStatus {
  running: boolean
}

interface IFuelRemaining {
  percent: number
}

interface IFuelUsed {
  fuel_units: String,
  fuel_consumed: number
}

interface IDistance {
  odometer_units: string,
  odometer: number
}

export const TelematicDataSchema = new Schema(
  {
    equipment_header: { 
      OEM_name: { type: String, required: true },
      model: { type: String, required: true },
      serial_number: { type: String, required: true },
      snapshot_time: { type: Date, required: true },
    },
    location: { 
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      altitude: { type: Number, required: true },
      altitude_units: { type: String, required: true, enum: LENGTH_UNIT },
    },
    cumulative_idle_hours: { 
      hour: { type: Number, required: true }
    },
    cumulative_operating_hours: { 
      hour: { type: Number, required: true }
    },
    engine_status: { 
      running: { type: Boolean, required: true }
    },
    fuel_remaining: { 
      percent: { type: Number, required: true }
    },
    distance: { 
      odometer_units: { type: String, required: true, enum: LENGTH_UNIT },
      odometer: { type: Number, required: true }
    },
    fuel_used: { 
      fuel_units: { type: String, required: true, enum: LIQUID_UNIT },
      fuel_consumed: { type: Number, required: true },
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }},
);

export const TelematicDataModel: Model<ITelematicDataDocument> = model<ITelematicDataDocument>('Telematics', TelematicDataSchema);
