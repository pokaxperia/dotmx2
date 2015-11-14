(function(){
	/**
	*  Modal Module
	*/
	'use strict';

	var ModalController = function($uibModalInstance, $uibModal, $scope, contenido){
		$scope.card_content = contenido;
		init();

		function init(){

		}

		$scope.saveArea = function () {

			$uibModalInstance.close();
		};

		$scope.updateArea = function () {

			$uibModalInstance.close();
		};

		$scope.notYet = function () {
			$uibModalInstance.close('notYet');
		};





	};

	ModalController.$inject = ['$uibModalInstance','$uibModal','$scope', 'contenido'];

	angular.module('modal.controller', [])
		.controller('ModalController', ModalController);

}());