(function(){
	'use strict';
	
	var CalculadoraController = function($scope, $timeout){
		$timeout = twttr.widgets.load(
			document.getElementById('share-calculator')
		);
	}
	
	CalculadoraController.$inject = ['$scope', '$timeout'];
	
	angular.module('calculadora', [])
	.controller('CalculadoraController', CalculadoraController);
	
})();