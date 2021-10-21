// const express = require("express"); ==> ligne 2 suffit?
const router = require("express").Router();
const movieModel = require("./../models/Movie.model");
const celebrityModel = require("./../models/Celebrity.model");

// all your routes here
//pas de préfixe dans app.js
router.get("/movies/create", function (req, res, next) {
  celebrityModel
    .find()
    .then((celebrities) => res.render("movies/new-movie.hbs", { celebrities }))
    .catch(next);
});

router.post("/movies/create", (req, res, next) => {
  movieModel
    .create(req.body)
    .then((movies) => res.redirect("/movies"))
    .catch(() => res.render("movies/new-movie"));
});

router.get("/movies", function (req, res, next) {
  movieModel
    .find()
    .then((movies) => res.render("movies/movies.hbs", { movies }))
    .catch(next);
});

router.get("/movies/:id", function (req, res, next) {
  movieModel
    .findById(req.params.id).populate('cast')
    .then((movies) => res.render("movies/movie-details", { movies }))
    .catch(next)
});

module.exports = router;
