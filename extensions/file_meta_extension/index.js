/* Get FileMetaData
 * Michael Coleman, Michael@F5.com
*/
var f5 = require('f5-nodejs');

var credentialOptions = {
    username: 'm.coleman@f5.com',
    password: ''
};

var spr = require('sp-request').create(credentialOptions);

var ilx = new f5.ILXServer();

ilx.addMethod('SPRequest', function(req,res) {

    var getOptions = JSON.parse(req.params()[0]);
    var sphostsite = getOptions["host"];
    var metafield = getOptions["metafield"];
    var filename = getOptions["filename"];
    
    spr.get(sphostsite +'_api/Web/GetFileByServerRelativeUrl('+ filename + ')/' + metafield)
      .then(function (response) {
        console.log('Response: ' + response.body);
      })
      .catch(function(err){
        console.log('Ohhh, something went wrong...');
      });

});

ilx.listen();




