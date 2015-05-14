var produto;

produto = document.querySelector('.produto').innerHTML;	
// function GetXmlHttpObject() {
// 	var xmlHttp = null;
// 	try {
//         // Firefox, Opera 8.0+, Safari
//         xmlHttp = new XMLHttpRequest();
//     } catch (e) {
//         // Internet Explorer
//         try {
//         	xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
//         } catch (e) {
//         	xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
//         }
//     }
//     return xmlHttp;
// }

// var xmlhttp = GetXmlHttpObject();
// xmlhttp.onreadystatechange=function()
// {
// 	if (xmlhttp.readyState==4 && xmlhttp.status==200)
// 	{
// 		carregar(xmlhttp.responseText);
// 	}
// }
// xmlhttp.open("GET","http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X",true);
// xmlhttp.send();


// function createCORSRequest(method, url) {
// 	var xhr = new XMLHttpRequest();
// 	xhr.withCredentials = true;
// 	if ("withCredentials" in xhr) {

//     // Check if the XMLHttpRequest object has a "withCredentials" property.
//     // "withCredentials" only exists on XMLHTTPRequest2 objects.
//     xhr.open(method, url, true);

// } else if (typeof XDomainRequest != "undefined") {

//     // Otherwise, check if XDomainRequest.
//     // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
//     xhr = new XDomainRequest();
//     xhr.open(method, url);

// } else {

//     // Otherwise, CORS is not supported by the browser.
//     xhr = null;

// }
// return xhr;
// }

// var xhr = createCORSRequest('GET', "http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X");
// console.log(xhr);
// if (!xhr) {
// 	throw new Error('CORS not supported');
// }

// xhr.send();

// xhr.onload = function() {
//  var responseText = xhr.responseText;
//  console.log(responseText);
//  // process the response.
// };

// xhr.onerror = function() {
//   console.log('There was an error!');
// };

var $jsonp = (function(){
  var that = {};

  that.send = function(src, options) {
    var callback_name = options.callbackName || 'callback',
      on_success = options.onSuccess || function(){},
      on_timeout = options.onTimeout || function(){},
      timeout = options.timeout || 10; // sec

    var timeout_trigger = window.setTimeout(function(){
      window[callback_name] = function(){};
      on_timeout();
    }, timeout * 1000);

    window[callback_name] = function(data){
      window.clearTimeout(timeout_trigger);
      on_success(data);
    }

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = src;

    document.getElementsByTagName('head')[0].appendChild(script);
  }

  return that;
})();

$jsonp.send('http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X"', {
    callbackName: 'X',
    onSuccess: function(json){
        carregar(json);
    },
    onTimeout: function(){
        console.log('timeout!');
    },
    timeout: 5
});


function carregar(json){
	var reference = json.data.reference.item;

	document.querySelector('.produto a').href = 'http:' + reference.detailUrl;

	document.querySelector('.visitado img').src = 'http:' + reference.imageName;
	
	document.querySelector('.titulo').innerText = reference.name;

	if(reference.oldPrice != null){
		document.querySelector('.preco-de .valor').innerText = reference.oldPrice;
	}
	else{
		document.querySelector('.preco-de').remove();
	}

	document.querySelector('.preco-por').innerText = reference.price;

	document.querySelector('.condicoes').innerHTML = reference.productInfo.paymentConditions;

	var recomendacoes = json.data.recommendation;
	recomendacoes.forEach(montarSugestao)

}
var sugestoes;
function montarSugestao(element, index, array){
	console.log(element);

	var sugestao = document.createElement('div');
	sugestao.className = 'produto';
	sugestao.innerHTML = produto;
	
	sugestao.querySelector('a').href = 'http:' + element.detailUrl;

	sugestao.querySelector('img').src = 'http:' + element.imageName;
	
	sugestao.querySelector('.titulo').innerText = element.name;

	if(element.oldPrice != null){
		sugestao.querySelector('.preco-de .valor').innerText = element.oldPrice;
	}
	else{
		sugestao.querySelector('.preco-de').remove();
	}

	sugestao.querySelector('.preco-por').innerText = element.price;

	sugestao.querySelector('.condicoes').innerHTML = element.productInfo.paymentConditions;
	console.log(sugestao);
	
	document.querySelector('ul').innerHTML += '<li>'+sugestao.innerHTML+'</li>';
	

}
