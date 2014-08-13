/**
 * Created by daniel.joppi on 05/08/14.
 */
(function(ng, app) {

    "use strict";

    app.directive('layers', [function() {
        return {
            require: '^map',
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<div class="layers" ng-transclude></div>',
            controller: ["$scope", function($scope) {
                console.log('layers');
            }],
            link: function(scope, element, attrs, crtl) {
                console.log('layers',crtl);
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
            replace: true,
            transclude: true,
            template: '<div class="layer"></div>',
            controller: ["$scope", function($scope) {

            }],
            link: function(scope, element, attrs, crtls) {
                console.log('layer',crtls);
                var mapCrtl = crtls[1];
                mapCrtl.addLayer();
            }
        };
    }]);
})(angular, geoMap);