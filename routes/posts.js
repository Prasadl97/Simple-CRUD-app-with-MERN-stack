const bodyParser = require('body-parser');
const express = require('express');
const Posts = require('../models/posts');

const router = express.Router();

//saving posts
//this describes what should happen when request arrive
router.post('/post/save',(req,res)=>{
        
    let newPost = new Posts(req.body);

    newPost.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }

        return res.status(200).json({
            success:"posts saved successfully"
        });
    });

});

//get posts

//retrieving the posts in the db
router.get('/posts',(req,res) =>{
    Posts.find().exec((err,posts) =>{
        if(err){
            return res.status(400).json({//showing to user the error generated
        });

        }
        return res.status(200).json({
            success:true,
            existingPosts:posts
        });
    }); 
});

//getting a specific post
router.get("/post/:id",(req,res)=>{

         let postId = req.params.id;

        Posts.findById(postId,(err,post)=>{

        if(err){
                return res.status(400).json({success:false,err});
        }

        return res.status(200).json({
             success:true,
             post
        });
    });
});

//updating posts
//since we update only one post at a time,id should  be included
router.put('/post/update/:id',(req,res)=>{

    Posts.findByIdAndUpdate(
        req.params.id,//id to be updated
        {
          $set:req.body //function to update whole body(topic,description,postcategory) 
        },
        (err,post)=>{
          if(err){
              return res.status(400).json({error:err});
          }

          return res.status(200).json({
              success:"updated successfully"
          });
        }
    );
});

//deleting a post
//since we delete only one post at a time,id should be included
router.delete('/post/delete/:id',(req,res)=>{
    Posts.findByIdAndRemove(req.params.id).exec((err,deletedPost)=>{

        if(err) return res.status(400).json({
            message:"delete unsuccessful",err
        });

        return res.json({
            message:"delete successfull",deletedPost
        });

    })
});

    
module.exports = router;