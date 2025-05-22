const requestLogger = (req, res, next) => {
  const start = Date.now();

  console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log('Headers:', {
    'user-agent': req.headers['user-agent'],
    'content-type': req.headers['content-type'],
    'authorization': req.headers.authorization ? 'Bearer [HIDDEN]' : undefined
  });

  if (req.body && Object.keys(req.body).length > 0) {
    const request = {
      ...req.body
    }
    if (req.body.password) request.password = '[HIDDEN]'
    console.log('Body:', request);
  }

  // Log response details when the response is sent
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });

  next();
};

export default requestLogger; 