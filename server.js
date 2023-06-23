var express = require('express');
var app = express();
var multer = require('multer')


const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('uploaded_file'), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any 
  console.log(req.file, req.body)
});


app.listen(8000, function() {

    console.log('App running on port 8000');

});