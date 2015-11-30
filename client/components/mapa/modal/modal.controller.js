(function(){
	/**
	*  Modal Module
	*/
	'use strict';

	var ModalController = function($uibModalInstance, $uibModal, $scope){
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

	ModalController.$inject = ['$uibModalInstance','$uibModal','$scope'];

	angular.module('modal.controller', [])
		.controller('ModalController', ModalController);

}());