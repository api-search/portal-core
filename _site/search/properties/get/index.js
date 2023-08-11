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
    
    var property = '';
    if(event.property){
      property = event.property;
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

    var sql = "SELECT count(*) as api_count FROM apis a INNER JOIN properties m ON a.baseURL = m.api_base_url WHERE m.type LIKE '%" + property + "%'";
    connection.query(sql, function (error, results1, fields) { 
     
      const api_count = 0;
    
      let sql2 = "SELECT a.name,a.description,a.image,a.baseURL,a.humanURL,a.openapi_url,a.tags,GROUP_CONCAT(CONCAT(p.type,'~', p.url)) as properties FROM apis a INNER JOIN properties m ON a.baseURL = m.api_base_url INNER JOIN properties p ON a.baseURL = p.api_base_url WHERE m.type LIKE '%" + property + "%' GROUP BY a.name LIMIT " + page + "," + limit;
      connection.query(sql2, function (error, results2, fields) {
        
        let total_pages = api_count/limit;
        if(total_pages<1){ total_pages = 1; }
        total_pages = Math.round(total_pages);
        
        let meta = {};
        meta.property = property;
        meta.limit = limit;
        meta.page = page;
        //meta.sql = sql2;
        meta.totalPages = total_pages;
        
        let links = {};
        links.self = '/search/apis/?property=' + property + '&page=' + page + '&limit=' + limit;
        if(page!=0){
          links.first = '/search/apis/?property=' + property + '&page=-0&limit=' + limit;
          links.prev = '/search/apis/?property=' + property + '&page=' + page-1 + '&limit=' + limit;
        }
        
        if(total_pages > 1){
          links.next = '/search/apis/?property=' + property + '&page=' + page+1 + '&limit=' + limit;
        }
        links.last = '/search/apis/?property=' + property + '&page=' + total_pages + '&limit=' + limit;
  
        let data = [];
        for (let i = 0; i < results2.length; i++) {
        
          let d = {};
          d.name = results2[i].name;
          d.description = results2[i].description;
          d.image = results2[i].image;
          d.baseURL = results2[i].baseURL;
          d.humanURL = results2[i].humanURL;
          d.tags = results2[i].tags.split(",");
          
          let blob = results2[i].properties;
          let properties = blob.split(",");
          
          let return_properties = [];
          for (let j = 0; j < properties.length; j++) {
            
            let p_array = properties[j].split("~");
            
            let p = {};
            p.type = p_array[0];
            p.url = p_array[1];
            return_properties.push(p);
            
          }
          
          d.properties = return_properties;
          data.push(d);
          
        }
  
        let response = {};
        response.meta = meta;
        response.data = data;
        response.links = links;
        
        callback( null, response );
        
      });
    });
});