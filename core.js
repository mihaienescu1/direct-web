/*
var wrService	=	function() {

	__requestMethod			 =	null;
	__requestData			 =	null;
	__xmlHttp				 =	null;
	__responseData			 =	null;
	__serverAddr				 =	null;
	__requestGlue			 =	null;
	__responseGlue			 =	null;
	
	__completeCallBack		 =	null;
	__errorCallBack			 =	null;
	__connOpenCallBack		 =	null;
	__requestReceivedCallBack =	null;
	__processingCallBack 	 =	null;
	
	___requestNonInitialized  =  null;
	___requestSetUp			 =  null;
	___requestSent			 =  null;
	___requestProcess	 	 =  null;
	___requestCompleted		 =  null;
	
	
	__Init	=	function() {
		if (window.XMLHttpRequest) {
			__xmlHttp = new XMLHttpRequest();
	    } else { 
			__xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		__requestGlue	=	'JSON';
		__responseGlue	=	'JSON';
		
		__requestMethod	=	'POST';
		__serverAddr		=	'wrController.php?reqGlue=';
		__serverAddr	   +=	__requestGlue;
		__serverAddr	   += 	'&resGlue=';
		__serverAddr	   +=	__responseGlue;
	}
	
	__setData	=	function(reqData) {
		if(reqData) {
			var str = [];
			for (var p in reqData) {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(reqData[p]));
			}
			__requestData = str.join("&");
		}
	}
	
	__setNonInitializedCallBack	=	function(c) {
		___requestNonInitialized	=	c;
	}
	
	__Run	=	function() {
	
		var finalURL	=	__serverAddr;
		var strPOST		=	'';
		
		if(__requestMethod	===	"POST") {
			strPOST	=	__requestData;
		} else {
			finalURL	+=	'&' + __requestData;
		}
		
	    var that = this;
		__xmlHttp.onreadystatechange = function() {
			
			var rspText		=	that.xmlHttp.responseText;
			var statusCode	=	that.xmlHttp.responseXML;
			var statusText	=	that.xmlHttp.statusText;
			
			if(200 == statusCode) {
				
				switch(that.xmlHttp.readyState) {
				
					case 1 :
						that.connOpenCallBack(rspText, statusCode, statusText);
					break;
					
					case 2 :
						that.requestReceivedCallBack(rspText, statusCode, statusText);
					break;
					
					case 3 :
						that.processingCallBack(rspText, statusCode, statusText);
					break;
					
					case 4 :
						that.completeCallBack(rspText, statusCode, statusText);
					break;
					
					default: 
					break;
				}
				
			}
			
		}
		
		__xmlHttp.open(__requestMethod, finalURL  ,true);
		__xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		__xmlHttp.send(strPOST);
		
	}
	
	---
	var call1 = wrs.newWsCall({
	method: 'post',
	url: 'www.google.ro',
	dataType: 'json',
	keep: true
});

call1.setOkFunction(function(){

})

call1.run();

newWsCall	: 	function(opsObj){
			__requestMethod = opsObj.method;
			//Restul de asignari
			
			//stack setup
			if(!opsObj.hasOwnProperty('keep')) { return; }
			if false === opsObj.keep {return; }
			var uniqueId = new Date.getTime();
			__callStack.push({
				id: uniqueId,
				okCallback: function(){}
			})
			
			return uniqueId;
		},
		
		getRequestDetails	: function(id){
			return __callStack[id];
		}
		
		
}*/

var wrs	=	(function(){

	var _cs 			= 	[];
	var _xhr			=	null;
	var _resGlue		=	'JSON';
	var _resMeth		=	'POST';
	var _srvAddr		=	'wrController.php';
	var _reqData		=	null;
	var	_requestURL		=	null;
	var _getData		=	null;
	var _postData		=	null;
	var _queryString	=	null;
	var _async			=	true;
	
	var _okCallBack		=	null;
	
	var _xmlHttpSend	=	function(u, p, m, a) {
	
			async	=	a || true;
			/*
			console.log(u);
			console.log(p);
			console.log(m);
			console.log(a);
			*/
			_xhr.onreadystatechange = function() {
				
				var rspText		=	_xhr.responseText;
				var statusCode	=	_xhr.status;
				var statusText	=	_xhr.statusText;

				if(200 == statusCode) {
					
					switch(_xhr.readyState) {
					
						case 1 :
							
						break;
						
						case 2 :
								
						break;
						
						case 3 :
								
						break;
							
						case 4 :
								_okCallBack(rspText, statusCode, statusText);
						break;
						
						default: 
						break;
					}
					
				} else {
					if (4 == _xhr.readyState)
					throw("[Request Processing Error]\n[statusCode : " + statusCode + "]\n[statusText : " + statusText + "]\n[state : " + _xhr.readyState + "]");
				}
				
			}
			
			_xhr.open(m, u, async);
			_xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			_xhr.send(p);
	}
	
	var facade	=	{
	
		Init	:	function() {
		
			if (window.XMLHttpRequest) {
				_xhr = new XMLHttpRequest();
			} else { 
				_xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			
		},
		
		setOkCallBack	:	function(c) {
		
			if("function" !== typeof c) {
				_okCallBack	=	function(a,b,c) {};
			} else {
				_okCallBack	=	c;
			}
			
		},
		
		setData	:	function(d) {
			var str = [];
			for (var p in d) {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(d[p]));
			}
			_reqData	=	 str.join("&");
		},
		
		setOptions	:	function(o) {
			if(o.method) {
				_resMeth	=	o.method.toUpperCase();
			}
			
			if(o.responseGlue) {
				_resGlue	=	o.responseGlue.toUpperCase();
			}
			
			if(o.serverAddress) {
				_srvAddr	=	o.serverAddres;
			}
			
			if("undefined" !== typeof o.async)
			{
				if(true === o.async || false === o.async) {
					_async	=	o.async;
				}	else {
					throw ("[Illegal argument (async)]\n[Available Options : true or false]\n[Current : '" + o.async + "']");
				}
			}
			
		},
		
		Run	:	function() {
			
			_requestURL		=	null;
			_getData		=	_reqData	+	'&_rsp='	+	_resGlue;
			_postData		=	_reqData	+	'&_rsp='	+	_resGlue;
			
			switch(_resMeth) {
				case 'GET' :
					_requestURL	 	=	_srvAddr	+	'?'	+	_getData;
					_postData		=	null;
				break;
				
				case 'POST' :
					_requestURL	 	=	_srvAddr;
					_getData		=	null;
				break;
				
				default:
					throw ("[Illegal argument (method)]\n[Available Options : 'POST' or 'GET']\n[Current : '" + _resMeth + "']");
				break;
			}
			
			if(_requestURL) {
				_xmlHttpSend( _requestURL, _postData, _resMeth, _async);
			}
			
		},
		
		callRegisteredMethod	:	function(m, d, cb) {
			
			var om		=	m.split(".");
			var object	=	om[0];
			var method	=	om[1];
			
			d._obj	=	object;
			d._met	=	method;
			
			this.Init();
			this.setOkCallBack(cb); 
			this.setData(d);
			this.Run();
		}
		

	}
	
	return facade;
		
}(window));

/*
wrs.Init();
wrs.setData({ A : 1, B : 2 });
wrs.setOptions({ method : 'POST', 
				 responseGlue : 'JSON',
				 serverAddress	:	'',
				 async : false
			});


wrs.Run();
*/



