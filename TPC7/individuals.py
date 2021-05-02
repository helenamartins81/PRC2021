import json

with open('mapavirtual.json',"r", encoding='utf8') as f:
    data = json.load(f)

    with open('individuals.txt', 'w', encoding='utf8') as mapa:
        for i in data['cidades']:
            mapa.write("###  http://www.di.uminho.pt/prc2021/mapa#"+i['id']+'\n')
            mapa.write(':' + i['id'] + ' rdf:type owl:NamedIndividual ,\n')
            mapa.write('            :Cidade ;\n')
            mapa.write('    :descricao "' + i['descrição'] + '" ;\n')
            mapa.write('    :distrito "' + i['distrito'] + '" ;\n')
            mapa.write('    :nome "' + i['nome'] + '" ;\n')
            mapa.write('    :populacao ' + i['população'] + ' .\n \n \n')

        for l in data['ligações']:
            mapa.write("###  http://www.di.uminho.pt/prc2021/mapa#"+l['id']+'\n')
            mapa.write(':' + l['id'] + ' rdf:type owl:NamedIndividual ,\n')
            mapa.write('            :Ligacao ;\n')
            mapa.write('    :temDestino "' + l['destino'] + '" ;\n')
            mapa.write('    :temOrigem "' + l['origem'] + '" ;\n')
            mapa.write('    :distancia "' + str(l['distância']) + '" .\n \n \n')

            

f.close()
mapa.close()


