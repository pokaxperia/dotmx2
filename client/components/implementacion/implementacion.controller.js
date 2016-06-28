(function(){
	'use strict';
	
	var ImplementacionController = function($scope, $timeout){
		$timeout = twttr.widgets.load(
			document.getElementById('share-implementaton')
		);
	}
	
	ImplementacionController.$inject = ['$scope', '$timeout'];
	
	angular.module('implementacion', [])
	.controller('ImplementacionController', ImplementacionController);
	
})();