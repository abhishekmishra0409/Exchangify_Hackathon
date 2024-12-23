const cloudinary = require("./cloudConnection");

const deleteFromCloud = async (publicId) =>{
   try {
    const responce = await cloudinary.uploader.destroy(publicId);
    return responce;
   } catch (error) {
    throw new Error("Unable to delete");
   }
}

module.exports = deleteFromCloud;