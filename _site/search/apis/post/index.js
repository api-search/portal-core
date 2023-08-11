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

    if(event.url && event.url != ''){
      
      // Valid URL
      var httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
      
      if(httpRegex.test(event.url)){ 
      
        const date = new Date();
        var created = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
      
        // If valid then lets insert for processing
        var sql = "SELECT * FROM openapi WHERE url = " + connection.escape(event.url);
        connection.query(sql, function (error, results, fields) {   
          
          if(results && results.length == 0){
            
            var sql = "INSERT INTO openapi(url,created,modified) VALUES(" + connection.escape(event.url) + ",'" + created + "','" + created + "')";
            connection.query(sql, function (error, results, fields) {
        
              if(results.affectedRows && results.affectedRows > 0){
                var response = {};
                response['response'] = "Added for processing.";            
                callback( null, response );
              }
              else{
                var response = {};
                response['response'] = "Problem adding to queue..";            
                callback( null, response );            
              }
        
            });
          
          }
          else{
            var response = {};
            response['response'] = "Already in there..";            
            callback( null, response );              
          }
          
        });   

      }  
    else{
      
      var response = {};
      response['response'] = 'It was a bad URL.';
      callback( null, response );
      
      }
    }
    else{
      
      var response = {};
      response['response'] = 'No URL was provided.';
      callback( null, response );
      
    }
});