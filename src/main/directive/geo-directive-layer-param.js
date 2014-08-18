/**
 * Created by daniel.joppi on 05/08/14.
 */
(function(ng, app) {

    "use strict";

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