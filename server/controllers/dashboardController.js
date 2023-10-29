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
        $sort: { updatedAt: -1 } },
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $project: {
          title: { $substr: ["$title", 0, 10] },
          body: { $substr: ["$body", 0, 50] }
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


//GET /view specific note

exports.dashboardViewNote = async(req,res) =>{
  const note = await Note.findById({_id: req.params.id})
  .where({user: req.user.id}).lean();

  if(note) {
    res.render('dashboard/view-note', {
      noteID: req.params.id,
      note, 
      layout: '../views/layouts/dashboard'
    });
  } else {
    res.send("Something went wrong.")
  }
}


//PUT 
//update specific note
exports.dashboardUpdateNote = async(req,res) =>{
  try {
    await Note.findOneAndUpdate(
      {_id: req.params.id},
      {title: req.body.title, body:req.body.body, updatedAt: Date.now() }
      ).where({user: req.user.id});
      res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
  }
}

//DELETE 
//delete specific note
exports.dashboardDeleteNote = async(req,res)=>{
  try {
    await Note.deleteOne({_id:req.params.id}).where({user: req.user.id})
    res.redirect('/dashboard')
  } catch (error) {
    console.error(error);
  }
}

//GET
//add note page
exports.dashboardAddNote = async(req,res)=>{
  res.render('dashboard/add-note', {
    layout: '../views/layouts/dashboard'
  });
}

//POST
//add a note
exports.dashboardAddNoteSubmit= async(req,res) =>{
  try {
    req.body.user = req.user.id;
    await Note.create(req.body);
    res.redirect('/dashboard')

  } catch (error) {
    console.error(error);
  }
}

//get
//search for a note
exports.dashboardSearch = async(req,res) =>{
  try {
    res.render('dashboard/search',{
      searchResults: '',
      layout: '../views/layouts/dashboard'
    })
  } catch (error) {
    console.error(error);
  }
}

//POST
//search for notes (submit command)
exports.dashboardSearchSubmit = async(req,res) =>{
  //search logic
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

    const searchResults = await Note.find({
      $or: [
        {title: {$regex: new RegExp(searchNoSpecialChars, 'i')}},
        {body: {$regex: new RegExp(searchNoSpecialChars, 'i')}},
      ]
    }).where ({user: req.user.id})

    res.render('dashboard/search', {
      searchResults,
      layout: '../views/layouts/dashboard'
    })

  } catch (error) {
    console.error(error);
  }
}