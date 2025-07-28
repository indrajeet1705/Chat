import multer from 'multer'


const storage = multer.diskStorage({
  function (file,callback) {
    callback(null,)
  }
})