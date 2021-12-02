##Additional packages:
For server:
cors: enable connection between React and Nodejs
cheerio: easier to use for parsing than JSDOM. 
If using JSDOM parsing, {includeNodeLocations: true} should be set in new JSDOM 

For client:
antd: design system
axios: create HTTP requests

## Possible bugs in original project:
1, line 19 in index.ts
here should have a next()
2, Line 14 in event-service.ts
case "www.trackie.com" should be added incase an user type in www.
3, Line 11 in post.ts
keyword "await" should be added otherwise result will be set to a promise value
