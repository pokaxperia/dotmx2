(function(){
	'use strict';

	angular.module('menu.directive', [])
	.directive('menuNavigation', ['$timeout', '$document','$state',function ($timeout, $document, $state) {
		return{
			restrict: 'A',
			controller: function(){
				var body = angular.element(document.getElementsByTagName('body'));
				var menu = angular.element(document.getElementsByClassName('navbar-right'));
				var clickItem = menu.children().children();
				$document.on('scroll', function() {
					var topHeader = angular.element(document.getElementsByClassName('navbar-default'));
					if($document.scrollTop() >= 65){
						topHeader.addClass('sticky');
					}
					else if($state.current.name === 'mapa'){
						topHeader.addClass('sticky');
					}
					else{
						topHeader.removeClass('sticky');
					}
				});
				
				if (body[0].clientWidth <= 768) {
					clickItem.bind('click', function(){
						menu.parent().removeClass('in');
					})
				};
			}
		}
	}]);

})();