const express = require("express");

const cors = require("cors");
const { userRouter } = require("./Routes/userRoutes");
const { noteRouter } = require("./Routes/notesRoute");
const { connectDB } = require("./db");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "hello world" });
});

app.use("/users", userRouter);
app.use("/notes", noteRouter);

connectDB().then(() => {
  app.listen(process.env.port, async () => {
    try {
      console.log(`server is running at port ${process.env.port}`);
    } catch (err) {
      console.log(err);
      console.log("Something Went Wrong!!");
    }
  });
});

// const express = require("express");
// const cors = require("cors");
// const { userRouter } = require("./Routes/userRoutes");
// const { connection } = require("./db");
// const { noteRouter } = require("./Routes/notesRoute");
// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send({ msg: "hello world" });
// });

// app.use("/users", userRouter);
// app.use("/notes", noteRouter);

// app.listen(6060, async () => {
//   try {
//     await connection, console.log("listening on port 6060");
//     console.log("connected to database");
//   } catch (error) {
//     console.error(error);
//   }
// });
