const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { addUserController } = require("./controllers/addUserController");
const { getUsersController } = require("./controllers/getUsersController");
const { deleteUserController } = require("./controllers/deleteUserController");
const { addEventController } = require("./controllers/addEventController");
const { getEventsController } = require("./controllers/getEventsController");
const {
  activateEventController,
} = require("./controllers/activateEventController");
const {
  deleteEventController,
} = require("./controllers/deleteEventController");
const {
  deletedUsersController,
} = require("./controllers/deletedUsersController");
const {
  deletedEventsController,
} = require("./controllers/deletedEventsController");
const {
  activateUserController,
} = require("./controllers/activateUserController");
const {
  getTotalEventsController,
} = require("./controllers/getTotalEventsController");
const {
  getTotalUsersController,
} = require("./controllers/getTotalUsersController");
const {
  updateEventController,
} = require("./controllers/updateEventController");
// const data_route = require('./routes/data-route')
const app = express();

app.use(express.json({ limit: "16mb" }));
app.use(cors());

app.post("/add-user", addUserController);
app.get("/get-users", getUsersController);
app.get("/total-users", getTotalUsersController);
app.get("/deleted-users", deletedUsersController);
app.delete("/delete-user/:email", deleteUserController);
app.patch("/activate-user/:email", activateUserController);

app.post("/add-event", addEventController);
app.get("/events", getEventsController);
app.get("/total-events", getTotalEventsController);
app.get("/deleted-events", deletedEventsController);
app.delete("/delete-event/:name", deleteEventController);
app.patch("/activate-event/:name", activateEventController);
app.put("/update-event/:name", updateEventController);
app.use('/api',require('./routes/message.js'))

module.exports = {
  server: app,
  start: () => {
    mongoose
      .connect(process.env.DBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        app.listen(process.env.PORT, () => {
          console.log(`app listening on port ${process.env.PORT}`);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
