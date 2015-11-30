(function(){

	'use strict';

	angular.module('dotmx',[
		'routes',
		'estrategias',
		'guia',
		'guide.steps.directive',
		'guide.id.directive',
		'instrumentos',
		'normativos.directive',
		'economicos.directive',
		'card.directive',
		'main',
		'menu.directive',
		'mapa',
		'modal.controller',
		'modelo',
		'ui.bootstrap'
		]
	)
	.run([
		"$rootScope", "$state", "$stateParams", function($rootScope, $state, $stateParams) {
			$rootScope.$state = $state;
			return $rootScope.$stateParams = $stateParams;
		}
	]);
}());