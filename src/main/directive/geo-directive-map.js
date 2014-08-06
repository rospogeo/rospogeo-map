/**
 * Created by daniel.joppi on 05/08/14.
 */
(function(ng, app) {

    "use strict";

    app.directive('map', [function() {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'partials/geo-directive-map.tpl.html',
            controller: ["$rootScope", "$scope", "$http", function($rootScope, $scope, $http) {

            }]
        };
    }]);

})(angular, geoMap);