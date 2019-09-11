var express = require('express');

const multer = require('multer');
var upload = multer({ dest: './routes/uploads/'});

var router = express.Router();
var User = require('../dbops/users');
var coment = require('../dbops/posts');

var loggedin = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bienvenidos' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Registro' });
});

router.get('/registro', function(req, res, next) {
  res.render('registro', { title: 'Registro', message: req.flash('signupMessage') });
});

//************Perfil
router.get('/perfil', loggedin, function (req, res, next) {
  let id= req.user.id;
  //console.log(req.user);
  
  User.findOne({_id:req.user.id},
      function (err, doc) {
        if (err) {
            res.status(500).send('error occured')

        } else {
          
          if(doc.perfil){
            
            let aux =[];
            aux.push({name:doc.perfil.name, lastname:doc.perfil.lastname, city:doc.perfil.city, 
                      ocupa:doc.perfil.ocupa, perfimg:doc.perfil.perfimg});
            console.log(aux);
            res.render('perfil', { user: req.user, title:req.user.username,
                                   indexRouter:aux                 
            });  
          }else{
                      // aux.push({User.})
          //res.render('/perfil', {});
          //
          res.render('perfil', { user: req.user, title:req.user.username});
          }
        }
    })
    
});

router.get('/perfiledit', loggedin, function (req, res, next) {
  let id= req.user.id;
  console.log(req.user);
  User.findOne({_id:req.user.id},
    function (err, doc) {
      if (err) {
          res.status(500).send('error occured')

      } else {
        
        if(doc.perfil){
          
          let aux =[];
          aux.push({name:doc.perfil.name, lastname:doc.perfil.lastname, city:doc.perfil.city, 
                    ocupa:doc.perfil.ocupa, perfimg:doc.perfil.perfimg});
          console.log(aux);
          res.render('perfiledit', { user: req.user, title:req.user.username,
                                 indexRouter:aux                 
          });  
        }else{
                    // aux.push({User.})
        //res.render('/perfil', {});
        //
        res.redirect(location()+'perfil');
        }
      }
  })
});

router.post('/perfiledit', function (req, res) {
  console.log(req.body); 
          let datos =[{
            name:req.body.name,
            lastname: req.body.lastname,
            city : req.body.city,
            ocupa : req.body.ocupa ,
            perfimg: "routes/upload/foto" + req.user.id + ".jpg"         
            }];
        
        console.log(datos);
        User.findOneAndUpdate({_id: req.user.id},
            {$set: {perfil: datos}}, function (err, doc) {
            if (err) {
                res.status(500).send('error occured')
                
            } else {
              //res.render('perfiledit', {title:'Editar', user: req.user, title:req.user.username});         
              
                console.log(datos);
                res.render('perfiledit', { user: req.user, title:req.user.username,
                                      indexRouter:datos });
                      //res.redirect('/perfil');
            }
        })  
      
});


router.post('/upload', function(req, res, next) {
  backURL=req.header('Referer') || '/';
  // do your thang
  
  console.log(req.files);
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  // Use the mv() method to place the file somewhere on your server
  let fotos = [];
  let conta_fotos = 0;

      sampleFile.mv('./img/uploads/foto' + req.user.id + '.jpg', function(err) {
        if (err)
          return res.status(500).send(err);
          res.redirect(backURL);
      });

}); 

//----------upload
router.get('/upload', function(req, res, next) {
  res.render('', { title: 'Bienvenidos' });
});

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

//----------amigos
router.get('/amigos', function(req, res, next) {
  res.render('amigos', { user: req.user, title:req.user.username} );
});


//----------blog

router.get('/blog', function(req, res, next) {  
  coment.find({}, function (err, doc) {
    if (err) {
        res.status(500).send('error occured')
        
    } else {
      //res.render('perfiledit', {title:'Editar', user: req.user, title:req.user.username});         
        console.log(doc);
          res.render('blog', { user: req.user, title:req.user.username,
            indexRouter:doc });

    }
  })

});

router.post('/blog', loggedin, function(req, res, next) {
  console.log(req.user)
  var d = new Date();
  var curr_date = d.getDate();
  var curr_month = d.getMonth() + 1; //Months are zero based
  var curr_year = d.getFullYear();
  var fecha = curr_month + "/" + curr_date + "/" + curr_year;
  console.log(Date.now());

  console.log(req.body); 
          let blog =[{
            fcoment: fecha,
            coment: req.body.coment,
            blogimg:'routes/upload/foto' + req.user.id + '.jpg'
            }];
            let post = new coment({
              id: req.user.id,
              username: req.user.username,
              coment: req.body.coment,
              fcoment:fecha
            })
        
        console.log(blog);
        User.findOneAndUpdate({_id: req.user.id},
            {$push: {blog: blog}}, function (err, doc) {
            if (err) {
                res.status(500).send('error occured')
                
            } else {
              //res.render('perfiledit', {title:'Editar', user: req.user, title:req.user.username});         
                console.log(blog);
                
               let aux = [{
                  username: req.user.username,
                  coment: req.body.coment,
                  fcoment:fecha
                }]
                post.save(function(err){
                  if(err) throw err;
                  res.render('blog', { user: req.user, title:req.user.username,
                    indexRouter:aux });

                });
                      //res.redirect('/perfil');
            }
        })  
  //res.render('blog', { user: req.user, title:req.user./username} );
});
//----------------------------------------
module.exports = router;
//} //end of Exports
