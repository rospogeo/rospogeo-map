rospogeo-map
============

An AngularJS directive used to insert georeferenced maps in DOM.
The project uses [openlayers](http://openlayers.org/) API to make the interfaces between the layers that make up a map.

[See it in action](http://rospogeo.github.io/rospogeo-map).

Usage
-----

include a layers

    <map id="rospo" width="100" height="100">
        <layers>
            <layer type="WMS" name="OpenLayers WMS" url="http://vmap0.tiles.osgeo.org/wms/vmap0" layers="basic" ></layer>
            <layer type="Google" ></layer>
        </layers>
    </map>

============

Demo
----------

[http://rospogeo.github.io/rospogeo-map](http://rospogeo.github.io/rospogeo-map)


Installation
----------

    bower install rospogeo-map