var mongoose=require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
var promotionSchema=new Schema({
    name: {
        type: String,
        required: true
    },
    image:{
        type:String,
        required: true
    },
    label: {
        type: String,        
        default: '',         
    },    
    price:{
        type:Currency
    },
    description:{
        type: String,
        required: true
    }
},{
    timestamps: true
  });
var Promotions=mongoose.model('Promotions',promotionSchema);
module.exports=Promotions;