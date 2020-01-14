//***************************************************************************
// BloggApp, all rights reserved, 2018-2020. Developed by Kirill Makeev.
//***************************************************************************
// Component: Additional Functions And MiddleWare
// Type: Backend, Frontend
//***************************************************************************

let Post = require("../models/post");
let Comment = require("../models/comment");

module.exports = {
  functions: {
    sortNameAsc: function(a, b){
      if(a['Наименование'] > b['Наименование']){
        return 1
      }
      if(a['Наименование'] < b['Наименование']){
        return -1
      }
      return 0
    },
    sortNameDesc: function(a, b){
      if(a['Наименование'] < b['Наименование']){
        return 1
      }
      if(a['Наименование'] > b['Наименование']){
        return -1
      }
      return 0
    }
  },
  middleware: {
    permissions: {
      isNotLoggedIn: function(req, res, next){
        if(!req.isAuthenticated()){
          return next();
        }
        res.status(403).send("User is authenticated");
      },
      isAdmin: function(req, res, next){
        if(req.isAuthenticated()){
            if(req.user.isAdmin){
                return next();
            } else {
                res.status(403).send('Not allowed')
            }
        } else {
          res.status(401).send('Not authenticated')
        }
      },
      checkUserBlogPost: function(req, res, next){
        if(req.isAuthenticated()){
          Post.findById(req.params.id, function(err, post){
            if(err){
              res.status(400).send('Error occured while finding Post in checkUserBlogPost');
            } else if(post.author.id.equals(req.user._id)){
              next();
            } else if(req.user.isAdmin){
              next();
            } else {
              res.status(403).send('Not allowed');
            }
          });
        } else {
          res.status(401).send('Not authenticated');
        }
      },
      checkUserComment: function(req, res, next){
        if(req.isAuthenticated()){
          Comment.findById(req.params.id, function(err, comment){
            if(err){
              res.status(400).send('Error occured while finding Post in checkUserComment');
            } else if(comment.author.id.equals(req.user._id)){
              next();
            } else if(req.user.isAdmin){
              next();
            } else {
              res.status(403).send('Not allowed');
            }
          });
        } else {
          res.status(401).send('Not authenticated');
        }
      }
    }
  }
}
