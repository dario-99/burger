//include extension
//express: extension for HTTP request
const express = require('express');
//mysql: extension used to communicate with a mysql DB server
const mysql = require('mysql');
const init = require('./init');
//PORT: web app port, default 5000
const PORT = process.env.PORT || 5000;
const app = express();
app.listen(PORT);

//Connect to the DB
const con = init.con;
const db = mysql.createConnection(con);

var pietanze = {menu : []};
db.connect((err)=>{
    if(err){
        throw err;
    }
    //connected correctly to the DB
    console.log('connected as id ' + db.threadId);
});

//to handle JSON HTTP body
app.use(express.json());


const query = (sql) => new Promise((resolve, reject) => {
    db.query(sql, (error, result, fields) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });
});

async function getMenu(){
    var sql = `SELECT * FROM Pietanza`;
    var res = await query(sql);
    for(var i in res){
        var temp = res[i];
        //retrieving indicatori (spicy, vegan for example)
        sql = `SELECT indicatore FROM pietanza_indicatore WHERE pietanza = '${temp.nome}'`;
        var resInd = await query(sql); 
        temp.indicatori = new Array();
        for(var j in resInd){
            temp.indicatori.push(resInd[j].indicatore);
        }
        pietanze.menu.push(temp);
    }
}


//request form DB the menu with a query and sends a JSON of the menu
//TODO: using await blocks the NODE.js thread, maybe in the future we can use a different method
//using timeouts for example and caching the result
app.get('/api/getMenu', async (req,res) =>{
    pietanze.menu = new Array();
    await getMenu();
    res.json(pietanze);
});

//request to insert a plate into the DB
//TODO: INSERT AN ACCESS CONTROL
//TODO: INSERT a json validation with YUP
//TODO: input escape string for sql injection prevention


app.post('/api/insertPietanza', async (req,res)=>{
    var newPietanza = {
        nome : req.body.nome,
        prezzo : req.body.prezzo,
        descrizione : req.body.descrizione,
        indicatori : req.body.indicatori,
        tipo : req.body.tipo
    };
    //CHECK IF IS VALID
    //TODO YUP VALIDATION
    //TODO input escape string for sql injection prevention
    if(!req.body.nome || !req.body.prezzo || !req.body.tipo){
        res.json({err:"INVALID JSON INSERT ALL FIELDS"});
    }
    else{
        //insert into the DB
        var sql = `INSERT INTO PIETANZA values('${newPietanza.nome}', ${newPietanza.prezzo}, '${newPietanza.descrizione}', '${newPietanza.tipo}');`;
        await query(sql);
        //no error inserting the INDICATORS and in the relation table
        for(var ind in newPietanza.indicatori){
            sql = `INSERT INTO indPietanza values ('${newPietanza.indicatori[ind]}')`;
            try{
                await query(sql);  
            }
            catch(err){
                if(err.errno != 1062)
                    throw err;
            }          
            //inserting the value in the pietanza_indicatore table
            sql = `INSERT INTO pietanza_indicatore values('${newPietanza.nome}', '${newPietanza.indicatori[ind]}')`;
            await query(sql);
        }
        res.json(newPietanza);
    }
});