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
                $scope.layers = [];

                this.addLayerParam = function(param) {
                    $scope.layers.push(ng.isObject(param) && param.hasOwnProperty("name") ? param.name : param);
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
})(angular, geoMap);