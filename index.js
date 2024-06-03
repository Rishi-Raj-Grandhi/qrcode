import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import qr from "qr-image";
import fs from 'fs';
import { image } from "qr-image";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
var urlName="";

app.use(bodyParser.urlencoded({ extended: true }));
function qrcodeGenerator(req, res, next) {
    console.log(req.body);
    urlName = req.body["url"];
    
    next();
  }
app.use(qrcodeGenerator)
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  }); 


 app.post('/submit', (req,res)=>{
    var code = qr.image(`${urlName}`, { type: 'png' });
    res.setHeader('Content-type', 'image/png'); 
    code.pipe(res);
  });