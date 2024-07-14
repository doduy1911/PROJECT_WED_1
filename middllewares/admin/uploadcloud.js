const uploadToCloudriany = require("../../helper/uploadCloudring.helper")
module.exports.upload = async (req,res,next) => {
    if(req.file){


      const result = await uploadToCloudriany(req.file.buffer);
      console.log(result)
        req.body[req.file.fieldname] = result;
    }
        next()
    
}

