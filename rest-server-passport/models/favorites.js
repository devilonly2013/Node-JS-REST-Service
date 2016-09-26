var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var farvoriteSchema = new Schema({
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    dishes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Dish'        
    }]   
},{
    timestamps: true
});

var Favorites = mongoose.model('Favorites',farvoriteSchema);
module.exports = Favorites;