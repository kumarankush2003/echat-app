// Middleware to handle 404 Not Found errors
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // Pass the error to the errorHandler middleware
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    // Check if headers are already sent to avoid trying to send them again
    if (res.headersSent) {
        return next(err); // Delegate to default error handler
    }

    // Determine the appropriate status code
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

module.exports = { notFound, errorHandler };
