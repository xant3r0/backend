const errorMiddleware = (err,req,res,next) => {

    if(err.statusCode) {
        return res.status(err.statusCode).json({success:false,message:err.message});
    };

};

module.exports = errorMiddleware;