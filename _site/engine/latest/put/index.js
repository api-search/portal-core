const vandium = require('vandium');
const mysql  = require('mysql');
const https  = require('https');
const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true,strict: false}) // options can be passed, e.g. {allErrors: true}

exports.handler = vandium.generic()
  .handler( (event, context, callback) => {

    var connection = mysql.createConnection({
    host     : process.env.host,
    user     : process.env.user,
    password : process.env.password,
    database : process.env.database
    });
    
    var sql = "SELECT url FROM openapi WHERE pulled IS NULL LIMIT 1";
    connection.query(sql, function (error, results, fields) { 
      
      if(results && results.length > 0){
        
        // Pull any new ones.
        let url = results[0].url;
        
        https.get(url, res => {
          
          let data = [];
          const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
          
          console.log('Status Code:', res.statusCode);
          console.log('Date in Response header:', headerDate);
        
          res.on('data', chunk => {
            data.push(chunk);
          });
        
          res.on('end', () => {
            
            console.log('Response ended: ');
            
            const apisjson = JSON.parse(Buffer.concat(data).toString());
            
            // validate
            let schema = {"title":"A JSON Schema for apis.json, version 0.14","type":"object","additionalProperties":false,"patternProperties":{"^X-":{"type":"object"}},"definitions":{"maintainers":{"description":"The person or organization responsible for maintaining the API","required":["name"],"properties":{"name":{"type":"string","description":"name","minLength":5}},"additionalProperties":{"type":"string"}},"apis":{"description":"The description of the API","oneOf":[{"required":["name","description","image","baseURL","humanURL","properties","contact"],"properties":{"name":{"type":"string","description":"name","minLength":2},"description":{"type":"string","description":"description of the API","minLength":5},"image":{"type":"string","description":"URL of an image representing the API"},"baseURL":{"type":"string","pattern":"^(http)|(https)://(.*)$","description":"baseURL"},"humanURL":{"type":"string","pattern":"^(http)|(https)://(.*)$","description":"humanURL"},"tags":{"type":"array","items":{"type":"string","minLength":1},"description":"tags to describe the API"},"properties":{"type":"array","items":{"$ref":"#/definitions/urls"},"description":"URLs"},"contact":{"type":"array","items":{"$ref":"#/definitions/contact"},"description":"Contact to reach if questions about API"},"meta":{"type":"array","items":{"$ref":"#/definitions/metaInformation"}}}}]},"metaInformation":{"description":"Metadata about the API","required":["key","value"],"properties":{"key":{"type":"string"},"value":{"type":"string"}}},"contact":{"description":"Information on contacting the API support","required":["FN"],"additionalProperties":true,"patternProperties":{"^X-":{"type":"string"}},"properties":{"FN":{"type":"string","minLength":1},"email":{"type":"string"},"organizationName":{"type":"string"},"adr":{"type":"string"},"tel":{"type":"string"},"X-twitter":{"type":"string"},"X-github":{"type":"string"},"photo":{"type":"string","pattern":"^(http)|(https)://(.*)$"},"vCard":{"type":"string","pattern":"^(http)|(https)://(.*)$"},"url":{"type":"string","pattern":"^(http)|(https)://(.*)$"}}},"urls":{"description":"A representation of a URL","required":["type","url"],"properties":{"type":{"type":"string","pattern":"^(Swagger)$|^(RAML)$|^(Blueprint)$|^(WADL)$|^(WSDL)$|^(TermsOfService)$|^(InterfaceLicense)$|^(StatusPage)$|^(Pricing)$|^(Forums)$|^(AlertsTwitterHandle)$|^(X-[A-Za-z0-9\\-]*)$"},"url":{"type":"string","pattern":"^(http)|(https)://(.*)$"}}},"tags":{"description":"A consistent set of tag to apply to a description"},"include":{"description":"Include other APIs.json file","required":["name","url"],"properties":{"name":{"type":"string","minLength":1},"url":{"type":"string","pattern":"^(http)|(https)://(.*)$"}}}},"required":["name","description","url","apis","maintainers","tags"],"properties":{"name":{"type":"string","description":"The name of the service described","minLength":5},"description":{"type":"string","description":"Description of the service","minLength":5},"url":{"type":"string","description":"URL where the apis.json file will live","pattern":"^(http)|(https)://(.*)$"},"image":{"type":"string","description":"Image to represent the API"},"created":{"type":"string","description":"Date when the file was created"},"modified":{"type":"string","description":"Date when the file was modified"},"specificationVersion":{"type":"string","description":"APIs.json spec version, latest is 0.14"},"apis":{"type":"array","items":{"$ref":"#/definitions/apis"},"description":"All the APIs of this service"},"maintainers":{"type":"array","items":{"$ref":"#/definitions/contact"},"description":"Maintainers of the apis.json file"},"tags":{"type":"array","items":{"$ref":"#/definitions/tags"},"description":"Tags to describe the service"},"include":{"type":"array","items":{"$ref":"#/definitions/include"},"description":"Links to other apis.json definitions included in this service"}}};
            
            let openapi_url = url;
            
            const date = new Date();
            var created = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();             
          
            let validate = ajv.compile(schema)
            
            const valid = validate(apisjson)
            if (!valid){
              var sql = "UPDATE openapi SET pulled='" + created + "', valid = 0 WHERE url = " + connection.escape(openapi_url);
              connection.query(sql, function (error, results, fields) {               
              callback( null, "Not valid APIs.json." );
              });
            } 
            else{
              
              // Let's Process
              // What do we do with invalid??
              let openapi_name = apisjson.name;
              let openapi_description = apisjson.description;
              let openapi_image = apisjson.image;
                    
              var sql = "UPDATE openapi SET valid=1, name = " + connection.escape(openapi_name) + ",description = " + connection.escape(openapi_description) + ",image = " + connection.escape(openapi_image) + ",pulled='" + created + "' WHERE url = " + connection.escape(openapi_url);
              connection.query(sql, function (error, results, fields) {  
                
                let insert_apis = '';
                let insert_properties = '';
                let insert_maintainers = '';
                
                let api_base_urls = '';
                
                for (let i = 0; i < apisjson.apis.length; i++) {
                  
                  insert_properties = '';
                  insert_maintainers = '';                  
                    
                  let api_name = apisjson.apis[i].name;
                  api_name = api_name.replace("'","");
                  
                  // apis
                  insert_apis += "('" + openapi_url + "'," + connection.escape(api_name) + "," +  connection.escape(apisjson.apis[i].description) + "," +  connection.escape(apisjson.apis[i].image) + "," +  connection.escape(apisjson.apis[i].baseURL) + "," +  connection.escape(apisjson.apis[i].humanURL) + "," + connection.escape(apisjson.apis[i].tags.join(',')) + "),";
                  
                  // properties
                  for (let j = 0; j < apisjson.apis[i].properties.length; j++) {
                    insert_properties += "(" + connection.escape(apisjson.apis[i].baseURL) + "," + connection.escape( apisjson.apis[i].properties[j].type) + "," + connection.escape(apisjson.apis[i].properties[j].url) + "),";
                    api_base_urls += connection.escape(apisjson.apis[i].baseURL) + ",";
                  }
                  
                  // maintainers
                  let j = 0;
                    
                  insert_maintainers += "(" + connection.escape(openapi_url) + ",";
                  
                  // FN
                  if(apisjson.maintainers[j].FN){
                    insert_maintainers += connection.escape(apisjson.maintainers[j].FN) + ",";
                  }
                  else{
                    insert_maintainers += "'',";
                  }
                  
                  // organizationName
                  if(apisjson.maintainers[j].organizationName){
                    insert_maintainers += connection.escape(apisjson.maintainers[j].organizationName) + ",";
                  }
                  else{
                    insert_maintainers += "'',";
                  }
                  
                  // photo
                  if(apisjson.maintainers[j].photo){
                    insert_maintainers += connection.escape(apisjson.maintainers[j].photo) + ",";
                  }
                  else{
                    insert_maintainers += "'',";
                  } 
                  
                  // url
                  if(apisjson.maintainers[j].url){
                    insert_maintainers += connection.escape(apisjson.maintainers[j].url) + "),";
                  }
                  else{
                    insert_maintainers += "''),";
                  }                       
                  
                }
                
                // Trimit
                insert_apis = insert_apis.substring(0, insert_apis.length - 1);
                insert_properties = insert_properties.substring(0, insert_properties.length - 1);
                insert_maintainers = insert_maintainers.substring(0, insert_maintainers.length - 1);
                api_base_urls = api_base_urls.substring(0, api_base_urls.length - 1);
                
                var sql1 = "DELETE FROM apis WHERE openapi_url = '" + openapi_url + "'";
                connection.query(sql1, function (error1, results1, fields) { 
                  
                  var sql2 = "INSERT INTO apis(openapi_url,name,description,image,baseURL,humanURL,tags) VALUES" + insert_apis;
                  connection.query(sql2, function (error2, results2, fields) {                   
                  
                    var sql3 = "DELETE FROM properties WHERE api_base_url IN(" + api_base_urls + ")";
                    connection.query(sql3, function (error3, results3, fields) { 
                      
                      var sql4 = "INSERT INTO properties(api_base_url,type,url) VALUES" + insert_properties;
                      connection.query(sql4, function (error4, results4, fields) { 
                    
                        var sql5 = "DELETE FROM maintainers WHERE openapi_url = '" + openapi_url + "'";
                        connection.query(sql5, function (error5, results5, fields) { 
                  
                          var sql6 = "INSERT INTO maintainers(openapi_url,FN,name,photo,url) VALUES" + insert_maintainers;
                          connection.query(sql6, function (error6, results6, fields) { 
                            
                            let outcome = {};
                            outcome.message = "processed";
                            
                            outcome.sql1 = sql1;
                            if(results1){
                              outcome.results1 = results1;
                            }
                            else{
                              outcome.results1 = error1;
                            }
                            
                            outcome.sql2 = sql2;
                            if(results2){
                              outcome.results2 = results2;
                            }
                            else{
                              outcome.results2 = error2;
                            }
                            
                            outcome.sql3 = sql3;
                            if(results3){
                              outcome.results3 = results3;
                            }
                            else{
                              outcome.results3 = error3;
                            }  
                            
                            outcome.sql4 = sql4;
                            if(results4){
                              outcome.results4 = results4;
                            }
                            else{
                              outcome.results4 = error4;
                            }
                            
                            outcome.sql5 = sql5;
                            if(results5){
                              outcome.results5 = results5;
                            }
                            else{
                              outcome.results5 = error5;
                            }
                            
                            outcome.sql6 = sql6;
                            if(results6){
                              outcome.results6 = results6;
                            }
                            else{
                              outcome.results6 = error6;
                            }                             
                            
                            callback( null, outcome );               
                        
                          });   
                          
                        });   
                        
                      });   
                      
                    });           
                    
                  });           
                  
                }); 
                
              });              
              
            }
            
          });
        }).on('error', err => {
          callback( null, err )
        });
        

      }
      else{
        
        // Pull one that is old
        var response = {};
        response['pulling'] = "old ones";            
        callback( null, response );          
        
      }
      
    });  
  
});