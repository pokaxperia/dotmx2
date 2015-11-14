(function(){
	'use strict';

	function GuideTemplate($timeout){
		var bodyOverflow = angular.element('body');
		var previousCard, currentCard;

		return {
			restrict: 'A',
			scope: {
				guideId: '&'
			},
			link: function (scope,element, attrs) {
				element.bind('click', function(){
					var contentCard = angular.element(document.getElementById('card-description'));
					var bodyBackground = angular.element(document.getElementById('bb'));
					var closeInfo = angular.element(document.getElementById('close-info'));
					previousCard = currentCard;

					currentCard = element;
					currentCard.addClass('active-card');

					if(previousCard){
						previousCard === currentCard ? currentCard.addClass('active-card') : previousCard.removeClass('active-card');
					}

					$timeout(function () {
						scope.guideId({
							value: attrs.guideId
						});
					}, 0);

					contentCard.addClass('show');
					contentCard[0].scrollTop = 0;

					bodyOverflow.css('overflow', 'hidden');
					bodyBackground.addClass('background');

					bodyBackground.bind('click', function(){
						if (bodyBackground.hasClass('background')) {
							contentCard.removeClass('show');
							bodyOverflow.css('overflow', 'inherit');
							bodyBackground.removeClass('background');
							currentCard.removeClass('active-card');
						}
					});

					closeInfo.bind('click', function(){
						if (bodyBackground.hasClass('background')) {
							contentCard.removeClass('show');
							bodyOverflow.css('overflow', 'inherit');
							bodyBackground.removeClass('background');
							currentCard.removeClass('active-card');
						};
					});
					
				});
			}
		};
	}

	GuideTemplate.$inject = ['$timeout'];

	angular.module('guide.id.directive', [])
		.directive('guideId', GuideTemplate);

})();