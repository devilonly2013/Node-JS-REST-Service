var express= require('express');
var bodyParser=require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');

var favoriteRouter=express.Router();
favoriteRouter.use(bodyParser.json());
var Verify = require('./verify');

favoriteRouter.route('/')
.get(Verify.verifyOrdinaryUser,function(req,res,next){
    Favorites.find({})
    .populate('postedBy')
    .populate('dishes.comments')    
    .exec(function(err,favorite){
        if(err) throw err;
        res.json(favorite);        
    });
    
})
.post(Verify.verifyOrdinaryUser,function(req,res,next){    
    var curId=req.decoded._doc._id;   
    Favorites.findOne({postedBy:curId},function(err,favorite){
        if(err) throw err;
        if(favorite){
            favorite.dishes.push(req.body);
        }
        else{             
            favorite = new Favorites({postedBy:curId});
            favorite.dishes.push(req.body);  
        }
        favorite.save(function(err,favorite){
        if(err) throw err;
        res.json(favorite);
        
         });
    });  
   
  
})
.delete(Verify.verifyOrdinaryUser,function(req,res,next){
    var curId=req.decoded._doc._id;
   Favorites.findOne({postedBy:curId})
   .exec(function(err,favorite){
        if(err) throw err;        
        favorite.remove();       
        favorite.save(function(err,resp){
            if(err) throw err;
            res.json(resp);
        });   
   });
    
});
favoriteRouter.route('/:dishObjectId')
.delete(Verify.verifyOrdinaryUser, function(req,res,next){
    var curId=req.decoded._doc._id;  
    Favorites.findOne({postedBy:curId}, function(err,favorite){
        if(err) throw err;       
        var index = favorite.dishes.indexOf(req.params.dishObjectId);        
        favorite.dishes.splice(index);      
        favorite.save(function(err,resp){
            if(err) throw err;
            res.json(resp);
        });
        
    })
    
});

module.exports = favoriteRouter;