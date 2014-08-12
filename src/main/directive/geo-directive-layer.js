/**
 * Created by daniel.joppi on 05/08/14.
 */
(function(ng, app) {

    "use strict";

    app.directive('layers', [function() {
        return {
            require: '^map',
            restrict: 'E',
            transclude: true,
            template: '<div class="layers"></div>',
            controller: ["$scope", function($scope) {

            }],
            link: function(scope, element, attrs, crtl) {
                console.log(crtl);
                crtl.addLayer();
            }
        };
    }]);

    app.directive('layer', [function() {
        return {
            require: ['^layers', '^map'],
            restrict: 'E',
            scope: {
                title: '@'
            },
            transclude: true,
            template: '<div class="layer"></div>',
            controller: ["$scope", function($scope) {

            }],
            link: function(scope, element, attrs, crtls) {
                console.log(crtls);
                var mapCrtl = crtls[1];
                mapCrtl.addLayer();
            }
        };
    }]);
})(angular, geoMap);