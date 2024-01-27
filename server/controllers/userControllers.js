const users = require("../models/userSchema");
const userotp = require("../models/userOtp");
const nodemailer = require("nodemailer");

//email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.userregister = async (req, res) => {
  const { fname, email, password } = req.body;

  if (!fname || !email || !password) {
    res.status(400).json({ error: "Please Enter All Input Data" });
  }

  try {
    const preuser = await users.findOne({ email: email }); //1 db ki email & 2 frontend ki email

    if (preuser) {
      res.status(400).json({ error: "This user Already exist in our db" });
    } else {
      const userregister = new users({
        fname,
        email,
        password,
      });

      //here password hashing
      const storeData = await userregister.save();
      res.status(200).json(storeData);
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Details", error });
  }
};

//user send otp

exports.userOtpSend = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: "Please Enter Your Email" });
  }

  try {
    const preuser = await users.findOne({ email: email });

    if (preuser) {
      const OTP = Math.floor(100000 + Math.random()* 900000);

      const existEmail = await userotp.findOne({ email: email });

      if (existEmail) {
        const updateData = await userotp.findByIdAndUpdate(
          { _id: existEmail._id },
          {
            otp: OTP,
          },
          { new: true }
        );
        await updateData.save();

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          sublect: "Sending Email For Otp Validation",
          text: `OTP:-${OTP}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res.status(400).json({ error: "email not send" });
          } else {
            console.log("Email sent", info.response);
            res.status(200).json({ message: "Email sent successfully!" });
          }
        });
      } else {
        const saveOtpData = new userotp({
          email,
          otp: OTP,
        });
        await saveOtpData.save();

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          sublect: "Sending Email For Otp Validation",
          text: `OTP:-${OTP}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res.status(400).json({ error: "email not send" });
          } else {
            console.log("Email sent", info.response);
            res.status(200).json({ message: "Email sent successfully!" });
          }
        });
      }
    } else {
      res.status(400).json({ error: "This User Not Exist In our Db" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Details", error });
  }
};


exports.userLogin = async(req,res)=>{
  const {email,otp} = req.body;

  if(!otp || !email){
    res.status(400).json({ error: "Please Enter Your OTP and Email" });
  }

  try {
    const userverification = await userotp.findOne({email:email});

    if(userverification.otp === otp){
      const preuser = await users.findOne({email:email});

      //token generate
      const token = await preuser.generateAuthtoken();
      res.status(200).json({message:"User Login Successfully",userToken:token});

    }else{
      res.status(400).json({ error: "Invalid OTP" });
    }

  } catch (error) {
    res.status(400).json({ error: "Invalid Details", error });
  }

}