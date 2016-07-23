var express = require("express");
var router = express.Router();
var mId = require("mongodb").ObjectId;
//otra forma para crear un midleware. Este se ejecuta cada que llega el parametro
router.param("collection", function (req, res, next, c) {
    req.c = req.db.collection(c);
    next();//continuamos a la siguiente etapa
});

router.post("/:collection", function (req, res, next) {
    var obj = req.body;//obtenemos el objeto a insertar
    req.c.insert(obj, {w:1}, function (err, result) {
        if(err) {
            //ERROR!, notificamos que no fue exitoso
            res.send({success:false});
        } else {
            //EXITOSO !!, notificamos que fue exitoso
            res.send({success:true, id:result.inseertedIds[0]});
        }
    });
});

router.delete("/:collection/:id", function (req, res, next) {
    var id = new mId(req.params.id);
    req.c.deleteOne({_id:id}, function (err, result){
        if(err) {
            res.send({success:false});
        } else {
            res.send({success:true});
        }
    });
});

router.get("/:collection", function (req, res, next) {
    req.c.find().toArray(function(err, results) {
        if(err) {
            res.send([]);
        } else {
            res.send(results);
        }
    });
});

router.get("/:collection/:id", function (req, res, next) {
    var id = new mId(req.params.id);
    req.c.findOne({_id:id}, function (err, result){
        if(err || result == null) {
            res.status(404).send({msg:"No encontrado"});
        } else {
            res.send(result);
        }
    });
});

router.put("/:collection/:id", function (req, res, next) {
    var id = new mId(req.params.id);
    var obj = req.body;
    req.c.update({_id:id}, {$set:obj}, function (err, result){
        if(err) {
            res.send({success:false});
        } else {
            res.send({success:true});
        }
    });
});

module.exports = router;