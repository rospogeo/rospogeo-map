rospogeo-map
============

An AngularJS directive used to insert georeferenced maps in DOM.
The project uses [openlayers](http://openlayers.org/) API to make the interfaces between the layers that make up a map.

[See it in action](http://rospogeo.github.io/rospogeo-map).

Usage
-----

include a simple layer

    <map width="100" height="100" >
        <layers name="Global Imagery" type="WMS" url="http://maps.opengeo.org/geowebcache/service/wms" >
            <layer name="bluemarble" isbase="true" ></layer>
        </layers>
    </map>

multiple layers of same source

    <map width="100" height="100">
        <layers name="NASA Global Mosaic" type="WMS" url="http://wms.jpl.nasa.gov/wms.cgi" >
            <layer name="modis" ></layer>
            <layer name="global_mosaic" ></layer>
        </layers>
    </map>

multiple layers of any source

    <map width="100" height="100">
        <layers name="Global Imagery" type="WMS" url="http://maps.opengeo.org/geowebcache/service/wms" >
            <layer name="bluemarble" isbase="true" ></layer>
        </layers>
        <layers name="NASA Global Mosaic" type="WMS" url="http://wms.jpl.nasa.gov/wms.cgi" >
            <layer name="modis" ></layer>
            <layer name="global_mosaic" ></layer>
        </layers>
    </map>

============

Demo
----------

[http://rospogeo.github.io/rospogeo-map](http://rospogeo.github.io/rospogeo-map)