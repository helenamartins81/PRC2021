var Cinema = module.exports
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
    PREFIX m:<http://www.di.uminho.pt/prc2021/cinema#>
`

var getLink = "http://localhost:7200/repositories/Cinema" + "?query=" 


Cinema.getFilmes = async function(){
    
    var query = `SELECT ?id ?titulo ?ano (count(distinct ?ator) as ?numAtores) WHERE { 
	?id a m:Filme .
    ?id m:title ?titulo .
    ?id m:data ?ano .
    ?id m:temParticipaçãoDe ?ator .
}
group by ?id ?titulo ?ano
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


Cinema.getFilmesPorAno = async function(ano){
    
    var query = `SELECT ?titulo  WHERE { 
	?filme a m:Filme .
    ?filme m:data ${ano} .
    ?filme m:title ?titulo .
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

Cinema.getFilme = async function(id){
    
    var query = `SELECT ?titulo ?ano (group_concat(?ator;separator=";") as ?atores) (group_concat(?genero;separator=";") as ?generos) WHERE { 
	${id} a m:Filme .
    ${id} m:title ?titulo .
    ${id} m:data ?ano .
    ${id} m:temParticipaçãoDe ?ator .
    ${id} m:temGénero ?genero .
}
group by ?titulo ?ano` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Cinema.getAtores = async function(){
    
    var query = `SELECT distinct ?ator  WHERE { 
	?a a m:Ator .
    ?a m:nome ?ator .
}
order by ?ator` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}



Cinema.getAtorFilmes = async function(nome){
    
    var query = `SELECT ?titulo ?ano WHERE { 
	?filme a m:Filme .
    ?filme m:title ?titulo .
    ?filme m:data ?ano .
    ?filme m:temParticipaçãoDe ?ator .
    ?ator m:nome ${nome} .
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



Cinema.getGeneros = async function(){
    
    var query = `SELECT distinct ?genero  WHERE { 
	?g m:Género .
    ?g m:designação ?genero .
}
order by ?genero
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

Cinema.getGenero = async function(genero){
    
    var query = `SELECT ?titulo WHERE { 
	?filme a m:Filme .
    ?filme m:temGénero ?gen .
    ?gen m:designação ${genero} .
    ?filme m:title ?titulo .
}
order by ?titulo` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}