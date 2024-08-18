-- SQLITE
-- substantivos latinos

CREATE TABLE IF NOT EXISTS substantivos
(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  genero CHAR,
  declinacao INT,
  nomS TEXT, genS TEXT, datS TEXT, acuS TEXT, ablS TEXT, locS TEXT, vocS TEXT,
  nomP TEXT, genP TEXT, datP TEXT, acuP TEXT, ablP TEXT, locP TEXT, vocP TEXT,
  CONSTRAINT genero CHECK ( genero = 'f' OR genero = 'm' OR genero = 'n' ),
  CONSTRAINT declinacao CHECK ( declinacao > 0 AND declinacao < 6 )
);

  
-- substantivos selecionados de acordo com suas caracteristicas
INSERT INTO substantivos( genero,declinacao,nomS,genS,datS,acuS,ablS,locS,vocS,nomP,genP,datP,acuP,ablP,locP,vocP  ) VALUES
('f', 1
    ,'rosa', 'rosae',  'rosae','rosam','rosā','-','-'
    ,'rosae','rosārum','rosīs','rosās','rosīs','-', '-'),

('f', 1
    ,'insula', 'insulae',  'insulae','insulam','insulā','insulae','-'
    ,'insulae','insulārum','insulīs','insulās','insulīs','-', '-'),

('f', 1
    ,'Iulia', 'Iuliae',  'Iuliae','Iuliam','Iuliā','-','Iulia'
    ,'-','-','-','-','-','-', '-'),

('m', 2
    ,'equus', 'equī', 'equō', 'equum', 'equō', '-', '-'
    ,'equī', 'equōrum', 'equīs', 'equōs', 'equīs', '-', '-'),

('m', 2
    ,'puer', 'puerī', 'puerō', 'puerum', 'puerō', '-', '-'
    ,'puerī', 'puerōrum', 'puerīs', 'puerōs', 'puerīs', '-', '-'),

('n', 2
    ,'verbum', 'verbī', 'verbō', 'verbum', 'verbō', '-', '-'
    ,'verba', 'verbōrum', 'verbīs', 'verba', 'verbīs', '-', '-'),

('n', 2
    ,'poculum', 'poculī', 'poculō', 'poculum', 'poculō', '-', '-'
    ,'pocula', 'poculōrum', 'poculīs', 'pocula', 'poculīs', '-', '-'),

('m', 2
    ,'Marcus', 'Marcī', 'Marcō', 'Marcum', 'Marcō', '-', 'Marce'
    ,'-', '-', '-', '-', '-', '-', '-'),

('f', 2
    ,'humus', 'humī', 'humō', 'humum', 'humō', '-', '-'
    ,'humī', 'humōrum', 'humīs', 'humōs', 'humīs', '-', '-'),

('m', 4
    ,'portus','portūs','portuī','portum','portū','portūs','-'
    ,'portūs','portuum','portibus','portūs','portibus','-','-'),

('m', 4
    ,'domus','domūs','domuī','domum','domū','domūs','-'
    ,'domūs','domuum','domibus','domūs','domibus','-','-'),

('n', 4
    ,'cornū','cornūs','cornū',     'cornū','cornū','cornū','-'
    ,'cornūa','cornuum','cornibus','cornūa','cornibus','-','-'),

('m', 3
    ,'sōl','sōlis','sōlī','sōlem','sōle','-','-'
    ,'sōlēs','sōlum','sōlibus','sōlēs','sōlibus','-','-'),

('m', 3
    ,'Caesar','Caesaris','Caesarī','Caesarem','Caesare','-','Caesar'
    ,'-', '-', '-', '-', '-', '-', '-'),

('m', 3
    ,'leō','leōnis','leōnī','leōnem','leōne','-','-'
    ,'leōnēs','leōnum','leōnibus','leōnēs','leōnibus','-','-'),

('f', 3
    ,'vōx','vōcis','vōcī','vōcem','vōce','-','-'
    ,'vōcēs','vōcum','vōcibus','vōcēs','vōcibus','-','-'),

('n', 3
    ,'ōs','ōris','ōrī','ōs','ōre','-','-'
    ,'ōra','ōrum','ōribus','ōra','ōribus','-','-'),

('n', 3
    ,'corpus','corporis','corporī','corpus','corpore','-','-'
    ,'corpora','corporum','corporibus','corpora','corporibus','-','-'),

('n', 3
    ,'opus','operis','operī','opus','opere','-','-'
    ,'opera','operum','operibus','opera','operibus','-','-'),

('n', 3
    ,'nōmen','nōminis','nōminī','nōmen','nōmine','-','-'
    ,'nōmina','nōminum','nōminibus','nōmina','nōminibus','-','-'),

('f', 3
    ,'nāvis','nāvis','nāvī','nāvem','nāve','-','-'
    ,'nāvēs','nāvium','nāvibus','nāvēs','nāvibus','-','-'),

('f', 3
    ,'urbis','urbis','urbī','urbem','urbe','-','-'
    ,'urbēs','urbium','urbibus','urbēs','urbibus','-','-'),

('m', 3
    ,'mōns','montis','montī','montem','monte','-','-'
    ,'montēs','montium','montibus','montēs','montibus','-','-'),

('n', 3
    ,'mare','maris','marī','mare','marī','-','-'
    ,'maria','marium','maribus','maria','maribus','-','-'),

('n', 3
    ,'animal','animālis','animālī','animal','animālī','-','-'
    ,'animalia','animālium','animālibus','animalia','animālibus','-','-'),

('f', 5
    ,'diēs','diēī','diēī','diem','die','-','-'
    ,'diēs','diērum','diēbus','diēs','diēbus','-','-'),

('f', 5
    ,'res','reī','reī','rem','re','-','-'
    ,'rēs','rērum','rēbus','rēs','rēbus','-','-'),

('f', 1
    ,'','','','','','',''
    ,'','','','','','','');
