var express = require("express");
//mediante express se creara un objeto router
var router = express.Router();

router.get("/", function (req, res, next) {
    //para obtener las variables viajan en la url. ejmplo /usuarios?nombre=minombre.
    var nombre = req.query.nombre;
    var apellido = req.query.apellido;
    
    res.send({msg:"metodo get", nombre:nombre + " " + apellido});
});

router.get("/:id", function (req, res, next) {
    var id = req.params.id;
    res.send({msg:"metodo get", id:id});
});

router.post("/", function (req, res, next) {
    res.send({msg:"metodo post"});    
});

router.put("/:id", function (req, res, next) {
    var id = req.params.id;
    res.send({msg:"metodo put", id:id});    
});

router.delete("/:id", function (req, res, next) {
    var id = req.params.id;
    res.send({msg:"metodo delete", id:id});    
});

//exportar el modulo. Para que la rutas sea visible
module.exports = router;