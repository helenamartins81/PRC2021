
import json

with open('aval-alunos.json',"r", encoding='utf8') as f:
    data = json.load(f)

    with open('individuals.txt', 'w', encoding='utf8') as m:
        for i in data['alunos']:
            m.write("###  http://www.di.uminho.pt/prc2021/avaliacao#"+i['idAluno']+'\n')
            m.write(':' + i['idAluno'] + ' rdf:type owl:NamedIndividual ;\n')
            for k in i['exames'].items():
                m.write('\t\t:realizaExame :e_' + k[0] + '_'+i['idAluno']+' ; \n')
            m.write('\t\t:realizaProjeto :p_'+i['idAluno']+' ; \n')
            for j in i['tpc']:
                m.write('\t\t:realizaTpc :'+j['tp']+' ; \n')
            m.write('\t\t:curso "'+ i['curso']+'" ; \n')
            m.write('\t\t:idAluno "'+i['idAluno']+'" ; \n')
            m.write('\t\t:nome "'+i['nome']+'". \n\n')


        for i in data['alunos']:
            for k in i['exames'].items():
                m.write("###  http://www.di.uminho.pt/prc2021/avaliacao#e_"+k[0]+'_'+i['idAluno']+'\n')
                m.write(':e_'+k[0]+'_'+i['idAluno'] + ' rdf:type owl:NamedIndividual ;\n')
                m.write('\t\t:exameRealizadoPor :'+ i['idAluno']+' ; \n')
                m.write('\t\t:nota '+ str(k[1])+' ; \n')
                m.write('\t\t:tipoExame "'+k[0]+'" . \n\n')
            

        for i in data['alunos']:
            m.write("###  http://www.di.uminho.pt/prc2021/avaliacao#p_"+i['idAluno']+'\n')
            m.write(':p_'+i['idAluno'] + ' rdf:type owl:NamedIndividual ;\n')
            m.write('\t\t:realizadoPor :'+ i['idAluno']+' ; \n')
            m.write('\t\t:nota '+ str(i['projeto'])+' . \n\n')
                
            
        for i in data['alunos']:
            for k in i['tpc']:
                m.write("###  http://www.di.uminho.pt/prc2021/avaliacao#"+k['tp']+'\n')
                m.write(':'+k['tp']+ ' rdf:type owl:NamedIndividual ;\n')
                m.write('\t\t:tpcRealizadoPor :'+ i['idAluno']+' ; \n')
                m.write('\t\t:nota '+ str(k['nota'])+' ; \n')
                m.write('\t\t:tp "'+k['tp']+'" . \n\n')

f.close()
m.close()






