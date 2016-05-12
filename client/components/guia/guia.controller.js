(function(){
	'use strict';
	
	var GuiaController = function($scope, $timeout){
		$timeout = twttr.widgets.load(
			document.getElementById('share-guide')
		);
		$scope.setGuide = function(gD){
			$scope.guide_information = './components/guia/informacion/'+gD+'.html';
		};
	}
	
	GuiaController.$inject = ['$scope', '$timeout'];
	
	angular.module('guia', [])
	.controller('GuiaController', GuiaController);
	
})();