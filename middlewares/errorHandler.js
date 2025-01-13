export default (err, req, res, next) => {
  console.error('Global Error Handler:', err.message)

  if (err.message.includes('Cache unavailable')) {
    return res.status(500).json({
      error: 'Cache service is currently unavailable. Please try again later.'
    })
  }

  res.status(500).json({
    error: 'An unexpected error occurred.',
    details: err.message
  })
}
