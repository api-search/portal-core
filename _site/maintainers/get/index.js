const vandium = require('vandium');
const mysql  = require('mysql');

exports.handler = vandium.generic()
  .handler( (event, context, callback) => {

    var connection = mysql.createConnection({
    host     : process.env.host,
    user     : process.env.user,
    password : process.env.password,
    database : process.env.database
    });
    
    var search = 0;
    if(event.search){
      search = event.search;
    }    
    
    var tags = 0;
    if(event.tags){
      tags = event.tags;
    }   

    var page = 0;
    if(event.page){
      page = event.page;
    }
    
    var limit = 50;
    if(event.limit){
      limit = event.limit;
    }   
    if(limit > 1000){
      limit = 1000;
    }

    var sql = "SELECT * FROM apis b WHERE ID IS NOT NULL";
    if(search != ''){
       sql += " AND b.name LIKE '%" + search + "%'";
    }

    if(tags != ''){
      
       var tag_array = tags.split(',');
       for (let i = 0; i < tag_array.length; i++) {
         sql += " AND id IN(SELECT api_id FROM apis_tags WHERE tag_id IN(SELECT id FROM tags WHERE name = '" + tag_array[i] + "'))";
        if(i<tag_array.length-1){
          sql += ' AND';
        }      
       }
    }  
    
    sql += " ORDER BY id";
    sql += " LIMIT " + page + "," + limit;
    connection.query(sql, function (error, results, fields) {

    callback( null, results );

  });
});