var geoMap = angular.module('rospgeo.map',[]);
(function(ng, app) { "use strict";app.run(['$templateCache', function($templateCache) {   'use strict';

  $templateCache.put('partials/geo-directive-map.tpl.html',
    "<div class=smallmap><div ng-transclude></div></div>"
  );
 }]);})(angular, geoMap);
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
            }
        };
    }]);

})(angular, geoMap);
/**
 * Created by daniel.joppi on 05/08/14.
 */
(function(ng, app) {

    "use strict";

    app.directive('layers', [function() {
        return {
            require: '^map',
            restrict: 'E',
            controller: ["$scope", function($scope) {

            }],
            link: function(scope, element, attrs, crtl) {
                console.log('layers',crtl);
            }
        };
    }]);

    app.directive('layer', [function() {
        return {
            require: ['^layers', '^map'],
            restrict: 'E',
            scope: {
                type: '@',
                name: '@',
                url: '@',
                rlayers: '@',
                format: '@'
            },
            controller: ["$scope", function($scope) {

            }],
            link: function(scope, element, attrs, crtls) {
                console.log('layer',crtls, attrs);
                var layer = attrs;
                var mapCrtl = crtls[1];
                mapCrtl.addLayer(layer);
            }
        };
    }]);
})(angular, geoMap);