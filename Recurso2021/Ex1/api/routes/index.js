var express = require('express');
var router = express.Router();
var Cinema = require('../controller/cinema')

/* GET home page. */
router.get('/api/filmes', function(req, res, next) {
  Cinema.getFilmes()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro : ${e}`))
});



router.get('/api/filmes', function(req, res, next) {
  Cinema.getFilmesPorAno(req.query.ano)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro : ${e}`))
});
module.exports = router;

router.get('/api/filmes/:id', function(req, res, next) {
  Cinema.getFilme(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro : ${e}`))
module.exports = router;

router.get('/api/atores', function(req, res, next) {
  Cinema.getAtores()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro : ${e}`))
});



router.get('/api/atores/:id', function(req, res, next) {
  Cinema.getAtorFilmes(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro : ${e}`))
});


router.get('/api/generos', function(req, res, next) {
  Cinema.getGeneros()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro : ${e}`))
});


router.get('/api/filme', function(req, res, next) {
  Cinema.getGenero(req.query.gen)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro : ${e}`))
});

module.exports = router;