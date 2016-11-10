var spAuth = require('spo-auth');
var gulp = require('gulp');
var spsync = require('gulp-spsync-creds').sync;
var sppull = require("sppull").sppull;
 
var context = {/*...*/};
var options = {/*...*/};


var config = {
	host : ""
	login : ""
	password : ""
};

spAuth.get AccessToken(config, function(err, data) {
	console.log(data);
);

spAuth.getFedCookies(config, function(err,data) {
	console.log(data);
);

spAuth.getRequestDigest(config, function (err, data) {
    console.log(data);
    
    var requestOptions = {            
        host: data.host,
        path: '/_api/web',
        headers: {
            'Accept': 'application/json;odata=verbose',
            'Content-type': 'application/json;odata=verbose',
            'Cookie': 'FedAuth=' + data.FedAuth + '; rtFa=' + data.rtFa,
            'X-RequestDigest': data.digest
        }
    };
    
    var req = https.request(requestOptions, function (res) {
        var resp = '';

        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            resp += chunk;
        });

        res.on('error', function (err) {
            console.log(err);
        })

        res.on('end', function () {
            console.log(JSON.parse(resp));
        });
    })

    req.end('');
});
