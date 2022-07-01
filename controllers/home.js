/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};


/**
 * GET /
 * Map page.
 */
 const Gym = require('../models/Gym.js');


 exports.getMap = (req, res) => {
   Gym.find((err, gyms) =>{
     console.log(gyms[0].name);
     res.render('climbing/map', {
      title: 'map',
      gym: gyms
    })
   })
  };
  
/**
 * GET /
 * gym tool page.
 */
  exports.getgymTool = (req, res) => {
    res.render('climbing/gym-tool', {
      title: 'Gym tool'
    });
  };

/**
 * POST /gym
 * Create a new gym.
 */
 exports.postGym = (req, res, next) => {
  console.log(req.body);
  const gym = new Gym({
    name: req.body.gymname,
    lat: req.body.latitude,
    lon: req.body.longitude
  });
   Gym.findOne({ name: req.body.gymname }, (err, existingGym) => {
    if (err) { return next(err); }
    if (existingGym) {
      req.flash('errors', { msg: 'Gym with that name already exists.' });
      res.redirect('/gym');
    }
    else {
      gym.save((err) => {
        if (err) { return next(err); }
        else {
          req.flash('success', { msg: 'You registered a new gym!' });
          res.redirect('/gym');
        }
      });
    }
   });

  };

/**
 * GET /
 * gym info page.
 */
exports.getGym = (req, res) => {
  console.log(req.params.gymId);
  Gym.findOne( { name: req.params.gymId }, (err, searchedGym) => {
   if (searchedGym) {
    return res.render('climbing/gym-details', {
      title: searchedGym.name,
      gym: searchedGym
    });
   } 
  })
};