var geoMap = angular.module('rospgeo.map',[]);
(function(ng, app) { "use strict";app.run(['$templateCache', function($templateCache) {   'use strict';

  $templateCache.put('partials/geo-directive-map.tpl.html',
    "<div data-ng-style=\"{width: '{{width}}px', height: '{{height}}px'}\"><div ng-transclude></div></div>"
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
            controller: ["$scope", "$attrs", function($scope, $attrs) {
                $scope.lon = 5;
                $scope.lat = 40;
                $scope.zoom = 5;

                $scope.layers = new Array();
                this.addLayer = function(layer){
//                    $scope.layers.push({name: "OpenLayers WMS", url: "http://vmap0.tiles.osgeo.org/wms/vmap0"})
                    $scope.layers.push(layer);
                };
            }],
            link: function (scope, element, attrs) {
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
/**
 * Created by daniel.joppi on 05/08/14.
 */
(function(ng, app) {

    "use strict";

    app.directive('layer', [function() {
        return {
            require: '^map',
            restrict: 'E',
            scope: {
                type: '@',
                name: '@',
                url: '@',
                format: '@'
            },
            replace: true,
            transclude: true,
            template: '<div class="layers" ng-transclude></div>',
            controller: ["$scope", function($scope) {
                $scope.layers = new Array();

                this.addLayerParam = function(param) {
                    $scope.layers.push(typeof param == "object" ? param.name : param);
                };
            }],
            link: function(scope, element, attrs, crtl) {
                console.log('layer',crtl);
                var layer = {
                    type: attrs.type,
                    name: attrs.name,
                    url: attrs.url,
                    layers: scope.layers ? scope.layers.toString() : null,
                    format: attrs.format
                };
                console.log('addLayer', layer);
                crtl.addLayer(layer);
            }
        };
    }]);

    app.directive('layerParam', [function() {
        return {
            require: ['^layer', '^map'],
            restrict: 'E',
            scope: {
                name: '@'
            },
            replace: true,
            template: '<div class="layers-param"></div>',
            controller: ["$scope", function($scope) {

            }],
            link: function(scope, element, attrs, crtls) {
                console.log('layer-param',crtls, attrs);
                var param = attrs;
                // layer controller
                var crtl = crtls[0];
                crtl.addLayerParam(param);
            }
        };
    }]);
})(angular, geoMap);