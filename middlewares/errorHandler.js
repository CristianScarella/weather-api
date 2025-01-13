export default (err, req, res, next) => {
  console.error('Global Error Handler:', err.message)

  res.status(500).json({
    error: 'An unexpected error occurred.',
    details: err.message
  })
}
