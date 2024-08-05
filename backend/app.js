import express from "express";

import cors from "cors";

import route from "./routes/index.route.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);

route(app);

//error handling mi

app.use((err, req, res, next) => {
  res.status(500).send({
    status: false,
    message: err.message,
  });
});

//404 routes

app.use("*", (req, res) => {
  res.status(404).send({
    message: "not found ",
  });
});

app.listen(5000, () => {
  console.log("app is running");
});
