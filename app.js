const express = require("express");
const path = require("path");
const app = express();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

app.set("views", path.join(__dirname, "views")); //PATH OF THE VIEW FILES
app.set("view engine", "ejs"); //DEFINE VIEW ENGINE
app.use(express.urlencoded({ extended: true })); //TAKE DATA OF THE FORM

app.get("/", (req, res) => {
  //SHOW MESSAGES
  res.render("index", {
    title: "Mini Messageboard",
    messages: messages,
  });
});

app.get("/new", (req, res) => {
  //GET FORM ROUTE
  res.render("form");
});

app.post("/new", (req, res) => {
  //POST FORM DATA ROUTE
  const { text, user } = req.body;
  messages.push({ text: text, user: user, added: new Date() });
  console.log(messages);
  res.redirect("/");
});

app.get("/show/:user", (req, res) => {
  const { user } = req.params;

  const messageRequested = messages.find((message) => message.user === user);
  console.log(messageRequested);
  res.render("show", { message: messageRequested });
});

app.listen(3000, () => {
  console.log("Starting server on port 3000.");
});
