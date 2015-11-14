(function(){
	'use strict';

	angular.module('guide.steps.directive', [])
	.directive('cardSteps', [function () {
		return {
			restrict: 'E',
			templateUrl: './components/guia/guide-steps-template/guide-template.html'
		};
	}]);

})();