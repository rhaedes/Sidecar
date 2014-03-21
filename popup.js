document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', clickHandler);
});

function navigate(baseUrl, query) {
		if (query) baseUrl += "?";
		var newUrl = {};
		newUrl.url = baseUrl + query;
		chrome.tabs.update(newUrl);
}

function clickHandler(e) {
	chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
	function(tabs){  
		//Get current URL
		var currentUrl = tabs[0].url,
		queryParameters = {};
		divisor = currentUrl.indexOf("?");
		
		if (divisor == -1) {
			divisor = currentUrl.length;
		}
		
		var queryString = currentUrl.substr(divisor + 1),
		baseUrl =  currentUrl.substr(0, divisor ), 
		re = /([^&=]+)=([^&]*)/g, m;
 
		// Map the query
		while (m = re.exec(queryString)) {
			queryParameters[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
		}

		// Add or update parameters
		
		//Toggle language
		//queryParameters['sc_lang'] = (queryParameters['sc_lang'] == 'en') ? 'da' : 'en';
		
		//Toggle debug
		queryParameters['sc_debug'] = (queryParameters['sc_debug'] == '1') ? '0' : '1';
		
		//Navigate to new URL
		navigate(baseUrl, jQuery.param(queryParameters) );

   }
  );
;
}