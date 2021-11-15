const router = require("express").Router();
const { Review } = require('../models');
const validateSession = require('../middleware/validate-session');

router.post("/create/:countryId", validateSession, (req, res) => {
    const review = {
        reviews: req.body.review.reviews,
        favorites: req.body.review.favorites,
        userId: req.user.id,
        countryId: req.params.countryId
    }
    Review.create(review)
    .then(review => res.status(200).json(review))
    .catch(err=> res.status(500).json({error:err}))
})

router.get("/get", validateSession, (req, res) => {
    const query = {where:{userId:req.user.id}};
    Review.findAll(query)
    .then((review)=> res.status(200).json(review))
    .catch(err=> res.status(500).json({error:err}))
});

router.get("/:id", validateSession, (req, res)=> {
    const query = {where:{ userId: req.user.id}};
    Review.findAll(query)
    .then((review)=> res.status(200).json(review))
    .catch(err=> res.status(500).json({error:err}))
});

router.put("/update/:countryId", validateSession, (req,res)=> {
    const updateReviewEntry ={
        reviews: req.body.review.reviews,
        favorites: req.body.review.favorites
    }

    const query = {where:{countryId: req.params.countryId, userId: req.user.id}};

    Review.update(updateReviewEntry, query)
    .then((review)=> res.status(200).json(review))
    .catch(err=> res.status(500).json({error:err}))
});

router.delete("/delete/:id", validateSession, (req,res)=> {
    // let query
    // if(req.user.is_admin===true){
    //     query = {where:{id: req.params.id}};
    // }else{
    //     query = {where:{id: req.params.id}};
    // }
    let query= {where:{id: req.params.id}};
    Review.destroy(query)
    .then((review)=> res.status(200).json({message: "Review deleted!", review}))
    .catch((err)=> res.status(500).json({error:err}));
})


module.exports = router;