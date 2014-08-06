/**
 * Created by daniel.joppi on 05/08/14.
 */
(function(ng, app) {

    "use strict";

    app.directive('map', [function() {
        return {
            restrict: 'EA',
            scope: {
                id: "@",
                width: "@",
                height: "@"
            },
            replace: true,
            //templateUrl: 'partials/geo-directive-map.tpl.html',
            template: '<div  class="smallmap"></div>',
            controller: ["$scope", function($scope) {
                $scope.lon = 5;
                $scope.lat = 40;
                $scope.zoom = 5;
            }],
            link: function (scope, element, attributes) {
                scope.map = new OpenLayers.Map( scope.id );
                scope.layer = new OpenLayers.Layer.WMS( "OpenLayers WMS", "http://vmap0.tiles.osgeo.org/wms/vmap0", {layers: 'basic'} );
                scope.map.addLayer(scope.layer);

                scope.map.setCenter(new OpenLayers.LonLat(scope.lon, scope.lat), scope.zoom);
                scope.map.addControl( new OpenLayers.Control.LayerSwitcher() );
            }
        };
    }]);

})(angular, geoMap);