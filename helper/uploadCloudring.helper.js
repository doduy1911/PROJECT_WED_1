const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret // Click 'View Credentials' below to copy your API secret
});
let streamUpload = (buffer) => {
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

    streamifier.createReadStream(buffer).pipe(stream);
  });
};
module.exports = async (buffer) =>{
  let result = await streamUpload(buffer);
  // console.log(req.file)
  // req.body['thumbnail']= result.url;
  return result.url;
  
}
