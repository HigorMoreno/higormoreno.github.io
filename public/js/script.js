var produto;

produto = document.querySelector('.produto').innerHTML;	

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
		document.querySelector('.preco-de span').innerText = reference.oldPrice;
	}
	else{
		document.querySelector('.preco-de').remove();
	}

	document.querySelector('.preco-por span').innerText = reference.price;

	document.querySelector('.condicoes').innerHTML = reference.productInfo.paymentConditions;

	var recomendacoes = json.data.recommendation;
	recomendacoes.forEach(montarSugestao);

	iniciarNavegacao(json.data.widget.size)

}

function montarSugestao(element, index, array){

	var sugestao = document.createElement('div');
	sugestao.className = 'produto';
	sugestao.innerHTML = produto;
	sugestao.querySelector('a').href = 'http:' + element.detailUrl;

	sugestao.querySelector('img').src = 'http:' + element.imageName;
	
	sugestao.querySelector('.titulo').innerText = element.name;

	if(element.oldPrice != null){
		sugestao.querySelector('.preco-de span').innerText = element.oldPrice;
	}
	else{
		sugestao.querySelector('.preco-de').remove();
	}

	sugestao.querySelector('.preco-por span').innerText = element.price;

	sugestao.querySelector('.condicoes').innerHTML = element.productInfo.paymentConditions;
	
	document.querySelector('ul').innerHTML += '<li>'+sugestao.outerHTML+'</li>';
	

}
