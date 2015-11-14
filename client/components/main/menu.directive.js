(function(){
	'use strict';

	angular.module('menu.directive', [])
	.directive('menuNavigation', ['$timeout',function ($timeout) {
		var dotMenu = angular.element(document.getElementById('dotmenu'));
		var item = dotMenu.children().children('.clickItem');
		var body = angular.element(document.getElementsByTagName('body'));
		var bodyClass = angular.element(document.getElementsByClassName('st-pusher'));
		return {
			restrict: 'E',
			template: '<a class="open-menu"><i class="fa fa-reorder"></i></a>',
			link: function (scope,element, attrs) {
				element.bind('click', function(e){
					e.preventDefault();
					dotMenu.addClass('show');

					item.bind('click', function(){
						dotMenu.removeClass('show');
					});
					
					bodyClass.bind('click', function(){
							dotMenu.removeClass('show');
					});

				});
			}
		};
	}]);

})();