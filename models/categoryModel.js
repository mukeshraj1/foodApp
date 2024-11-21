const mongoose=require('mongoose')
const categorySchema=new mongoose.Schema({
    "title":{
        type:String,
        required:[true,"title is required"],
    },
    "imageUrl":{
        type:String,
        default:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1280px-Good_Food_Display_-_NCI_Visuals_Online.jpg"
    }
},{
    timestamps:true
})

module.exports=mongoose.model("Category",categorySchema)