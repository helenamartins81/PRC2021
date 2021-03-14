var express = require('express');
var router = express.Router();
var axios = require('axios')

var prefixes = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX adv: <http://www.di.uminho.pt/prc2021/Charada#>
`

var getLink = "http://localhost:7200/repositories/" 

var query1 = `select * where { ?s rdf:type owl:Class }`
var query2 = `select * where { ?s a adv:`
var query3 = `select * where { adv:`






/* GET home page. */
router.get('/', function(req, res) {

  axios.get("http://localhost:7200/rest/repositories/")
    .then(dados => {
      repos = dados.data.map(r => {
        return({
            id: r.id,
            tit: r.title
        })
    })
      
      res.render('index', { 
        title: 'Repositórios em GraphDB', 
        lista: repos});
    })
    .catch(erro => console.log(erro))
    
});



/* Página de um repositório onde tem as classes */
router.get('/rep/:id', function(req,res){
  var encoded1 = encodeURIComponent(prefixes + query1)

  axios.get(getLink + req.params.id+'?query=' + encoded1)
    .then(dados => {
      var classes = dados.data.results.bindings.map(bind => bind.s.value.split('#')[1])
      console.dir(classes)
      res.render('repositorio', {
        cls: classes, 
        rep: req.params.id
      })
    })
    .catch(erro => console.log(erro))
})



/* Página de um repositório onde tem as classes */
router.get('/classe/:id/:nome', function(req,res){
  var encoded2 = encodeURIComponent(prefixes + query2+req.params.nome+'}')

  axios.get(getLink + req.params.id+'?query=' + encoded2)
    .then(dados => {
      var individuos = dados.data.results.bindings.map(bind => bind.s.value.split('#')[1])
      console.dir(individuos)
      res.render('classe', {
        inds: individuos,
        rep: req.params.id
      })
    })
    .catch(erro => console.log(erro))
})


router.get('/individuo/:id/:ind', function(req,res){
  var encoded3 = encodeURIComponent(prefixes + query3+req.params.ind+'?p ?o .}')


  axios.get(getLink + req.params.id+'?query=' + encoded3)
    .then(dados => {

      var props = dados.data.results.bindings.map(bind => {return {
        p: bind.p.value.split('#')[1],
        o: (bind.o.type == 'literal') ? bind.o.value : bind.o.value.split('#')[1]
      }})
      
      console.dir(props)
      
      res.render('individuo', {
        propriedades: props,
        x: req.params.ind
      })

    })
    .catch(erro => console.log(erro))
})



module.exports = router;
