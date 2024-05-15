const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret // Click 'View Credentials' below to copy your API secret
});
module.exports.upload = (req,res,next) => {
    if(req.file){
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                  (error, result) => {
                    if (result) {
                      resolve(result);
                    } else {
                      reject(error);
                    }
                  }
                );
    
              streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
    
        async function upload(req) {
            let result = await streamUpload(req);
            // console.log(req.file)
            // req.body['thumbnail']= result.url;
            req.body[req.file.fieldname] = result.url;
            next();
        }
    
        upload(req);
    }else{
        next()
    }
}