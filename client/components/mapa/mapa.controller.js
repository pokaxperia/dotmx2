(function(){
	'use strict';
	
	var MapaController = function($timeout, $scope){
		var map = false;
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
			radius: 10,
			fillColor: "#74BDB6",
			color: "#fff",
			stroke: "#fff",
			weight: 2,
			dashArray: '2',
			opacity: 1,
			fillOpacity: 1
		};
	
		
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
			"color": "#ff7800",
			"weight": 5,
			"opacity": 0.65
		};
		
		// Load tiles and get accessToken
		L.mapbox.accessToken = 'pk.eyJ1IjoiY2Fhcmxvc2h1Z28xIiwiYSI6IklmZGNsNmMifQ.JJksWU3hBP-Vd3S9WtjFsA';
		map = L.mapbox.map('map-box', 'caarloshugo1.h9bggm26',{scrollWheelZoom:true}).setView([19.432711775616433, -99.13325428962708], 13);
		loadCity(estaciones_zmvm, lineas_zmvm, cdmx);
		
		//Add Sidebar
		sidebarLeft = L.control.sidebar('sidebar-left').addTo(map);

		// Load City Layers
		function loadCity(estaciones, lineas, ciudad){
			$timeout(function(){
				print(estaciones, lineas, ciudad);
				//$(".open-transport").css("display", "block");
				$("#myTabs a:last").tab('show');
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
						$("#focus-agency").append('<li><a>Nombres no definidos</a></li>');
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
				
				/*styles*/
				layer.on('click', function(e) {
					$(".select-city").removeClass("show");
					$(".open-side").css("display", "none");
					$(".open-transport").css("display", "none");
					estacionesGeo.setStyle({
						radius: 10,
						fillColor: "#74BDB6",
						color: "#fff",
						stroke: "#fff",
						weight: 2,
						dashArray: '2',
						opacity: 1,
						fillOpacity: 0.8
					});
					
					this.setStyle({
						color: '#455A64',
						weight: 3,
						opacity: 0.6,
						fillOpacity: 1,
						fillColor: '#455A64'
					});
						
					circleLayer.clearLayers();
					var circle = L.circle([layer._latlng.lat, layer._latlng.lng], 800, geojsonMarkerOptions2);
					

					
					if(ciudad=="puebla") {
						$("#info-Name").html(feature.properties.Name);
					} else {
						$("#info-Name").html(feature.properties.Nombre);
					}
					
					$("#info-Agencia").html(feature.properties.Agencia);
					$("#info-Escuelas").html(feature.properties.Escuelas);
					$("#info-AsistMed").html(feature.properties.AsistMed);
					$("#info-CComerc").html(feature.properties.CComerc);
					$("#info-Mercados").html(feature.properties.Mercados);
					$("#info-Templos").html(feature.properties.Templos);
					$("#info-Plazas").html(feature.properties.Plazas);
					$("#info-Deport").html(feature.properties.Deport);
					$("#info-PerRemPrim").html(feature.properties.PerRemPrim);
					$("#info-PerRemSecu").html(feature.properties.PerRemSecu);
					$("#info-PerRemTerc").html(feature.properties.PerRemTerc);
					$("#info-UEprim").html(feature.properties.UEprim);
					$("#info-UEsecu").html(feature.properties.UEsecu);
					$("#info-UEterc").html(feature.properties.UEterc);
					$("#info-PobTot").html(feature.properties.PobTot);
					$("#info-VivTot").html(feature.properties.VivTot);
					$("#info-VivDeshab").html(feature.properties.VivDeshab);
					$("#info-VivConAuto").html(feature.properties.VivConAuto);
					$("#info-VivTodServ").html(feature.properties.VivTodServ);
					$("#info-PobOcupada").html(feature.properties.PobOcupada);
					$("#info-PobDesocup").html(feature.properties.PobDesocup);
					$("#info-DensPobAvg").html(feature.properties.DensPob);
					
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
					var infoPerRemPrim = $("#info-PerRemPrim").text();
					var infoPerRemSecu = $("#info-PerRemSecu").text();
					var infoPerRemTerc = $("#info-PerRemTerc").text();
					var infoUEprim = $("#info-UEprim").text();
					var infoUEsecu = $("#info-UEsecu").text();
					var infoUEterc = $("#info-UEterc").text();
					var infoPobTot = $("#info-PobTot").text();
					var infoVivTot = $("#info-VivTot").text();
					var infoVivDeshab = $("#info-VivDeshab").text();
					var infoVivConAuto = $("#info-VivConAuto").text();
					var infoVivTodServ = $("#info-VivTodServ").text();
					var infoPobOcupada = $("#info-PobOcupada").text();
					var infoPobDesocup = $("#info-PobDesocup").text();
					var infoDensPobAvg = $("#info-DensPobAvg").text();

					$("#info-PerRemPrim").text(numeral(infoPerRemPrim).format('0,0'));
					$("#info-PerRemSecu").text(numeral(infoPerRemSecu).format('0,0'));
					$("#info-PerRemTerc").text(numeral(infoPerRemTerc).format('0,0'));
					$("#info-UEprim").text(numeral(infoUEprim).format('0,0'));
					$("#info-UEsecu").text(numeral(infoUEsecu).format('0,0'));
					$("#info-UEterc").text(numeral(infoUEterc).format('0,0'));
					$("#info-PobTot").text(numeral(infoPobTot).format('0,0'));
					$("#info-VivTot").text(numeral(infoVivTot).format('0,0'));
					$("#info-VivDeshab").text(numeral(infoVivDeshab).format('0,0'));
					$("#info-VivConAuto").text(numeral(infoVivConAuto).format('0,0'));
					$("#info-VivTodServ").text(numeral(infoVivTodServ).format('0,0'));
					$("#info-PobOcupada").text(numeral(infoPobOcupada).format('0,0'));
					$("#info-PobDesocup").text(numeral(infoPobDesocup).format('0,0'));
					$("#info-DensPobAvg").text(numeral(infoDensPobAvg).format('0,0'));
				});
			}
		}
		
		map.on('click', function(e) {
			circleLayer.clearLayers();
			sidebarLeft.close();
		});
	};
	
	MapaController.$inject = ['$timeout', '$scope'];
	
	angular.module('mapa', [])
	.controller('MapaController', MapaController);

})();