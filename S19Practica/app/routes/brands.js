// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

//llamado al modelo
const Brand = require('../models/brand');

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/brand/brandAddEdit", {
            viewTitle: "New brand",
            userName: req.user.fullName
        });
      } else {
        res.render('../views/pages/login', {
          message: "Inicie sesión para continuar",
          messageClass: "alert-danger"
        });
      }
    
});

router.post('/', (req, res) => {
    if(req.body._id == '')
    newBrand(req, res);
    else
    updateBrand(req, res);
});

//metodo para registrar
function newBrand(req, res) {
    var brand = new Brand();
    brand.name = req.body.name;
    brand.description = req.body.description;
    brand.save((err) => {
        if(!err){
            res.redirect("brand/list");
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//metodo para actualizar
function updateBrand(req, res) {
    Brand.findOneAndUpdate({_id: req.body._id}, req.body, {new: true},
        (err) => {
            if(!err){
                res.redirect("pages/brand/list");
            } else {
                console.log("pages/brand/brandAddEdit", {
                    viewTitle: "Update brand",
                    brand: req.body
                })
            }
        });
}

router.get('/list', (req, res) => {

    if (req.user) {
        Brand.find((err, docs) => {
            if(!err){
                res.render("pages/brand/list", {
                    viewTitle: "Brand List",
                    list: docs
                });
            } else {
                console.log("Error al listar las marcas" + err);
            } 
        })
      } else {
        res.render('../views/pages/login', {
          message: "Inicie sesión para continuar",
          messageClass: "alert-danger"
        });
      }

    
})

router.get('/:id', (req, res) => {
    Brand.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render("pages/brand/brandAddEdit", {
                viewTitle: "Update Brand",
                brand: doc
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Brand.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.redirect("/brand/list");
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
})
module.exports = router;