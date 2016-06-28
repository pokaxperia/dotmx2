(function(){
	'use strict';
	
	var EstimacionesController = function($scope, $timeout){
		$timeout = twttr.widgets.load(
			document.getElementById('share-estimates')
		);
	}
	
	EstimacionesController.$inject = ['$scope', '$timeout'];
	
	angular.module('estimaciones', [])
	.controller('EstimacionesController', EstimacionesController);
	
})();