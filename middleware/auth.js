const authMiddleware = (req,res,next) => {

    if(!req.session || !req.session.userId) {
        return res.status(401).json({success:false,message: "Please login in your account!"});
    } else {
        return next();
    };

};

module.exports = authMiddleware;