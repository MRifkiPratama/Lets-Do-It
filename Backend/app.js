// server/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoute');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
