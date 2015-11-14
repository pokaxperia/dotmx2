(function(){
	'use strict';

	angular.module('normativos.directive', [])
	.directive('cardNormativos', [function () {
		return {
			restrict: 'E',
			templateUrl: './components/instrumentos/card/card-normativos.html'
		};
	}]);

})();