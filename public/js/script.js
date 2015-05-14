var produto;

produto = document.querySelector('.produto').innerHTML;	
function GetXmlHttpObject() {
	var xmlHttp = null;
	try {
        // Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
    } catch (e) {
        // Internet Explorer
        try {
        	xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
        	xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xmlHttp;
}

var xmlhttp = GetXmlHttpObject();
xmlhttp.onreadystatechange=function()
{
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
	{
		carregar(xmlhttp.responseText);
	}
}
xmlhttp.open("GET","http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X",true);
xmlhttp.send();



function carregar(entrada){

	var json = JSON.parse(tratar(entrada));
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

function tratar(entrada){
	return entrada.replace('X(','').replace(');','');
}