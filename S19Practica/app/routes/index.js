var express = require('express');
var router = express.Router();
const data = require('../userData');
const methods = require('../methods');
const save = require('../registro');
const User = require('../models/user');

//rutas
const registerRoute = "../views/pages/register";
const loginRoute = "../views/pages/login";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Programación Computacional IV' });
});

router.get('/home', (req, res) => {
  if (req.user) {
    res.render('home', {title: "Bienvenido", userName: req.user.fullName});
  } else {
    res.render(loginRoute, {
      message: "Inicie sesión para continuar",
      messageClass: "alert-danger"
    });
  }
});

router.get('/register', (req, res) => {
  res.render(registerRoute);
});

router.get('/login', (req, res) => {
  res.render(loginRoute);
});

router.post('/register', async (req, res) => {
  const { email, fullName, password, confirmPassword } = req.body;

  try
  {
    //verificar si el password coincide
    if (password === confirmPassword) {
    //validar si el correo existe
    user = await User.findOne({ email: email })
      .then(user => {
        if(user){
          res.render(registerRoute, {
            message: "El usuario ya esta registrado",
            messageClass: "alert-danger"
        });
      } else {
        //encriptamos el password
        const hashedPassword = methods.getHashedPassword(password);
        //creamos un nuevo objeto a partir del modelo User
        const userDB = new User({
          'fullName': fullName,
          'email': email,
          'password': hashedPassword
        })
        //guardar los datos
        userDB.save();

        res.render(loginRoute, {
          message: "El registro se ha completado",
          messageClass: "alert-success"
        });
      }
    })

  } else {
    res.render(registerRoute, {
      message: "El password no coincide",
      messageClass: "alert-danger"
    });
  }
  }
  catch(error)
  {
    console.log('error', error);
  }
  
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = methods.getHashedPassword(password);

  user = await User.findOne({ email: email, password: hashedPassword })

  .then (user => {
     if(user){
    const authToken = methods.generateAuthToken();
    //almacenar el token de autenticacion
    methods.authTokens[authToken] = user;
    res.cookie('AuthToken', authToken); // setting token
    res.redirect("/home"); // redireccionar
    } else {
      res.render(loginRoute, {
        message: "Usuario y password invalidos",
        messageClass: "alert-danger"
      });
    }
  })
});

//logout
router.get('/logout', (req, res) => {
  res.clearCookie('AuthToken');
  return res.redirect('/');
})
module.exports = router;
