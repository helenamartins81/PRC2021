var express = require('express');
var router = express.Router();
var Aluno = require('../controller/alunos')


/* GET home page. */
//deu
router.get('/api/alunos', function(req, res, next) {
  Aluno.getAlunos()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro : ${e}`))
});


//GET /api/alunos?curso=X - Devolve apenas uma lista, ordenada alfabeticamente por nome, com os alunos do curso X;

router.get('/api/alunos', function(req, res, next) {
  Aluno.getAlunosCurso(req.query.curso)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro : ${e}`))
});



//corrigir
router.get('/api/alunos/:id', function(req, res, next) {
  Aluno.getAluno(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro : ${e}`))
});



//GET /api/alunos?groupBy=curso 

router.get('/api/alunos', function(req, res, next) {
  if(req.query.groupBy == 'curso'){
    Aluno.getListaCurso()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro : ${e}`))
  }
  else if (req.query.groupBy == 'projeto'){
    Aluno.getListaProjeto()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro : ${e}`))
  }
  else if (req.query.groupBy =='recurso'){
    Aluno.getListaRecurso()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro : ${e}`))  
  }
  
});



//GET /api/alunos/tpc  deu
router.get('/api/alunos/tpc', function(req, res, next) {
  Aluno.getAlunosTpc()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro : ${e}`))
});



module.exports = router;