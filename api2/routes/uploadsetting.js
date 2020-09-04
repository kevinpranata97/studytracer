const multer = require('multer');
const filefilter = (req, file, cb) => {
    var allowedtype = ["image/jpeg", "image/jpg", "image/png"];
    if(!allowedtype.includes(file.mimetype)){
    cb(new Error("wrong file type"), false)
    }else{
    cb(null,true);
    }
 }
 
 const storage = multer.diskStorage({
     destination: function(req,file,cb){
         cb(null, './static')
     },
     filename: function(req,file,cb){
         cb(null, file.fieldname +'-'+ Date.now('yyyy-mm-dd') +Math.ceil(Math.random()*1000000) +'-'+ file.originalname)
     }
 });
 
 const upload = multer({
     storage: storage,
     limits:{
         fileSize: 1024*1024*500
     }, 
     fileFilter: filefilter
 })
 module.exports = {multer,upload}