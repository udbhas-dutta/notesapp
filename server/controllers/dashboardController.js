const Note = require("../models/Notes");
const mongoose = require("mongoose");

//method : GET /dashboard
exports.dashboard = async (req, res) => {
  const locals = {
    title: "Dashboard",
    description: "Free Note Storage App",
  };

  try {
    const notes = await Note.find({});

    res.render("dashboard/db-page", {
      userName: req.user.firstName,
      locals,
      notes,
      layout: "../views/layouts/dashboard",
    });
    console.log(notes);
  } catch (error) {
    console.log(error);
  }


};
