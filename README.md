# telemetric-alert

## Overview
App to persist telematic data and print alerts if any threshold has been reached.

## Running The Project

To get started, here's a list of recommended next steps:

1. clone the project from https://github.com/Parinita789/telemetric-alerts.git
2. cd telematic-alert
3. npm install
4. create a .env file in the root folder
5. Paste the key values from the sample.env file
6. npm start


## Dependencies
Node.js
mongoose
Typescript
Inversify
Express

## curl Requests
curl --location --request POST 'http://localhost:3000/api/v1/telematic-data' \
--header 'Content-Type: application/json' \
--data-raw '{
    "equipment_header": {
        "OEM_name": "CAT",
        "model": "M315F",
        "serial_number": "ABC123456",
        "snapshot_time": "2021-06-26T10:00:00Z"
    },
    "location": {
        "latitude": 52.5200,
        "longitude": 13.4050,
        "altitude": 70,
        "altitude_units": "Meter"
    },
    "cumulative_idle_hours": {
        "hour": 3469.4
    },
    "cumulative_operating_hours": {
        "hour": 1060
    },
    "distance": {
        "odometer_units": "Kilometer",
        "odometer": 2702.4
    },
    "engine_status": {
        "running": false
    },
    "fuel_used": {
        "fuel_units": "Liter",
        "fuel_consumed": 24096
    },
    "fuel_remaining": {
        "percent": 50
    }
}'

