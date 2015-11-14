(function(){
	'use strict';
	
	var InstrumentosController = function($timeout, $log, $scope){
		$scope.setData = function(iD){
			$scope.template = './components/instrumentos/informacion/'+iD+'.html';
		};
	}
	
	InstrumentosController.$inject = ['$timeout', '$log','$scope'];
	
	angular.module('instrumentos', [])
	.controller('InstrumentosController', InstrumentosController);
	
})();