const axios = require('axios');

exports.handler = async function(event, context) {
  const { type, location, start, end } = event.queryStringParameters;
  const apiKey = process.env.API_KEY;
  const baseUrl = 'https://api.weatherstack.com';

  let url;
  switch (type) {
    case 'current':
      url = `${baseUrl}/current?access_key=${apiKey}&query=${location}`;
      break;
    case 'forecast':
      url = `${baseUrl}/forecast?access_key=${apiKey}&query=${location}&forecast_days=14`;
      break;
    case 'historical':
      url = `${baseUrl}/historical?access_key=${apiKey}&query=${location}&historical_date_start=${start}&historical_date_end=${end}`;
      break;
    default:
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid type' }) };
  }

  try {
    const response = await axios.get(url);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
