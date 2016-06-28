(function(){
	'use strict';
	
	angular.module('routes', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('main', {
				url: '/',
				controller: 'MainController',
				templateUrl: './components/main/main.html'
			})
			.state('instrumentos', {
				url: '/instrumentos',
				controller: 'InstrumentosController',
				templateUrl: './components/instrumentos/instrumentos.html'
			})
			.state('guia', {
				url: '/guia',
				controller: 'GuiaController',
				templateUrl: './components/guia/guia.html'
			})
			.state('mapa', {
				url: '/mapa',
				controller: 'MapaController',
				templateUrl: './components/mapa/mapa.html'
			})
			.state('estrategias', {
				url: '/estrategias',
				controller: 'EstrategiasController',
				templateUrl: './components/estrategias/estrategias.html'
			})
			.state('implementacion', {
				url: '/implementacion',
				controller: 'ImplementacionController',
				templateUrl: './components/implementacion/implementacion.html'
			})
			.state('calculadora', {
				url: '/calculadora',
				controller: 'CalculadoraController',
				templateUrl: './components/calculadora/calculadora.html'
			})
			.state('estimaciones', {
				url: '/estimaciones',
				controller: 'EstimacionesController',
				templateUrl: './components/estimaciones/estimaciones.html'
			})
			.state('descargas', {
				url: '/descargas',
				templateUrl: './components/descargas/descargas.html'
			});
	}]);

}());