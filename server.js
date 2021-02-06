const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('./dist/front-graduation'));

app.get('/*', (req, res) =>
     res.sendFile(path.resolve(app.get('appPath') + '/index.html')));

app.listen(process.env.PORT || 8080);
