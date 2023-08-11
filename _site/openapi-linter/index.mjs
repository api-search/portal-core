import spectralCore from "@stoplight/spectral-core";
const { Spectral, Document } = spectralCore;
import Parsers from "@stoplight/spectral-parsers";
import { truthy } from "@stoplight/spectral-functions"; 

// import entire SDK
import AWS from 'aws-sdk';

export function handler(event, context, callback) {

  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    region: 'us-east-1'
  });  


  // Pull the ruleset for APIs.json
  var params = {Bucket: 'kinlane-productions2', Key: 'apis-io/api/apis-json/https-www-plivo-com-apis-json/31/openapi.json'};

  s3.getObject(params, function(err, data) {

    if(err){ 

      callback(err);

    }
    else{

      var apisjson = JSON.parse(data.Body.toString('utf-8'));

      var rules = {
        
        rules: {
          
          "apis-json-v14-name": {
            description: "Name of APIs.json",
            given: "$",
            message: "Providing a name of your index of APIs helps ensure it will be discoverable.",
            severity: "error",
            then: {
              field: "name",
              function: truthy,
            },
          },
          "apis-json-v14-description": {
            description: "Description of APIs.json",
            given: "$",
            message: "A robust and informative description of your colleciton of APIs makes a lot sense.",
            severity: "error",
            then: {
              field: "description",
              function: truthy,
            },
          },    
          "apis-json-v14-description-empty": {
            description: "Empty Description of APIs.json",
            given: "$.description",
            message: "A robust and informative description of your colleciton of APIs makes a lot sense.",
            severity: "error",
            then: {
              function: truthy,
            },
          },                  
          "apis-json-v14-image": {
            description: "Image of APIs.json",
            given: "$",
            message: "It makes your API more presentable to have a logo or image representation.",
            severity: "error",
            then: {
              field: "image",
              function: truthy,
            },
          },    
          "apis-json-v14-image-empty": {
            description: "Empty Image of APIs.json",
            given: "$.image",
            message: "It makes your API more presentable to have a logo or image representation.",
            severity: "error",
            then: {
              function: truthy,
            },
          },   
          "apis-json-v14-image-url": {
            description: "Empty Image of APIs.json",
            given: "$.image",
            message: "It makes your API more presentable to have a logo or image representation.",
            severity: "error",
            then: {
              function: "pattern",
              functionOptions: {
                notMatch: "^((http|https)://)[-a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)$"
              },
            },
          },                    
          "apis-json-v14-tags": {
            description: "Tags for APIs.json",
            given: "$",
            message: "Using the tags property for your APIs.json helps add more metadata and make your APIs discoverable.",
            severity: "error",
            then: {
              field: "tags",
              function: truthy,
            },
          },
          "apis-json-v14-tags-one": {
            description: "One Tag for APIs.json",
            given: "$",
            message: "Having at least one tag for your APIs.json helps ensure that it will be more discoverable.",
            severity: "error",
            then: {
              function: "pattern",
              functionOptions: {
                min: 1
              },
            },
          }, 
                              
        },
        
      };

      const spectral = new Spectral();
      spectral.setRuleset(rules);

      //var results = spectral.run(apisjson);

      var response = {};
      response.rules = rules;
      response.apisjson = apisjson;
      response.results = results;
       
      spectral.run(apisjson).then(callback(null,));

    }

  });      

};