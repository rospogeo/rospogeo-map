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
            controller: ["$scope", function($scope) {
                $scope.lon = 5;
                $scope.lat = 40;
                $scope.zoom = 5;

                $scope.layers = new Array();
                this.addLayer = function(layer){
//                    $scope.layers.push({name: "OpenLayers WMS", url: "http://vmap0.tiles.osgeo.org/wms/vmap0"})
                    $scope.layers.push(layer);
                };
            }],
            link: function (scope, element, attributes) {
                console.log('map-link');
                scope.map = new OpenLayers.Map( scope.id );
                console.log('map', scope.map);
                for (var i=0; i<scope.layers.length; i++) {
                    var layer = scope.layers[i];
                    var olayer = new OpenLayers.Layer.WMS(layer.name, layer.url, {layers: 'basic'} );
                    scope.map.addLayer(olayer);
                }

                scope.map.setCenter(new OpenLayers.LonLat(scope.lon, scope.lat), scope.zoom);
                scope.map.addControl( new OpenLayers.Control.LayerSwitcher() );
            }
        };
    }]);

})(angular, geoMap);