const User = require('../models/User')
const crypto = require('crypto')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')

exports.Register = async (req, res, next) => {
    const { username, email, role, password,phoneNumber } = req.body;
    console.log("Register")
    try {
      const user = await User.create({
        username,
        email,
        role,
        password,
        phoneNumber
      });
      sendToken(user , 201 ,res)

    } catch (error) {
        next(error)
    }
  };
  

exports.login = async (req,res,next) => {
    const {  email, password } = req.body;

    if(!email || !password){
        return next(new ErrorResponse("please enter email and password",400))
    }
    try {
        const user = await User.findOne({email}).select("+password")
        if(!user){
        return next(new ErrorResponse("invalid credentials",401))

        }

        const isMatch = await user.matchPasswords(password)
        if(!isMatch){
            return next(new ErrorResponse("invalid credentials",401))

        }
        sendToken(user,200,res)
      } catch (error) {
        next(error)
      }
}



exports.forgotPassword = async (req,res,next) => {
  const {email} = req.body
  try{
    const user = await User.findOne({email})
    if(!user){
      return next(new ErrorResponse("email could not be sent",404))
    }
    const resetToken = user.getResetPasswordToken()

    await user.save()
    const restUrl = `http://localhost:5173/passwordrest/${resetToken}`
    const Home = `http://localhost:5173`
    const message = `
    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <a href="${Home}" title="logo" target="_blank">
                                <img width="200" src="https://cdn.discordapp.com/attachments/1089247058269065286/1119647501650247721/9-removebg-preview_2.png" title="logo" alt="logo">
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">لقد طلبت إعادة تعيين كلمة المرور</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            لا يمكننا ببساطة إرسال كلمة المرور القديمة. تم إنشاء رابط فريد لإعادة تعيين كلمة المرور الخاصة بك. لإعادة تعيين كلمة المرور، انقر على الرابط التالي واتبع التعليمات.
                                        </p>
                                        <a href="${restUrl}"
                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">إعادة تعيين كلمة المرور</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr> 
                      </tr>
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
    `
    try{
      sendEmail({
        to:user.email,
        subject:"password reset",
        text:message
    })
    res.status(200).json({success:true,data:"email sent"})
    }catch(error){
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined

      await user.save()

      next(new ErrorResponse("email could not be send",500))
    }
  }catch(error){
    next(error)
  }
    }
    
    exports.resetPassword = async (req, res, next) => {
      const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");
    
      try {
        const user = await User.findOne({
          resetPasswordToken,
          resetPasswordExpire: { $gt: Date.now() },
        });
    
        if (!user) {
          return next(new ErrorResponse("Invalid reset token", 404));
        }

        user.password = req.body.password;
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;
        await user.save();
    
        res.status(201).json({ success: true, data: "Password has been reset successfully" });
      } catch (err) {
        next(err);
      }
    };
    

    const sendToken = (user, statusCode, res) => {
        const token = user.getSignToken();
        res.status(statusCode).json({ success: true, jwttoken:token });
   };