var app = angular.module('myApp', []);
app.controller('myCtrl', ['$scope', function($scope,$http) {
	//Caso há workout salvo no localstorage, cria a tabela
	if(localStorage.workout && (localStorage.workout != '[]')){
		$scope.workout = JSON.parse(localStorage["workout"]);
		$scope.activity= JSON.parse(localStorage["activity"]);
		$scope.date = JSON.parse(localStorage["date"]);
		$scope.time = JSON.parse(localStorage["time"]);
	//se não, ativa a msg welcome
	}else{
		document.getElementById('Welcome').style.display='block'
		document.getElementById('tableItems').style.display='none'
	}

	//Função Angular que remove os itens
	$scope.delete = function(id) {
      	//atribui a varivavel com o localstorage
        workout = JSON.parse(localStorage["workout"]);
		time = JSON.parse(localStorage["time"]);
		activity = JSON.parse(localStorage["activity"]);
		date = JSON.parse(localStorage["date"]);

		//remove o item que recebe como parametro
		workout.splice(id,1)
		time.splice(id,1)
		activity.splice(id,1)
		date.splice(id,1)

		//salva novamente no localStorage
		localStorage["workout"] = JSON.stringify(workout);
		localStorage["time"] = JSON.stringify(time);
		localStorage["activity"] = JSON.stringify(activity);
		localStorage["date"] = JSON.stringify(date);

		//atualiza a pagina
		window.location.reload()
    };
}]);

//Variaveis
var workout = new Array();
var time = new Array();
var activity = new Array();
var date = new Array();

//Função que adiciona item no localstorage
function addItem(){
	//Verifica se tem dados armazenados no localstorage
	//se tiver, pega o id do ultimo e acrescenta o item novo
	if (localStorage.workout && (localStorage.workout != '[]')){
		
		//trago do localstorage para variavel
		workout = JSON.parse(localStorage["workout"]);
		time = JSON.parse(localStorage["time"]);
		activity = JSON.parse(localStorage["activity"]);
		date = JSON.parse(localStorage["date"]);

		//acrescento na variavel local o que foi adicionado
		var i = workout.length-1
		var id = workout[i]
		workout.push(id+1)
		time.push(document.getElementById('inputTime').value)
		activity.push(document.getElementById('inputActivity').value)
		
		//ALTERAR DATA PARA FORMATO DD/MM/YYYY
		var data = document.getElementById('inputDate').value
		var dataAr = data.split('-')		
		data = dataAr[2]+"/"+dataAr[1]+"/"+dataAr[0]
		date.push(data)

		//Salvo novamente a variavel no localstorage
		localStorage["workout"] = JSON.stringify(workout);
		localStorage["time"] = JSON.stringify(time);
		localStorage["activity"] = JSON.stringify(activity);
		localStorage["date"] = JSON.stringify(date);

	//caso não tenha, cria um novo com o ID 0
	}else{
		//crio o item com id 1, e pego o restante no formulario
		workout.push(1)
		time.push(document.getElementById('inputTime').value)
		activity.push(document.getElementById('inputActivity').value)
		
		//ALTERAR DATA PARA FORMATO DD/MM/YYYY
		var data = document.getElementById('inputDate').value
		var dataAr = data.split('-')		
		data = dataAr[2]+"/"+dataAr[1]+"/"+dataAr[0]
		date.push(data)

		//Salvo as variaveis no localstorage
		localStorage["workout"] = JSON.stringify(workout);
		localStorage["time"] = JSON.stringify(time);
		localStorage["activity"] = JSON.stringify(activity);
		localStorage["date"] = JSON.stringify(date);
	}
}

//Soma o tempo total
function countTime(){
	//Caso tenha itens adicionados
	if(localStorage.workout && (localStorage.workout != '[]')){
		document.getElementById('pResults').style.display='block'
		var time = JSON.parse(localStorage["time"])
		var totalHoras=0
		var totalMinutos=0
		//para cada item, é somado as horas, minutos.
		for(i=0; i<=time.length-1;i++){
			var hm = time[i].split(':')
			var hora = parseInt(hm[0])
			var minuto =parseInt(hm[1])
			totalMinutos = totalMinutos+minuto
			totalHoras = totalHoras+hora
		}
		if((totalMinutos / 60) >= 1){
			var hora = Math.floor(totalMinutos/60)
			totalHoras = totalHoras + hora
			totalMinutos = totalMinutos-(Math.floor(totalMinutos/60) * 60)
		}

		//caso seja 1 caractere, adiciono o 0 a equerda
		if((totalHoras.toString()).length == 1){
			totalHoras='0'+totalHoras
		} 
		if((totalMinutos.toString()).length == 1){
			totalMinutos='0'+totalMinutos
		}

		//adiciono no HTML
		document.getElementById('innerPont').innerHTML = totalHoras + ':' + totalMinutos
	}else{
		//caso não tenha nada, desativo o resultado
		document.getElementById('pResults').style.display='none'
	}
	
}