function iniciarNavegacao(quantidade){
	var tamanhoLi = document.querySelector('ul li').offsetWidth;
	console.log(tamanhoLi)
	var tamanhoMaximo = quantidade * tamanhoLi;
	var listaSugestao = document.querySelector('ul');
	listaSugestao.style.width = tamanhoMaximo+'px';
	tamanhoMaximo = (quantidade -3) * tamanhoLi;
	var size = 0;
	var voltar = document.querySelector('.voltar');
	var avancar = document.querySelector('.avancar');
	avancar.onclick = function(e){
		e.preventDefault();
		if(size*-1 <= tamanhoMaximo){
			if(!(size *-1 == tamanhoMaximo)){
				this.className = 'avancar';
				voltar.className = 'voltar';
				size -= tamanhoLi;
				listaSugestao.style.left = size+'px';
			}
			if(size*-1 == tamanhoMaximo){
				this.className += ' disabled';
			}

		}else {
		}

	}

	voltar.onclick = function(e){
		e.preventDefault();
		if(size*-1 >= 0){
			
			if(!(size *-1 == 0 )){
				size += tamanhoLi;
				listaSugestao.style.left = size+'px';
				this.className = 'voltar';
				avancar.className = 'avancar';
			}
			if(size *-1 == 0){
				this.className += ' disabled';
			}

		}
	}
}

