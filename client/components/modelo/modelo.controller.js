(function(){
	'use strict';
	
	var ModeloController = function($scope, $timeout){
		$timeout = twttr.widgets.load(
			document.getElementById('share-model')
		);
	}
	
	ModeloController.$inject = ['$scope', '$timeout'];
	
	angular.module('modelo', [])
	.controller('ModeloController', ModeloController);
	
})();