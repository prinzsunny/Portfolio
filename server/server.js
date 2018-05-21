import express from "express";
import path from "path";

const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));

 app.get('/', function response(req, res) {
 	console.log(__dirname);
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
  });

app.listen(3000, () => console.log("Example app listening on port 3000!"));


