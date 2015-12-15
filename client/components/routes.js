(function(){
	'use strict';
	
	angular.module('routes', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('/', {
				url: '/',
				controller: 'MainController',
				templateUrl: 'components/main/main.html'
			})
			.state('instrumentos', {
				url: '/instrumentos',
				controller: 'InstrumentosController',
				templateUrl: 'components/instrumentos/instrumentos.html'
			})
			.state('guia', {
				url: '/guia',
				controller: 'GuiaController',
				templateUrl: 'components/guia/guia.html'
			})
			.state('mapa', {
				url: '/mapa',
				controller: 'MapaController',
				templateUrl: 'components/mapa/mapa.html'
			})
			.state('estrategias', {
				url: '/estrategias',
				controller: 'EstrategiasController',
				templateUrl: 'components/estrategias/estrategias.html'
			})
			.state('modelo', {
				url: '/modelo',
				controller: 'ModeloController',
				templateUrl: 'components/modelo/modelo.html'
			})
			.state('descargas', {
				url: '/descargas',
				templateUrl: 'components/descargas/descargas.html'
			});
	}]);

}());