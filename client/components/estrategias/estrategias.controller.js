(function(){
	'use strict';
	
	var EstrategiasController = function($timeout){
		$timeout = twttr.widgets.load(
			document.getElementById('share-strategies')
		);
	}
	
	EstrategiasController.$inject = ['$timeout'];
	
	angular.module('estrategias', [])
	.controller('EstrategiasController', EstrategiasController);
	
})();