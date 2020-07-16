var mongoose = require('mongoose');
const category = require('./category');
const{ObjectId}=mongoose.Schema

var productSchema = new mongoose.Schema({
           name:{
               type:String,
               required:true,
               maxlength:32,
               trim:true
           },
           description:{
            type:String,
            required:true,
            maxlength:2500,
            trim:true
           },
           price:{
            type:Number,
            required:true,
            maxlength:32, 
            trim:true         
           },
           category:{
               type:ObjectId,
               ref:"category",
               required:true
           },
           stock:{
               type:Number,
           },
           sold:{
               type:Number,
               default:0
           },
           photo:{
               data:Buffer,
               contentType:String,
           },


},{timestamps:true})

module.exports=mongoose.model("product",productSchema);