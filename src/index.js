const express = require('express');
const app = express();
const router = express.Router();
const { PORT, CLIENT_URL } = require('./constants');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');

require("./middleware/validators-middleware");


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}));
app.use(passport.initialize());

const { authRoutes } = require("./routes/auth");
app.use("/api", authRoutes);

const appStart = () => {
    try{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
  }  )

    } catch (error) {
        console.log(`Error: ${error.message}`);
   }
};


appStart()