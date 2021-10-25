// const express = require("express"); ==> ligne 2 suffit? 
const router = require("express").Router();
const celebrityModel = require('./../models/Celebrity.model');

// all your routes here
//pas de préfixe dans app.js
router.get("/celebrities/create", function (req, res, next) {
    res.render("celebrities/new-celebrity.hbs");
  });

router.post("/celebrities/create", (req, res, next) => {
    celebrityModel
      .create(req.body)
      .then((celebrities) => res.redirect("/celebrities"))
      .catch(() => res.render("/celebrities/new-celebrity"));
  });

router.get("/celebrities", function (req, res, next) {
        celebrityModel.find()
          .then((celebrities) => res.render("celebrities/celebrities.hbs", { celebrities }))
          .catch(next);
  });

router.get("/celebrities/delete", function (req, res, next) {
  celebrityModel.findByIdAndRemove(req.params.id)
    .then(() => res.redirect("celebrities"))
    .catch(next);
});

module.exports = router;