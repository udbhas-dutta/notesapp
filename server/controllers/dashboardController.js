const Note = require("../models/Notes");
const mongoose = require("mongoose");

//method : GET /dashboard
exports.dashboard = async (req, res) => {
  let perPage = 12;
  let page = req.query.page || 1;
  const locals = {
    title: "Dashboard",
    description: "Free Note Storage App",
  };

  try {
    //to show user-specific notes in the dashboard
      Note.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 100] }
        },
      },
    ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec()
      .then((notes) => {
        return Note.countDocuments().exec().then((count) => {

          res.render("dashboard/db-page", {
            userName: req.user.firstName,
            locals,
            notes,
            layout: "../views/layouts/dashboard",
            current: page,
            pages: Math.ceil(count / perPage),
          });
        });
      });
  } catch (error) {
    console.log(error);
  }
};
