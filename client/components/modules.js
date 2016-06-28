(function(){

	'use strict';

	angular.module('dotmx',[
		'routes',
		'estrategias',
		'implementacion',
		'calculadora',
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
		'estimaciones',
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