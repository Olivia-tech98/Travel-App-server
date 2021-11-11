const router = require("express").Router();
const { Country } = require('../models');
const validateSession = require('../middleware/validate-session');

router.post('/create', validateSession, (req,res)=> {
    console.log(req.user.id)
    if(req.user.is_admin===true){
        query = {where:{id: req.params.id, userId: req.user.id}};
    }else {
        query = {where:{id: req.params.id, userId: req.user.id}};
    }
    const countryEntry= {
        countryName: req.body.country.countryName, 
        population: req.body.country.population, 
        history: req.body.country.history, 
        attractions: req.body.country.attractions, 
        languages: req.body.country.languages, 
        safteyRates: req.body.country.safteyRates,
        userId: req.user.id
    }
    Country.create(countryEntry)
    .then(country => res.status(200).json(country))
    .catch(err => res.status(500).json({error:err}))
});

router.get("/getAll", validateSession, (req, res) => {
    
    Country.findAll()
    .then((country) => res.status(200).json(country))
    .catch((err)=> res.status(500)({error:err}));
});

router.get("/:id", validateSession, (req, res)=> {
    const query = {where:{ id: req.params.id, userId: req.user.id}};
    Country.findAll(query)
    .then((country)=> res.status(200).json(country))
    .catch((err)=> res.status(500).json({error:err}))
});

router.put("/update/country", validateSession, (req, res) => {
    const updateCountryEntry = {
        countryName: req.body.country.countryName, 
        population: req.body.country.population, 
        history: req.body.country.history, 
        attractions: req.body.country.attractions, 
        languages: req.body.country.languages, 
        safteyRates: req.body.country.safteyRates
    }

    const query = {where:{id: req.params.userId, userId: req.user.id}}

    Country.update(updateCountryEntry, query)
    .then((country) => res.status(200).json(country))
    .catch((err)=> res.status(500).json({error:err}));
});

router.delete("/delete/:id", validateSession, (req,res)=> {
    let query
    if(req.user.is_admin===true){
        query = {where:{id: req.params.id, userId: req.user.id}};
    }else {
        query = {where:{id: req.params.id, userId: req.user.id}};
    }
    Country.destroy(query)
    .then(()=> res.status(200).json({message: "Country Deleted!"}))
    .catch((err)=> res.status(500).json({error:err}));
})




module.exports = router;