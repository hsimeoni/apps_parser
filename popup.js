chrome.extension.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    //message.innerText = request.source;
   
      excludeList = ['4748854339','6802152230','217974574879787','2344061033','586254444758776','183217215062060','126231547426086','2305272732'];
	  
	  var $log = $( "#message" );
	  str = request.source;
	  html = $.parseHTML( str );
	  var nodeNames = [];
          var json_apps;

		$(html).find('li[id^=navItem_]').not('[data-reactid*="Nav"]').each(function (i){
			var app_id=$(this).attr("id").replace("navItem_", "");
			if (!excludeList.contains(app_id)){
                           		nodeNames.push("<li>" + $(this).text() + " (" + app_id + ")" + "</li>");
					//nodeNames[i]="<li>" + $(this).text() + " (" + app_id + ")" + "</li>";
                                        //json_apps = "'Applications':[{"+"'ID':"+app_id+"}, {"ID":"22222"}   ]
                                        //json_apps = "'Applications':[{'ID':'148494581941991'}, {'ID':'178222352279634'}]";
			}
			$log.html( "<h3>My Apps:</h3>" );
			$( "<ol></ol>" ).append(nodeNames).appendTo($log);
		});
                            //$.getJSON('criminalcase.json', function(appinspect){
                          // $.each(appinspect, function(key, val){
                            //   if (val.appid.search(new RegExp(app_id, "i")) != -1) {
		//var perms = [];
		//$.getJSON('criminalcase.json', function(appinspect){
		//	var appid = '402664389779077';
		//	$.each(appinspect, function(key, val){
		//		if(val.appid == appid)
		//			perms.push("<li>" + " (" + val.appid + ")" + val.perms + "</li>");
		//	});
		//	$("<h3>Perms:</h3>" ).appendTo($log);
		//	$( "<ol></ol>" ).append(perms).appendTo($log);
//
//		}).fail( function(appinspect, textStatus, error) {console.error("getJSON failed, status: " + textStatus + ", error: "+error)});
	}
        
        //var json_apps = new Object();
        //json_apps.ID = 148494581941991;
        //json_apps = "{'ID' = 148494581941991}"
        //jsonString = JSON.stringify(json_apps);
        json_apps = 148494581941991;
        var request = $.ajax({
            url         : 'http://fbapps.starfish.gr/ws.php',
            //type        : 'POST',
            //contentType : 'application/json',
            dataType    : 'text',
            data        : 'ID ='+json_apps,
            success: function(response){
                    alert(response);
                    //echo what the server sent back...
                }
        });
 
       //request.done(function(data) {
       //     alert("success");
       //     alert(JSON.stringify(data));
       // });
       // request.fail(function(jqXHR, textStatus, errorThrown){
       //     alert('FAILED! ERROR: ' + errorThrown);
       // });
        //request.done(function(response){
                //alert('success');                
        //       alert(response);
        //    });
        //    request.fail(function(jqXHR, textStatus, errorThrown){
        //        alert('FAILED! ERROR: ' + errorThrown);
        //    });
        
        
});



Array.prototype.contains = function(obj) {
   var i = this.length;
   while (i--) {
       if (this[i] === obj) {
           return true;
       }
   }
   return false;
}


function onWindowLoad() {

  var message = document.querySelector('#message');
	
  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.extension.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
    }
  });

}

window.onload = onWindowLoad;
