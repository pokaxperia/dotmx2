(function(){
	'use strict';

	angular.module('economicos.directive', [])
	.directive('cardEconomicos', [function () {
		return {
			restrict: 'E',
			templateUrl: './components/instrumentos/card/card-economicos.html'
		};
	}]);

})();