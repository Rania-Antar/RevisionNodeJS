var express = require('express');
var router = express.Router();
var alert = require('alert-node');

/* GET produits listing. */
router.get('/all', function(req, res, next) {
    var db = req.db;
    var collection = db.get('produits');
    collection.find({}, {}, function(e, docs) {
        //	res.json(docs);
        res.render('listeProduits.twig',{docs});
    });
});

router.get('/add', function(req, res, next) {
    res.render('AjouterProduit.twig')
});

router.post('/addProduit', function(req, res, next) {
    var db = req.db;
    var collection = db.get('produits');

    collection.count({ libelle: req.body.libelle },function(err, result) {
        console.log(result);
        if (err) {
            console.log('The search errored');
        } else if (result == 0) {
            collection.insert(req.body, function(err, result) {
                alert( "Product created successfully");
                res.redirect('/produits/all')
            });
        } else {
            alert('Product exists already !');
        }
    });
});
router.post('/addProduiit', function(req, res, next) {
    var db = req.db;
    var collection = db.get('produits');
    collection.insert(req.body, function(err, result) {
        res.redirect('/produits/all')
    })
});

router.get('/delete/:id', function(req, res, next) {
    var db = req.db;
    var collection = db.get('produits');
    collection.findOne({_id :  req.params.id},function(err, result) {
        console.log(result.quantite);
        if(result.quantite == '0') {
            collection.remove({"_id":result._id}, function(err, result) {
                alert( "Product deleted successfully");
                res.redirect('/produits/all')
            });
        } else {
            alert('Product can not be deleted !');
        }
    });

});

router.get('/update/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('produits');
    collection.findOne({ _id :  req.params.id}, function(err, obj) {
        res.render('ModifProduit.twig',  { produit : obj });
        console.log(obj)
    });


});

router.post('/update', function(req, res) {
    var db = req.db;
    var collection = db.get('produits');

    var newvalues = { $set: { libelle: req.body.libelle, quantite: req.body.quantite, description : req.body.description, date : req.body.date } };
    console.log( req.body.id);
    collection.findOneAndUpdate({ _id : req.body.id}, newvalues, function(err, o) {
        if (err) throw err;
        alert( "Product dupdated successfully");
        res.redirect('/produits/all')
    });

});

router.get('/one/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('produits');
    collection.findOne({_id: req.params.id}, function (err, obj) {
        res.render('AfficherProduit.twig', {item: obj});
        console.log(obj)
    });
});

router.post('/search', function (req, res, next) {
    var q = req.body.q;
    var db = req.db;
    var collection = db.get('produits');
    collection.findOne({_id:q}, {}, function(e, docs) {
        console.log(docs);
        console.log(docs._id);
            if (docs._id == q ) {
                res.render('result.twig', {item: docs});
            }
    });
});

router.get('/filter', function(req, res, next) {
    var db = req.db;
    var collection = db.get('produits');
    collection.find({date:{"$lte":"2020-03-08"}}, {}, function(e, docs) {
        res.render('listeProduits.twig',{docs});
    });
});

module.exports = router;
