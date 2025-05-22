const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  // Log request details
  console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log('Headers:', {
    'user-agent': req.headers['user-agent'],
    'content-type': req.headers['content-type'],
    'authorization': req.headers.authorization ? 'Bearer [HIDDEN]' : undefined
  });
  
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', {
      ...req.body,
      password: req.body.password ? '[HIDDEN]' : undefined
    });
  }

  // Log response details when the response is sent
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });

  next();
};

export default requestLogger; 