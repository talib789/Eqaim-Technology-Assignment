//.env , async-error-handler
require("dotenv").config();
require("express-async-errors");

//express
const express = require("express");
const app = express();
const port = process.env.PORT || 3008;

//route
const responseRouter = require("./routes/responseRoute");

//other
const morgan = require("morgan");
const cors = require("cors");

const notFoundMiddleware = require("./middleware/not-found");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.use("/api/v1/response", responseRouter);

app.get("/", (req, res) => {
  res.send("server is working");
});

app.use(notFoundMiddleware);

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`server listening on port ${port}...`);
    });
  } catch (error) {
    console.log({ Msg: error });
  }
};

start();
