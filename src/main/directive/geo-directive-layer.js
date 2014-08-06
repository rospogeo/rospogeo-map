/**
 * Created by daniel.joppi on 05/08/14.
 */
(function(ng, app) {

    "use strict";

    app.directive('layers', [function() {
        return {
            restrict: 'EA',
            replace: true,
            controller: ["$rootScope", "$scope", "$http", function($rootScope, $scope, $http) {

            }]
        };
    }]);

    app.directive('layer', [function() {
        return {
            restrict: 'EA',
            replace: true,
            controller: ["$rootScope", "$scope", "$http", function($rootScope, $scope, $http) {

            }]
        };
    }]);
})(angular, geoMap);