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