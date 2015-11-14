/*(function(){
	'use strict';
	
	angular.module('instrumentos.factory', []).
	factory('InstrumentosFactory', ['$http', '$q', function($http, $q){
		return {
			getInstrumentos: function(){
				var deferred = $q.defer();
				$q.all([
					$http.get('./components/instrumentos/json/normativos/normativos.json'),
					$http.get('./components/instrumentos/json/economicos/economicos.json')
				])
				.then(function(result){
					deferred.resolve(result);
				}, function(error){
					deferred.reject(error);
				});

				return deferred.promise;
			}
		};
	}]);
	
})()
*/