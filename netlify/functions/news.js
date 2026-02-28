exports.handler = async (event) => {
  const API_KEY = process.env.NEWS_API_KEY;
  const q = event.queryStringParameters?.q || 'election';

  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&language=en&sortBy=publishedAt&pageSize=8&apiKey=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
