#
# A "Hello World" template for iRulesLX RPC.
#
# Note: This example works in concert with the template in an
# extension's default index.js.
#
# To use, replace every item in <> with an appropriate value.
#
# when <EVENT> {
#    # Get a handle to the running extension instance to call into.
#    set RPC_HANDLE [ILX::init <PLUGIN_NAME> <EXTENSION_NAME>]
#    # Make the call and store the response in $rpc_response
#    set rpc_response [ILX::call $RPC_HANDLE <REMOTE_FUNC_NAME> <ARG> <ARG> ...  ]
# }
when HTTP_REQUEST {
set spreqOptions {}
 append spreqOptions "{"
 #Obviously you would want to set this to the full Site Collection
 #URL for your site
 append spreqOptions "\"host\": \"https://f5.sharepoint.com\","
 #This is the metafield that you want to retreive to validate
 append spreqOptions "\"metafield\": \"Name\","
 #Currently this is using GetFileByServerRelativeUrl(), can be changed to other 
 #SP Web Service Function.
 append spreqOptions "\"filename\":  \"/Shared%20Documents/Security%20in%20Office%20365%20Whitepaper.docx\","
 ##Determine if OneDrive or SharePoint option: onedrive / sharepoint
 append spreqOptions "\"application\": \"sharepoint\"" 
 #if querying OneDrive you submit ObjectID
 append spreqOptions "\"fileid\": \"8675309\""
 append spreqOptions "}"
 
set rpc_handle [ILX::init file_meta_extension]
set rpc_response [ILX::call $rpc_handle $spreqOptions]

# Add logic to decide what to do with the results of the request.
#parse the $rpc_response

if { [$rcp_response contains "classified"]} { 
 HTTP::respond 200 content "Step off"
} else {
 HTTP::respond 200 content $rpc_response
}

}



