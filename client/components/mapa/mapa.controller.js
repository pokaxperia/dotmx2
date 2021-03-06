(function(){
	'use strict';
	
	var MapaController = function($timeout, $scope, $window, $uibModal){
		var modalTimer = sessionStorage.getItem('modalTimer');
		if(modalTimer !== 'true'){
			Modal();
		}
		var windowSize = $(window).innerWidth();
		var map = false, newZoom, newRadius = 6, currentZoom, previousZoom, setZoom;
		var sidebarLeft = false;
		var sidebarRight = false;
		var agencies = new Array();
		var circleLayer = new L.LayerGroup();
		var estacionesLayer	= new L.LayerGroup();
		var lineasLayer = new L.LayerGroup();
		var optionsMap = [
			{"coordenadas": [19.432711775616433, -99.13325428962708],"zoom": 12},
			{"coordenadas": [19.044918668412617, -98.20747375488281],"zoom": 13},
			{"coordenadas": [20.674929132304698, -103.35479378700256],"zoom": 13},
			{"coordenadas": [25.68713198895331, -100.33032417297363],"zoom": 13},
			{"coordenadas": [31.669526781976998, -106.45245552062987],"zoom": 13},
			{"coordenadas": [21.125937978524263, -101.70035362243652],"zoom": 13},
			{"coordenadas": [28.642690467330326, -106.08458518981934],"zoom": 13},
			{"coordenadas": [21.876951611919733, -102.3012113571167],"zoom": 13},
			{"coordenadas": [20.117114283545682, -98.74726295471191],"zoom": 13}
		]

		var geojsonMarkerOptions = {
			radius: newRadius,
			fillColor: "#009688",
			color: "#fff",
			stroke: "#fff",
			weight: 2,
			dashArray: 0,
			opacity: 1,
			fillOpacity: 1
		};
		
		function setNewZoom(zoom){
			if (zoom <= 12) {
				newRadius = 0;
			}
			else if (zoom < 14) {
				newRadius = 6;
			}
			else if(zoom === 14){
				newRadius = 8;
			}
			else if(zoom > 14){
				newRadius = 9;
			}
			estacionesLayer.eachLayer(function(e){
				e.setStyle({
					radius: newRadius
				});
			});
		}

		var geojsonMarkerOptions2 = {
			radius: 30,
			fillColor: "#74BDB6",
			color: "#455A64",
			stroke: "#fff",
			weight: 2,
			dashArray: '0',
			opacity: 1,
			fillOpacity: 0.5
		};
		
		var lineStyle = {
			"color": "#F57C00",
			"weight": 5,
			"opacity": 0.65
		};
		
		// Load tiles and get accessToken
		L.mapbox.accessToken = 'pk.eyJ1IjoiY2Fhcmxvc2h1Z28xIiwiYSI6IklmZGNsNmMifQ.JJksWU3hBP-Vd3S9WtjFsA';
		setZoom = 13;

		if(windowSize <= 768){
			setZoom = 11;
		}

		map = L.mapbox.map('map-box', 'caarloshugo1.h9bggm26',{scrollWheelZoom:true}).setView([19.432711775616433, -99.13325428962708], setZoom);
		
		loadCity(estaciones_zmvm, lineas_zmvm, cdmx);
		
		function Modal(){
			return $timeout(function(){
				sessionStorage.setItem('modalTimer', 'true');
				$uibModal.open({
					controller: 'ModalController',
					templateUrl: './components/mapa/modal/modal.html'
				});
			}, 1500);
		}
		
		//Add Sidebar
		sidebarLeft = L.control.sidebar('sidebar-left').addTo(map);

		// Load City Layers
		function loadCity(estaciones, lineas, ciudad){
			$timeout(function(){
				print(estaciones, lineas, ciudad);
			}, 1000);
			
		}
		function setMapView(coor, z){
			map.setView(coor, parseInt(z));
		}

		// Open right sidebar
		$(".open-city").on('click', function(){
			$(".select-city").toggleClass("show");
			$(".open-side").css("display", "block");
			$(".open-transport").css("display", "block");
			sidebarLeft.close();
		});

		// Select city
		$(".selected-city").html("Ciudad de México");
		$("#focus-city > li > a").click( function() {
			
			$("#focus-city > li").removeClass("active");
			$("#focus-city > li > a > i").removeClass("fa-map-marker");
			$(this).parent().addClass("active");
			$(this).children().addClass("fa-map-marker");
			
			var city = $(this).attr("id");
			var selectedCity = $(this).attr("city");
			var setCity = $(".selected-city");
			setCity.text(selectedCity);

			if(city === "cdmx") {
				loadCity(estaciones_zmvm, lineas_zmvm, city);
				setMapView(optionsMap[0].coordenadas, optionsMap[0].zoom);
			} else if(city === "puebla") {
				loadCity(estaciones_puebla, lineas_puebla, city);
				setMapView(optionsMap[1].coordenadas, optionsMap[1].zoom);
			} else if(city === "gdl") {
				loadCity(estaciones_gdl, lineas_gdl, city); //cambiar las lineas
				setMapView(optionsMap[2].coordenadas, optionsMap[2].zoom);
			} else if(city === "mty") {
				loadCity(estaciones_mty, lineas_mty, city); //cambiar las lineas
				setMapView(optionsMap[3].coordenadas, optionsMap[3].zoom);
			} else if(city === "juarez") {
				loadCity(estaciones_juarez, lineas_juarez, city);
				setMapView(optionsMap[4].coordenadas, optionsMap[4].zoom);
			} else if(city === "leon") {
				loadCity(estaciones_leon, lineas_leon, city);
				setMapView(optionsMap[5].coordenadas, optionsMap[5].zoom);
			} else if(city === "chihua") {
				loadCity(estaciones_chihuahua, lineas_chihuahua, city);
				setMapView(optionsMap[6].coordenadas, optionsMap[6].zoom);
			} else if(city === "aguas") {
				loadCity(estaciones_aguas, lineas_aguas, city);
				setMapView(optionsMap[7].coordenadas, optionsMap[7].zoom);
			} else if(city === "pachuca") {
				loadCity(estaciones_pachuca, lineas_pachuca, city); //cambiar las lineas
				setMapView(optionsMap[8].coordenadas, optionsMap[8].zoom);
			}
		});

		function print(estaciones, lineas, ciudad, filter) {
			agencies = new Array();
			
			/*clear layers*/
			estacionesLayer.clearLayers();
			lineasLayer.clearLayers();
			circleLayer.clearLayers();
			
			if(filter === undefined) {
				/*lineas*/
				var lineasGeo = L.geoJson(lineas, {
					style: lineStyle
				});
				lineasLayer.addLayer(lineasGeo);
				lineasLayer.addTo(map);
				
				/*estaciones*/
				var estacionesGeo = L.geoJson(estaciones, {
					onEachFeature: onEachFeature,
					pointToLayer: function (feature, latlng) {
						return L.circleMarker(latlng, geojsonMarkerOptions);
					}
				});

				estacionesLayer.addLayer(estacionesGeo);
				estacionesLayer.addTo(map);
				// Open transports
				$("#focus-agency").html("");
					if(agencies.length > 1) {
						$("#focus-agency").append('<h4 class="title-right">Medios de Transporte</h4>');
						agencies.forEach(function(entry) {
							$("#focus-agency").append('<li><a id="' + entry + '">' + entry +'</a></li>');
						});
						
						$("#focus-agency > li > a").click( function () {
							if($(this).hasClass("active-agency") && $(this).hasClass("dotmx-transport")) {
								$(this).removeClass("active-agency");
								$(this).removeClass("dotmx-transport");
							} else {
								$(this).addClass("active-agency");
								$(this).addClass("dotmx-transport");
							}
							print(estaciones, lineas, ciudad, true);
						});
					}
					else{
							$("#focus-agency").append('<h4 class="title-right">Medios de Transporte</h4>');
							$("#focus-agency").append('<li><a id="' + agencies + '">' + agencies +'</a></li>');
					}
			}
			else {
				var arrayAgencies  = $(".active-agency").toArray();
				var agenciesSelect = new Array();
				arrayAgencies.forEach(function(entry) {
					agenciesSelect.push($(entry).attr("id"));
				});
				/*lineas*/
				var lineasGeo = L.geoJson(lineas, {
					style: lineStyle,
					filter: function (feature, layer) {
						if(agenciesSelect.indexOf(feature.properties.Agencia) !== -1) return feature.properties;
						return false;
					}
				});
				lineasLayer.addLayer(lineasGeo);
				lineasLayer.addTo(map);
				
				/*estaciones*/
				var estacionesGeo = L.geoJson(estaciones, {
					filter: function (feature, layer) {
						if(agenciesSelect.indexOf(feature.properties.Agencia) !== -1) return feature.properties;
						
						return false;
					},
					onEachFeature: onEachFeature,
					pointToLayer: function (feature, latlng) {
						return L.circleMarker(latlng, geojsonMarkerOptions);
					}
				});
				estacionesLayer.addLayer(estacionesGeo);
				estacionesLayer.addTo(map);

				if(agenciesSelect.length !== 0) {
					map.fitBounds(lineasGeo);
				}		
			}
			
			function onEachFeature(feature, layer) {
				/*Agencias*/
				if(feature.properties.Agencia !== "" && feature.properties.Agencia !== undefined && agencies.indexOf(feature.properties.Agencia) == -1) {
					agencies.push(feature.properties.Agencia);
				}
				if(feature.Agencia !== "" && feature.Agencia !== undefined && agencies.indexOf(feature.Agencia) == -1) {
					agencies.push(feature.Agencia);
				}
				

				
				/*styles*/
				layer.on('click', function(e) {
					$(".select-city").removeClass("show");
					estacionesGeo.setStyle({
						radius: newRadius,
						fillColor: "#009688",
						color: "#fff",
						weight: 1,
						dashArray: 0,
						opacity: 0.75,
						fillOpacity: 0.5
					});
					
					this.setStyle({
						radius: newRadius,
						color: '#4C5667',
						weight: 3,
						opacity: 0.6,
						fillOpacity: 1,
						fillColor: '#4C5667'
					});
						
					circleLayer.clearLayers();
					var circle = L.circle([layer._latlng.lat, layer._latlng.lng], 800, geojsonMarkerOptions2);
					

					
					if(ciudad=="puebla") {
						$("#info-Name").empty().html(feature.properties.Name);
					} else {
						$("#info-Name").empty().html(feature.properties.Nombre);
					}
					if(ciudad=="gdl") {
						$("#info-Name").empty().html(feature.properties.Name);
					} else {
						$("#info-Name").empty().html(feature.properties.nombre);
					}
					if(ciudad=="mty") {
						$("#info-Name").empty().html(feature.properties.Name);
						console.log($("#info-Name").empty().html(feature.properties.Name))
					} else {
						$("#info-Name").empty().html(feature.properties.Nombre);
						console.log(feature.properties.Nombre)
						
					}

					$("#info-Agencia").empty().html(feature.properties.Agencia);
					// Poblacion
					$("#info-PobTot").empty().html(feature.properties.PobTot);
					$("#info-PorcPobOcu").empty().html(feature.properties.PorcPobOcu);
					$("#info-PorcPobDes").empty().html(feature.properties.PorcPobDes);
					$("#info-GMU").empty().html(feature.properties.GMU);
					$("#info-NSE").empty().html(feature.properties.NSE);
					$("#info-DensPobAvg").empty().html(feature.properties.DensPob);
					
					// Vivienda
					$("#info-VivTot").empty().html(feature.properties.VivTot);
					$("#info-PorcVTdSrv").empty().html(feature.properties.PorcVTdSrv);
					$("#info-PorcVDesha").empty().html(feature.properties.PorcVDesha);
					$("#info-PorcVCnAut").empty().html(feature.properties.PorcVCnAut);
					
					// Unidades economicas
					$("#info-UETot").empty().html(feature.properties.UETot);
					$("#info-PorcUEPrim").empty().html(feature.properties.PorcUEPrim);
					$("#info-PorcUESecu").empty().html(feature.properties.PorcUESecu);
					$("#info-PorcUETerc").empty().html(feature.properties.PorcUETerc);
					
					// Personal remunerado
					$("#info-PersRemTot").empty().html(feature.properties.PersRemTot);
					$("#info-PorcPRprim").empty().html(feature.properties.PorcPRprim);
					$("#info-PorcPRsecu").empty().html(feature.properties.PorcPRsecu);
					$("#info-PorcPRterc").empty().html(feature.properties.PorcPRterc);
					
					// Equipamiento
					$("#info-Escuelas").empty().html(feature.properties.Escuelas);
					$("#info-Mercados").empty().html(feature.properties.Mercados);
					$("#info-Templos").empty().html(feature.properties.Templos);
					$("#info-Plazas").empty().html(feature.properties.Plazas);
					$("#info-Deport").empty().html(feature.properties.Deport);
					$("#info-AsistMed").empty().html(feature.properties.AsistMed);

					circleLayer.addLayer(circle);
					circleLayer.addTo(map);
					estacionesGeo.bringToFront();
					
					$(".leaflet-popup-close-button").click( function() {
						circleLayer.clearLayers();
						sidebarLeft.close();
					});
					
					map.panTo(new L.LatLng(layer._latlng.lat, layer._latlng.lng));
					sidebarLeft.open("poblacion");
					
					// Numeral
					
					// Poblacion
					$("#info-PobTot").html(numeral(feature.properties.PobTot).format('0,0'));
					$("#info-PorcPobOcu").html(numeral(feature.properties.PorcPobOcu).format('0%'));
					$("#info-PorcPobDes").html(numeral(feature.properties.PorcPobDes).format('0%'));
					if(feature.properties.GMU != undefined) {
					 $("#info-GMU").html(feature.properties.GMU);
					}
					if(feature.properties.NSE != undefined) {
					 $("#info-NSE").html(feature.properties.NSE);
					}
					$("#info-DensPobAvg").html(numeral(feature.properties.DensPob).format('0,0'));

					// Vivienda
					$("#info-VivTot").html(numeral(feature.properties.VivTot).format('0,0'));
					if(feature.properties.PorcVTdSrv != undefined) {
					 $("#info-PorcVTdSrv").html(numeral(feature.properties.PorcVTdSrv).format('0%'));
					}
					if(feature.properties.PorcVDesha != undefined) {
					 $("#info-PorcVDesha").html(numeral(feature.properties.PorcVDesha).format('0%')); 
					}
					if(feature.properties.PorcVCnAut != undefined) {
					 $("#info-PorcVCnAut").html(numeral(feature.properties.PorcVCnAut).format('0%'));
					}

					// Unidades economicas
					$("#info-UETot").text(numeral(feature.properties.UETot).format('0,0'));
					$("#info-PorcUEPrim").html(numeral(feature.properties.PorcUEPrim).format('0%'));
					$("#info-PorcUESecu").html(numeral(feature.properties.PorcUESecu).format('0%'));
					$("#info-PorcUETerc").html(numeral(feature.properties.PorcUETerc).format('0%'));

					// Personal remunerado
					$("#info-PersRemTot").html(numeral(feature.properties.PersRemTot).format('0,0'));
					$("#info-PorcPRprim").html(numeral(feature.properties.PorcPRprim).format('0%'));
					$("#info-PorcPRsecu").html(numeral(feature.properties.PorcPRsecu).format('0%'));
					$("#info-PorcPRterc").html(numeral(feature.properties.PorcPRterc).format('0%'));
				});
			}
		}

		map.on('click', function(e) {
			circleLayer.clearLayers();
			sidebarLeft.close();
			estacionesLayer.eachLayer(function(e){
				e.setStyle({
					radius: newRadius,
					fillColor: "#009688",
					color: "#fff",
					stroke: "#fff",
					weight: 2,
					dashArray: 0,
					opacity: 1,
					fillOpacity: 1
				});
			});
		});

		map.on('zoomend', function(e) {
			newZoom = map.getZoom();
			setNewZoom(newZoom);
		});
		
	};
	
	MapaController.$inject = ['$timeout', '$scope', '$window', '$uibModal'];
	
	angular.module('mapa', [])
	.controller('MapaController', MapaController);

})();