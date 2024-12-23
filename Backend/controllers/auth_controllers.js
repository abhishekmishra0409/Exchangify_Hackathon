const user = require("../models/userModel");
const uploadOnCloudinary = require("../utils/Cloud Config/uploadOnCloud");
const generateToken = require("../utils/generateToken");

const signupController = async(req,res) =>{
    try{
        const {name, email, phone, skills, password} = req.body;
        // console.log(req?.files);
        
        // const profileImg = req.files ? req.files.image : null;

        if(!name || !email || !password || !phone || !skills){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields correctly"
            })
        }

        // let upload = await uploadOnCloudinary(profileImg, "profileImages");

        // if(!upload){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Failed to upload profile image, try again later"
        //     })
        // }

        const userExist = await user.findOne({email:email, phone:phone});

        if(userExist){
            return res.status(400).json({
                success:false,
                message:"User Already registered"
            })
        }

        const savingUser = await user.create({
            name, 
            email, 
            phone, 
            password, 
            skills
        })

        if(!savingUser){
            return res.status(400).json({
                success:false,
                message:"User Signup failed, try again later"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Signup successfull"
        })
    }
    catch(error){
        console.error('Error during signup:', error);
        return res.status(400).json({
            success:false,
            message:"Signup failed, try again later",
            error:error.message
        })
    }
}


// login controller 
const loginController = async(req,res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Fill email and password correctly"
            })
        }

        const checkDetails = await user.findOne({email});
        if(!checkDetails){
            return res.status(400).json({
                success:false,
                message:"User not found please signup first"
            })
        }

        const checkPassword = await checkDetails.matchPassword(password);
        if(!checkPassword){
            return res.status(400).json({
                success:false,
                message:"Wrong Password, try again"
            })
        }

        return res.status(200).json({
            success:true,
            userDetails:{
                id: checkDetails._id,
                name:checkDetails.name,
                email:checkDetails.email,
                phone:checkDetails.phone,
                skills:checkDetails.skills,
                token: generateToken(checkDetails)
            }
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Server Error while login"
        })
    }
}

module.exports = { signupController, loginController}