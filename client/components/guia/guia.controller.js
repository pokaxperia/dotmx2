(function(){
	'use strict';
	
	var GuiaController = function($scope){
		$scope.setGuide = function(gD){
			$scope.guide_information = './components/guia/informacion/'+gD+'.html';
		};
	}
	
	GuiaController.$inject = ['$scope'];
	
	angular.module('guia', [])
	.controller('GuiaController', GuiaController);
	
})();