const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { router } = require('./routes/router');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(8080, () => {
    console.log('Server started on port 8080');
});
router(app);
