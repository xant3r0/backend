const validation = (req,res,next) => {

    const usernameR = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
    const passwordR = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const {username,userpass,newpass} = req.body;

    if(newpass) {
        if(passwordR.test(newpass)) {
            return next();
        } else {
            return res.status(400).json({success:false,message:"Try another new password!"});
        };
    } else {
        if(usernameR.test(username) && passwordR.test(userpass)) {
            return next();
        } else {
            return res.status(400).json({success:false,message:"Try another password/username!"});
        };
    };

};

module.exports = validation;