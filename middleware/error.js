const errorMiddleware = (err,req,res,next) => {

    if(err.statusCode) {
        return res.status(err.statusCode).json({success:false,message:err.message});
    } else {
        const err = new Error("Something went wrong, please try again!");
        err.statusCode = 500;
        return res.status(err.statusCode).json({success:false,message:err.message});
    };

};

module.exports = errorMiddleware;