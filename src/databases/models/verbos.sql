-- SQLITE - BANCO DE DADOS ESTÁTICO
-- verbos latinos
-- NOTAS: participium perfectum está para ativo


--conjugação para número e pessoa
CREATE TABLE IF NOT EXISTS pessoas
(
  id INTEGER PRIMARY KEY ,

  pri_sing TEXT,
  seg_sing TEXT,
  ter_sing TEXT,
  pri_plur TEXT,
  seg_plur TEXT,
  ter_plur TEXT
);

-- MODOS
CREATE TABLE infinitivos
(
  id INTEGER PRIMARY KEY ,

  voz TEXT,
  praesens  TEXT,
  perfectum TEXT,
  futurum   TEXT,

  CONSTRAINT inf_voz CHECK (
    voz = 'a' OR
    voz = 'p'
  )
);

CREATE TABLE indicativos
(
  id INTEGER PRIMARY KEY ,

  praesens INTEGER,
  imperfectum INTEGER,
  futurum INTEGER,
  perfectum INTEGER,
  plusquamperfectum INTEGER,
  futurumperfectum INTEGER,

  CONSTRAINT fk_pq FOREIGN KEY( plusquamperfectum ) REFERENCES pessoas( id ) ON DELETE CASCADE,
  CONSTRAINT fk_im FOREIGN KEY( imperfectum )       REFERENCES pessoas( id ) ON DELETE CASCADE,
  CONSTRAINT fk_p  FOREIGN KEY( perfectum )         REFERENCES pessoas( id ) ON DELETE CASCADE,
  CONSTRAINT fk_pr FOREIGN KEY( praesens )          REFERENCES pessoas( id ) ON DELETE CASCADE,
  CONSTRAINT fk_fp FOREIGN KEY( futurumperfectum )  REFERENCES pessoas( id ) ON DELETE CASCADE,
  CONSTRAINT fk_f  FOREIGN KEY( futurum )           REFERENCES pessoas( id ) ON DELETE CASCADE
);

CREATE TABLE subjuntivos(

  id INTEGER PRIMARY KEY ,

  praesens INTEGER,
  imperfectum INTEGER,
  perfectum INTEGER,
  plusquamperfectum INTEGER,
 
  CONSTRAINT fk_pqp FOREIGN KEY( plusquamperfectum ) REFERENCES pessoas( id ) ON DELETE CASCADE,
  CONSTRAINT fk_im  FOREIGN KEY( imperfectum )       REFERENCES pessoas( id ) ON DELETE CASCADE,
  CONSTRAINT fk_p   FOREIGN KEY( perfectum )         REFERENCES pessoas( id ) ON DELETE CASCADE,
  CONSTRAINT fk_pr  FOREIGN KEY( praesens )          REFERENCES pessoas( id ) ON DELETE CASCADE
);

CREATE TABLE imperativos
(

  id INTEGER PRIMARY KEY ,

  praesens_sing TEXT,
  futurum_sing  TEXT,
  praesens_plur TEXT,
  futurum_plur  TEXT
);

-- NOMINAIS
-- NOTA perfectum participará dos ativos
CREATE TABLE participios
(
  id INTEGER PRIMARY KEY ,
  --ativo
  praesens  TEXT,
  futurum   TEXT,
  -- passívo 
  perfectum TEXT
);

CREATE TABLE supinos
(
  id INTEGER PRIMARY KEY ,

  unus TEXT,
  duo  TEXT
);

CREATE TABLE gerundios
(
  id INTEGER PRIMARY KEY ,

  acusativo TEXT,
  genitivo  TEXT,
  ablativo  TEXT
);

CREATE TABLE gerundivos
(
  id INTEGER PRIMARY KEY ,

  palavra TEXT  
);

-- VOZES
CREATE TABLE IF NOT EXISTS ativa
(
  id INTEGER PRIMARY KEY ,

  infinitivo INTEGER,
  indicativo INTEGER,
  subjuntivo INTEGER,
  imperativo INTEGER,

  participio INTEGER,
  gerundio   INTEGER,
  supino     INTEGER,

  CONSTRAINT fk_inf FOREIGN KEY( infinitivo ) REFERENCES infinitivos( id ) ON DELETE CASCADE,
  CONSTRAINT fk_ind FOREIGN KEY( indicativo ) REFERENCES indicativos( id ) ON DELETE CASCADE,
  CONSTRAINT fk_sub FOREIGN KEY( subjuntivo ) REFERENCES subjuntivos( id ) ON DELETE CASCADE,
  CONSTRAINT fk_imp FOREIGN KEY( imperativo ) REFERENCES imperativos( id ) ON DELETE CASCADE,
  CONSTRAINT fk_prt FOREIGN KEY( participio ) REFERENCES participios( id ) ON DELETE CASCADE,
  CONSTRAINT fk_ger FOREIGN KEY( gerundio   ) REFERENCES gerundios( id )   ON DELETE CASCADE,
  CONSTRAINT fk_sup FOREIGN KEY( supino )     REFERENCES supinos( id )     ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS passiva
(
  id INTEGER PRIMARY KEY ,

  infinitivo INTEGER,
  indicativo INTEGER,
  subjuntivo INTEGER,
  participio INTEGER,

  --participio INTEGER,  removido participium perfectum estará em ativo.
  gerundivo  INTEGER,

  CONSTRAINT fk_inf FOREIGN KEY( infinitivo )  REFERENCES infinitivos( id ) ON DELETE CASCADE,
  CONSTRAINT fk_ind FOREIGN KEY( indicativo )  REFERENCES indicativos( id ) ON DELETE CASCADE,
  CONSTRAINT fk_sub FOREIGN KEY( subjuntivo )  REFERENCES subjuntivos( id ) ON DELETE CASCADE,
  CONSTRAINT fk_prt FOREIGN KEY( participio )  REFERENCES participios( id ) ON DELETE CASCADE,
  CONSTRAINT fk_ger FOREIGN KEY( gerundivo   ) REFERENCES   gerundios( id ) ON DELETE CASCADE
);

-- O VERBO
CREATE TABLE IF NOT EXISTS verbos
(
  id INTEGER PRIMARY KEY ,

  infinitivo TEXT,
  caracteristica TEXT,
  conjugacao INTEGER,
  voz_ativa INTEGER, --deponência
  voz_passiva INTEGER,

  CONSTRAINT fk_ativa   FOREIGN KEY( voz_ativa )   REFERENCES ativa( id )   ON DELETE CASCADE,
  CONSTRAINT fk_passiva FOREIGN KEY( voz_passiva ) REFERENCES passiva( id ) ON DELETE CASCADE,
  CONSTRAINT cs_conjugacao CHECK (
    conjugacao = 1 OR
    conjugacao = 2 OR
    conjugacao = 3 OR
    conjugacao = 4
  ),
  CONSTRAINT cs_caracteristica CHECK (
    caracteristica = 'regular'   OR
    caracteristica = 'anomalo'   OR
    caracteristica = 'deponente' OR
    caracteristica = 'defectivo'
  )
);

--amāre i,s,i,s
INSERT INTO pessoas VALUES
( 0,'amō','amas','amat','amāmus','amātis','amant' ),
( 1,'amābam','amābas','amābat','amabamus','amabatis','amābant'),
( 2,'amābo','amābis','amābit','amabimus','amabitis','amābunt'),
( 3,'amavi','amavistī','amavit','amavimus','amavistis','amāvērunt'),
( 4,'amaveram','amaveras','amaverat','amaverāmus','amaverātis','amaverant'),
( 5,'amavero','amaveris','amaverit','amaverimus','amaveritis','amaverint'),

( 6,'amem','ames','amet','amēmus','amētis','ament' ),
( 7,'amārem','amāres','amāret','amarēmus','amarētis','amarent' ),
( 8,'amaverim','amaveris','amaverit','amaverimus','amaveritis','amaverint' ),
( 9,'amavissem','amavisses','amavisset','amavissēmus','amavissētis','amavissent' ),

(10,'amor','amāris','amātur','amāmur','amāminī','amantur'),
(11,'amābar','amābāris','amābātur','amābāmur','amābāminī','amābantur' ),
(12,'amābor','amāberis','amābitur','amābimur','amābiminī','amābuntur' ),
(13,'amātus sum','amātus es','amātus est','amātī sumus','amātī estis','amātī sunt' ),
(14,'amātus eram','amātus erās','amātus erat','amātī erāmus','amātī erātis','amātī erant' ),
(15,'amātus erō','amātus eris','amātus erit','amātī erimus','amātī eritis','amātī erunt' ),

(16,'amer','amēris','amētur','amēmur','amēminī','amentur'),
(17,'amārer','amārēris','amārētur','amarēmur','amarēminī','amarentur' ),
(18,'amātus sim','amātus sīs','amātus sit','amātī sīmus','amātī sītis','amātī sint' ),
(19,'amātus essem','amātus essēs','amātus esset','amātī essēmus','amātī essētis','amātī essent' )
;

INSERT INTO pessoas VALUES
( 20,'moneō','monēs','monet','monēmus','monētis','monent' ),
( 21,'monēbam','monēbas','monēbat','monēbamus','monēbatis','monēbant' ),
( 22,'monēbo','monēbis','monēbit','monēbimus','monēbitis','monēbunt' ),
( 23,'monuī','monuistī','monuit','monuimus','monuistis','monuērunt' ),
( 24,'monueram','monueras','monuerat','monueramus','monueratis','monuerant' ),
( 25,'monuerō','monueris','monuerit','monuerimus','monueritis','monuerint' ),

( 26,'moneam','moneās','moneat','moneamus','moneātis','moneant' ),
( 27,'monērem','monēres','monēret','monērēmus','monērētis','monērent' ),
( 28,'monuerim','monueris','monuerit','monuerimus','monueritis','monuerint' ),
( 29,'monuissem','monuissēs','monuisset','monuissēmus','monuissētis','monuissent' ),
      
( 30,'moneor','monēris','monētur','monēmur','monēminī','monentur' ),
( 31,'monēbar','monēbāris','monēbātur','monēbāmur','monēbāminī','monēbantur' ),
( 32,'monēbor','monēberis','monēbitur','monēbimur','monēbiminī','monēbuntur' ),
( 33,'monitus sum','monitus es','monitus est','monitī sumus','monitī estis','monitī sunt' ),
( 34,'monitus eram','monitus erās','monitus erat','monitī erāmus','monitī erātis','monitī erant' ),
( 35,'monitus erō','monitus eris','monitus erit','monitī erimus','monitī eritis','monitī erunt' ),

( 36,'monear','moneāris','moneātur','moneāmur','moneāminī','moneantur' ),
( 37,'monēreor','monērēris','monērētur','monērēmus','monērēminī','monērentur' ),
( 38,'monitus sim','monitus sīs','monitus sit','monitī sīmus','monitī sītis','monitī sint' ),
( 39,'monitus essem','monitus essēs','monitus esset','monitī essēmus','monitī essētis','monitī essent' )
;

INSERT INTO pessoas VALUES
( 40,'legō','legis','legit','legimus','legitis','legunt' ),
( 41,'lēgebam','lēgēbas','lēgebat','lēgēbamus','lēgēbatis','lēgebant' ),
( 42,'legam','legēs','leget','legēmus','legētis','legent' ),
( 43,'lēgī','lēgistī','lēgit','lēgimus','lēgistis','lēgērunt' ),
( 44,'lēgeram','lēgeras','lēgerat','lēgerāmus','lēgerātis','lēgerant' ),
( 45,'lēgerō','lēgeris','lēgerit','lēgerimus','lēgeritis','lēgerint' ),

( 46,'legam','legās','legat','legāmus','legātis','legant'),
( 47,'legerem','legerēs','legeret','legerēmus','legerētis','legerent' ),
( 48,'lēgerim','lēgeris','lēgerit','lēgerimus','lēgeritis','lēgerint' ),
( 49,'lēgissem','lēgissēs','lēgisset','lēgissēmus','lēgissētis','lēgissent' ),

( 50,'legor','legeris','legitur','legimur','legiminī','leguntur' ),
( 51,'legebar','legebāris','legebātur','legebāmur','legebāminī','legebantur' ),
( 52,'legar','legēris','legētur','legēmur','legēminī','legentur' ),
( 53,'lectus sum','lectus es','lectus est','lēctī sumus','lēctī estis','lēctī sunt' ),
( 54,'lectus eram','lectus erās','lectus erat','lēctī erāmus','lēctī erātis','lēctī erant' ),
( 55,'lectus erō','lectus eris','lectus erit','lēctī erimus','lēctī eritis','lēctī erunt' ),

( 56,'legar','legāris','legātur','legāmur','legāminī','legantur' ),
( 57,'legerer','legerēris','legerētur','legerēmur','legerēminī','legerentur'),
( 58,'lēctus sim','lēctus sīs','lēctus sit','lēctī sīmus','lēctī sītis','lēctī sint' ),
( 59,'lēctus essem','lēctus essēs','lēctus esset','lēctī essēmus','lēctī essētis','lēctī essent' )
;

INSERT INTO pessoas VALUES
( 60,'audiō','audīs','audit','audīimus','audītis','audiunt' ),
( 61,'audiebam','audiēbas','audiebat','audiēbamus','audiēbatis','audiebant' ),
( 62,'audiam','audiēs','audiet','audiēmus','audiētis','audient' ),
( 63,'audīvī','audīvistī','audīvit','audīvimus','audīvistis','audīvērunt' ),
( 64,'audīveram','audīveras','audīverat','audīverāmus','audīverātis','audīverant' ),
( 65,'audīverō','audīveris','audīverit','audīverimus','audīveritis','audīverint' ),

( 66,'audiam','audiās','audiat','audiāmus','audiātis','audiant'),
( 67,'audīrem','audīrēs','audīret','audīrēmus','audīrētis','audīrent' ),
( 68,'audīverim','audīveris','audīverit','audīverimus','audīveritis','audīverint' ),
( 69,'audīvissem','audīvissēs','audīvisset','audīvissēmus','audīvissētis','audīvissent' ),

( 70,'audior','audīris','audītur','audīmur','audīminī','audiuntur' ),
( 71,'audiebar','audiebāris','audiebātur','audiebāmur','audiebāminī','audiebantur' ),
( 72,'audiar','audiēris','audiētur','audiēmur','audiēminī','audientur' ),
( 73,'audītus sum','audītus es','audītus est','audītī sumus','audītī estis','audītī sunt' ),
( 74,'audītus eram','audītus erās','audītus erat','audītī erāmus','audītī erātis','audītī erant' ),
( 75,'audītus erō','audītus eris','audītus erit','audītī erimus','audītī eritis','audītī erunt' ),

( 76,'audiar','audiāris','audiātur','audiāmur','audiāminī','audiantur' ),
( 77,'audīrer','audīrēris','audīrētur','audīrēmur','audīrēminī','audīrēntur'),
( 78,'audītus sim','audītus sīs','audītus sit','audītī sīmus','audītī sītis','audītī sint' ),
( 79,'audītus essem','audītus essēs','audītus esset','audītī essēmus','audītī essētis','audītī essent' )
;


-- JUNTANDO TEMPOS NOS MODOS

--amare ativo
INSERT INTO indicativos VALUES
( 0, 0,1,2,3,4,5 );
INSERT INTO subjuntivos VALUES
( 0, 6,7,8,9 );
--passivo
INSERT INTO indicativos VALUES
( 1, 10,11,12,13,14,15 );
INSERT INTO subjuntivos VALUES
( 1, 16,17,18,19 );

--monuere ativo
INSERT INTO indicativos VALUES
( 2, 20,21,22,23,24,25 );
INSERT INTO subjuntivos VALUES
( 2, 26,27,28,29 );
--passivo
INSERT INTO indicativos VALUES
( 3, 30,31,32,33,34,35 );
INSERT INTO subjuntivos VALUES
( 3, 36,37,38,39 );

--legere ativo
INSERT INTO indicativos VALUES
( 4, 40,41,42,43,44,45 );
INSERT INTO subjuntivos VALUES
( 4, 46,47,48,49 );
--passivo
INSERT INTO indicativos VALUES
( 5, 50,51,52,53,54,55 );
INSERT INTO subjuntivos VALUES
( 5, 56,57,58,59 );

--audire ativo
INSERT INTO indicativos VALUES
( 6, 60,61,62,63,64,65 );
INSERT INTO subjuntivos VALUES
( 6, 66,67,68,69 );
--passivo
INSERT INTO indicativos VALUES
( 7, 70,71,72,73,74,75 );
INSERT INTO subjuntivos VALUES
( 7, 76,77,78,79 );


-- INSERÇÃO DE INFINITIVOS (ativos e passivos)

INSERT INTO infinitivos VALUES
( 0,'a','amāre','amāvisse','amātūrum esse' ),
( 1,'p','amārī','amātum esse','amātum īrī' ),

( 2,'a','monēre', 'monuisse', 'monitūrum esse' ),
( 3,'p','monērī','monitum esse','monitum īrī' ),

( 4,'a','legere', 'lēgisse', 'lēctūrum esse' ),
( 5,'p','legī','lēctum esse','lēctum īrī'),

( 6,'a','audīre','audīvisse','audītūrum esse'),
( 7,'p','audīrī','audītum esse','audītum īrī');



-- vários pre-inseridos
INSERT INTO imperativos VALUES
( 0, 'amā', 'amātō', 'amāte', 'amātōte' ),
( 1, 'monē','monētō','monēte','monētōte'),
( 2, 'lege','legitō','legite','legitōte' ),
( 3, 'audī','audītō','audīte','audītōte');

INSERT INTO participios VALUES
( 0, 'amāns','amātūrus','amātus' ),
( 1, 'monēns','monitūrus','monitus' ),
( 2, 'legēns','lēctūrus','lēctus' ),
( 3, 'audiēns','audītūrus','audītus' );

INSERT INTO supinos VALUES
( 0, 'amātum', 'amātū' ),
( 1, 'monitum', 'monitū' ),
( 2, 'lēctum', 'lēctū' ),
( 3, 'audītum', 'audītū' );

INSERT INTO gerundios VALUES
( 0, 'amandum','amandī','amandō'),
( 1, 'monendum','monendī','monendō'),
( 2, 'legendum','legendī','lengendō'),
( 3, 'audiendum','audiendī','audiendō');

INSERT INTO gerundivos VALUES
( 0, 'amandus' ),
( 1, 'monendus' ),
( 2, 'legendus' ),
( 3, 'audiendus');

-- (inf,ind,sub,imp,part,ger,sup)
INSERT INTO ativa VALUES
( 0 ,0,0,0,0,0,0,0 ),
( 1 ,2,2,2,1,1,1,1 ),
( 2 ,4,4,4,2,2,2,2 ),
( 3 ,6,6,6,3,3,3,4 )
;

-- ( inf,ind,sub,gerundivo )
INSERT INTO passiva VALUES
( 0 ,1,1,1,0,0 ),
( 1 ,3,3,3,1,1 ),
( 2 ,5,5,5,2,2 ),
( 3 ,7,7,7,3,3 )
;

-- (caracteristica,conjugacao,ativaFK,passivaFK)
INSERT INTO verbos VALUES
( 0, 'amāre','regular',1 ,0,0 ),
( 1, 'monēre','regular',2 ,1,1 ),
( 2, 'legere','regular',3 ,2,2 ),
( 3, 'audīre','regular',4 ,3,3 )
;

