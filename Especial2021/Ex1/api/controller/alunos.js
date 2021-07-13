var Aluno = module.exports
const axios = require('axios')

function myNormalize(r) {
    return r.results.bindings.map(o =>{
        var novo = {}
        for (let [k, v] of Object.entries(o)) {
            novo[k] = v.value
        }
        return novo;
    })
}

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX m:<http://www.di.uminho.pt/prc2021/avaliacao#>
`

var getLink = "http://localhost:7200/repositories/Alunos" + "?query=" 


Aluno.getAlunos = async function(){
    
    var query = `SELECT ?nome ?id ?curso WHERE { 
	    ?aluno a m:Aluno .
        ?aluno m:idAluno ?id .
        ?aluno m:nome ?nome .
        ?aluno m:curso ?curso .
        
}
group by ?nome ?id ?curso
     ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}



Aluno.getAluno = async function(id){
    
    var query = `SELECT ?id ?nome ?curso ?exame ?tpc WHERE { 
        ?aluno a m:Aluno .
        ?aluno m:idAluno ${id} .
        ?aluno m:nome ?nome .
        ?aluno m:curso ?curso .
        ?aluno m:realizaExame ?exame .
        ?aluno m:realizaTpc ?tpc .
    
    
    }
    ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}



Aluno.getAlunosCurso = async function(nome){
    
    var query = `SELECT ?id ?nome ?curso WHERE { 
        ?aluno a m:Aluno .
        ?aluno m:idAluno ?id .
        ?aluno m:nome ?nome .
        ?aluno m:curso ${nome} .
      
    }
    group by ?nome
    ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}


Aluno.getAlunosTpc = async function(){
    
    var query = `SELECT ?id ?nome ?curso (count(distinct ?tpc) as ?numTpc)WHERE { 
        ?aluno a m:Aluno .
        ?aluno m:idAluno ?id .
        ?aluno m:nome ?nome .
        ?aluno m:curso ?curso .
    	?aluno m:realizaTpc ?tpc .
      
    }
    group by ?id ?nome ?curso
    ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}



Aluno.getListaCurso = async function(){
    
    var query = `SELECT ?curso (count(distinct ?aluno) as ?numAluno)WHERE { 
        ?aluno a m:Aluno .
        ?aluno m:curso ?curso .
      
    }
    group by ?curso

    ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}


Aluno.getListaProjeto = async function(){
    
    var query = `SELECT ?nota (count(distinct ?aluno) as ?numAluno)WHERE { 
        ?aluno a m:Aluno .
        ?aluno m:realizaProjeto ?p .
   		?p m:nota ?nota
      
    }
    group by ?nota
    ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}


Aluno.getListaRecurso = async function(){
    
    var query = `SELECT ?id ?nome ?curso ?nota WHERE { 
        ?aluno a m:Aluno .
    	?aluno m:nome ?nome .
    	?aluno m:idAluno ?id .
    	?aluno m:curso ?curso .
        ?aluno m:realizaExame ?e .
   		?e m:tipoExame "recurso" .
    	?e m:nota ?nota .
      
    }
group by ?nome 
    ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}



