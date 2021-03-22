var express = require('express');
var router = express.Router();
var axios = require('axios');

var prefixes = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX p: <http://www.daml.org/2003/01/periodictable/PeriodicTable#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  
`

var getLink = "http://localhost:7200/repositories/TabelaPeriodica?query=";



var elementos = `SELECT * WHERE { ?s p:symbol ?symbol . ?s p:period ?period  } order by asc(?period)`
var grupos    = `SELECT ?s ?number WHERE { ?s rdf:type p:Group . OPTIONAL{ ?s p:number ?number } . } ORDER BY (?s)`
var periodos  = `SELECT * WHERE { ?s rdf:type p:Period .} ORDER BY (?s)`


/* GET home page. (menu inicial com elementos, grupos e períodos)*/
router.get('/', function(req, res) {
  res.render('index');
});



/* Página com todos os elementos da tabela */
router.get('/elementos', function(req, res) {
  var encoded = encodeURIComponent(prefixes + elementos);

  axios.get(getLink + encoded)
    .then(dados => {
      var elems = dados.data.results.bindings.map(bind => bind.s.value.split('#')[1])

      res.render('elementos', {
        els: elems
      });
    })

    .catch(erro => console.log(erro))

});




router.get('/grupos', function(req, res) {
  var encoded = encodeURIComponent(prefixes + grupos);

  axios.get(getLink + encoded)
    .then(dados => {
      var props = dados.data.results.bindings.map(bind => bind.s.value.split('#')[1] )

      res.render('grupos', {
        grupos: props
      });
    })

    .catch(erro => console.log(erro))
});



router.get('/periodos', function(req, res) {
  var encoded = encodeURIComponent(prefixes + periodos);

  axios.get(getLink + encoded)
    .then(dados => {
      var props = dados.data.results.bindings.map(bind => bind.s.value.split('#')[1] )

      console.log(JSON.stringify(props));
      res.render('periodos', {
        prds: props
      });
    })

    .catch(erro => console.log(erro))
});



router.get('/elemento/:id', function(req, res) {
  var query = `SELECT * WHERE { p:` + req.params.id + ` ?p ?o }`;
  var encoded = encodeURIComponent(prefixes + query);

  axios.get(getLink + encoded)
    .then(dados => {

      var props = dados.data.results.bindings.map(bind => {return({
        p: bind.p.value.split('#')[1],
        o: (bind.o.type == 'literal') ? bind.o.value : bind.o.value.split('#')[1]
      })
    })
    console.log("isto: "+ JSON.stringify(props));

    res.render('elemento',{elem: props})

    })

    .catch(erro => console.log(erro))
});





module.exports = router;
