import json

with open('movies.json',"r", encoding='utf8') as f:
    data = json.load(f)

    with open('individuals.txt', 'w', encoding='utf8') as m:
        for i in data:
            m.write("###  http://www.di.uminho.pt/prc2021/cinema#"+i['title'].replace(' ','_').replace('\'', '')+'\n')
            m.write(':' + i['title'].replace(' ','_').replace('\'', '').replace(',', '') + ' rdf:type owl:NamedIndividual ;\n')
            for j in i['genres']:
                m.write('\t\t:temGénero :'+ j +' ; \n')
            for j in i['cast']:
                m.write('\t\t:temParticipaçãoDe :'+ j.replace(' ','_').replace('\'', '') +' ; \n')

            m.write('\t\t:ano '+str(i['year'])+' ; \n')
            m.write('\t\t:title \"'+i['title'].replace(' ','_').replace('\'', '')+'\" . \n\n')
        
        for i in data:
            for j in i['cast']:
                m.write("###  http://www.di.uminho.pt/prc2021/cinema#"+j.replace(' ','_').replace('\'', '')+'\n')
                m.write(':' + j.replace(' ','_').replace('\'', '') + ' rdf:type owl:NamedIndividual ;\n')
                m.write('\t\t:nome \"'+j.replace(' ','_').replace('\'', '')+'\" . \n\n')


        for i in data:
            for j in i['genres']:
                m.write("###  http://www.di.uminho.pt/prc2021/cinema#"+j.replace(' ','_').replace('\'', '')+'\n')
                m.write(':' + j.replace(' ','_').replace('\'', '') + ' rdf:type owl:NamedIndividual ;\n')
                m.write('\t\t:designação \"'+j.replace(' ','_').replace('\'', '')+'\" . \n\n')
           
f.close()
m.close()






