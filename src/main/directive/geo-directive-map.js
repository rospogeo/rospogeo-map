/**
 * Created by daniel.joppi on 05/08/14.
 */
(function(ng, app) {

    "use strict";

    app.directive('map', [function() {
        // define static layers
        var GOOGLE_LAYERS = [];
        GOOGLE_LAYERS['TERRAIN'] = new OpenLayers.Layer.Google("Google Physical", {type: google.maps.MapTypeId.TERRAIN});
        GOOGLE_LAYERS['STREET'] = new OpenLayers.Layer.Google("Google Streets", {numZoomLevels: 20});
        GOOGLE_LAYERS['HYBRID'] = new OpenLayers.Layer.Google("Google Hybrid", {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20});
        GOOGLE_LAYERS['SATELLITE'] = new OpenLayers.Layer.Google("Google Satellite", {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22});
        return {
            restrict: 'E',
            scope: {
                id: "@",
                width: "@",
                height: "@",
                lon: "@",
                lat: "@",
                zoom: "@"
            },
            replace: true,
            transclude: true,
            templateUrl: 'partials/geo-directive-map.tpl.html',
            //template: '<div class="smallmap" ng-transclude></div>',
            controller: ["$scope", "$attrs", function($scope, $attrs) {
                $scope.lon = $scope.lon | 5;
                $scope.lat = $scope.lat | 40;
                $scope.zoom = $scope.zoom | 5;

                $scope.layers = [];
                this.addLayer = function(layer) {
                    $scope.layers.push(layer);
                };
            }],
            link: function (scope, element, attrs) {
                console.log('map-link');
                scope.map = new OpenLayers.Map( scope.id );
                console.log('map', scope.map);
                for (var i = 0, l = scope.layers.length; i < l; i++) {
                    var layer = scope.layers[i];
                    switch(layer.type.toUpperCase()) {
                        case 'ARCGIS':

                            break;
                        case 'ARCIMS':

                            break;
                        case 'GOOGLE':
                            console.log('google layers', layer.layers);
                            if (layer.layers.length == 0) {
                                scope.map.addLayers([GOOGLE_LAYERS['TERRAIN'], GOOGLE_LAYERS['STREET'], GOOGLE_LAYERS['HYBRID'], GOOGLE_LAYERS['SATELLITE']]);
                            } else {
                                if (layer.layers.indexOf('TERRAIN') > -1) {
                                    scope.map.addLayer(GOOGLE_LAYERS['TERRAIN']);
                                }
                                if (layer.layers.indexOf('STREET') > -1) {
                                    scope.map.addLayer(GOOGLE_LAYERS['STREET']);
                                }
                                if (layer.layers.indexOf('HYBRID') > -1) {
                                    scope.map.addLayer(GOOGLE_LAYERS['HYBRID']);
                                }
                                if (layer.layers.indexOf('SATELLITE') > -1) {
                                    scope.map.addLayer(GOOGLE_LAYERS['SATELLITE']);
                                }
                            }
                            break;
                        case 'WMS':
                            var olayer = new OpenLayers.Layer.WMS(layer.name, layer.url, {layers: layer.layers.toString()} );
                            scope.map.addLayer(olayer);
                            break;
//                        case 'WFS':
//                            var olayer = new OpenLayers.Layer.WFS(layer.name, layer.url, {layers: layer.layers, format: layer.format} );
//                            scope.map.addLayer(olayer);
//                            break;
                    }
                    if (olayer) {
                    }
                }

                scope.map.setCenter(new OpenLayers.LonLat(scope.lon, scope.lat), scope.zoom);
                scope.map.addControl( new OpenLayers.Control.LayerSwitcher() );
                //scope.map.updateSize();

                attrs.$observe('width', function(newVal){
                    if (newVal < 10) return;
                    console.log('new width', newVal, 'old width', scope['width'], 'css width', element.css('width'));
                    element.css('width', newVal+'px');
                    if (scope.map) {
                        scope.map.updateSize();
                    }
                });
                attrs.$observe('height', function(newVal){
                    if (newVal < 10) return;
                    console.log('new height', newVal, 'old height', scope['height'], 'css height', element.css('height'));
                    element.css('height', newVal+'px');
                    if (scope.map) {
                        scope.map.updateSize();
                    }
                });
            }
        };
    }]);

})(angular, geoMap);