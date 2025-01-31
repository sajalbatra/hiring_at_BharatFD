exports.setLanguageMiddleware = (req, res, next) => {
    const lang = req.query.lang || 'en';
    
    // Assuming you want to set the language in the request for further use.
    req.language = lang;
    
    next();
};
