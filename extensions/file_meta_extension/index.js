/* Get FileMetaData
 * Michael Coleman, Michael@F5.com
*/
var f5 = require('f5-nodejs');
var oneDriveAPI = require('onedrive-api');

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
    var application = getOptions['application'];
    
    if (application == "sharepoint") {
    spr.get(sphostsite +'_api/Web/GetFileByServerRelativeUrl('+ filename + ')/' + metafield)
      .then(function (response) {
        console.log('Response: ' + response.body);
      })
      .catch(function(err){
        console.log('Ohhh, something went wrong...');
      });
    } else if (appliation == "onedrive") {
        //Will require some additional coding to add OAuth for 
        //acquiring a token for OneDrive.
        //Initiate a GET https://login.live.com/oauth20_authorize.srf?client_id={client_id}&scope={scope}
        //&response_type=token&redirect_uri={redirect_uri}
        //Will respond with https://login.live.com/oauth20_authorize.srf#access_token=EwC...EB
        //&authentication_token=eyJ...3EM&token_type=bearer&expires_in=3600
        //&scope=onedrive.readwrite&user_id=3626...1d
        //Strip access_token to pass to NodeAPI
        oneDriveAPI.items.getMetadata({
            accessToken: accessToken,
            itemId: ItemID
        }).then((item) => {
        // console.log(item); 
        // returns body of https://dev.onedrive.com/items/update.htm#response 
        })
    }

});

ilx.listen();





