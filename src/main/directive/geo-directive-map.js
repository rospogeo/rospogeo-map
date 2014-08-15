/**
 * Created by daniel.joppi on 05/08/14.
 */
(function(ng, app) {

    "use strict";

    app.directive('map', [function() {
        return {
            restrict: 'E',
            scope: {
                id: "@",
                width: "@",
                height: "@"
            },
            replace: true,
            transclude: true,
            templateUrl: 'partials/geo-directive-map.tpl.html',
            //template: '<div class="smallmap" ng-transclude></div>',
            controller: ["$scope", "$attrs", function($scope, $attrs) {
                $scope.lon = 5;
                $scope.lat = 40;
                $scope.zoom = 5;

                $scope.layers = [];
                this.addLayer = function(layer){
//                    $scope.layers.push({name: "OpenLayers WMS", url: "http://vmap0.tiles.osgeo.org/wms/vmap0"})
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
                        case 'GOOGLE':
                            var olayers = [
                                new OpenLayers.Layer.Google("Google Physical", {type: google.maps.MapTypeId.TERRAIN}),
                                new OpenLayers.Layer.Google("Google Streets", {numZoomLevels: 20}),
                                new OpenLayers.Layer.Google("Google Hybrid", {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}),
                                new OpenLayers.Layer.Google("Google Satellite", {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22})
                            ];
                            scope.map.addLayers(olayers);
                            break;
                        case 'WMS':
                            var olayer = new OpenLayers.Layer.WMS(layer.name, layer.url, {layers: layer.layers} );
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