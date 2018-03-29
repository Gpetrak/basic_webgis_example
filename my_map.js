/* Copyright (C) 2018 George Petrakis <gkpetrak@gmail.com> 
     
   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.
   
   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.
   
   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

Ext.require([
    'Ext.container.Viewport',
    'Ext.layout.container.Border',
    'GeoExt.tree.Panel',
    'Ext.tree.plugin.TreeViewDragDrop',
    'GeoExt.panel.Map',
    'GeoExt.tree.OverlayLayerContainer',
    'GeoExt.tree.BaseLayerContainer',
    'GeoExt.data.LayerTreeModel',
    'GeoExt.tree.View',
    'GeoExt.tree.Column'
]);

var mapPanel, tree;

Ext.application({
    name: 'Tree',
    launch: function() {
        // create a map panel with some layers that we will show in our layer tree
        // below.
        mapPanel = Ext.create('GeoExt.panel.Map', {
            border: true,
            region: "center",
            // we do not want all overlays, to try the OverlayLayerContainer
            map: {allOverlays: false},
            center: new OpenLayers.LonLat(16, 37).transform(
            'EPSG:4326', 'EPSG:900913'),
            zoom: 5,
            layers: [
                                
                /* Base Layers */
                new OpenLayers.Layer.OSM("OpenStreetMap" ),
                
                /* Data */
                new OpenLayers.Layer.WMS("layer_title",
                    "http://localhost:8080/geoserver/wms", {
                        layers: "layer_name",
                        transparent: true,
                        format: "image/png"
                    }, {
                        isBaseLayer: false,
                        visibility: false,
                        projection:new OpenLayers.Projection("EPSG:900913"),
                        buffer: 0
                    }
                ),

              new OpenLayers.Layer.WMS("layer_title",
                    "http://localhost:8080/geoserver/wms", {
                        layers: "layer_name",
                        transparent: true,
                        format: "image/png"
                    }, {
                        isBaseLayer: false,
                        visibility: false,
                        projection:new OpenLayers.Projection("EPSG:900913"),
                        buffer: 0
                    }
                ),
              
             new OpenLayers.Layer.WMS("layer_title",
                    "http://localhost:8080/geoserver/wms", {
                        layers: "layer_name",
                        transparent: true,
                        format: "image/png"
                    }, {
                        isBaseLayer: false,
                        visibility: false,
                        projection:new OpenLayers.Projection("EPSG:900913"),
                        buffer: 0
                    }
                ),
             
             new OpenLayers.Layer.WMS("layer_title",
                    "http://localhost:8080/geoserver/wms", {
                        layers: "layer_name",
                        transparent: true,
                        format: "image/png"
                    }, {
                        isBaseLayer: false,
                        visibility: false,
                        projection:new OpenLayers.Projection("EPSG:900913"),
                        buffer: 0
                    }
                ),

             new OpenLayers.Layer.WMS("layer_title",
                    "http://localhost:8080/geoserver/wms", {
                        layers: "layer_name",
                        transparent: true,
                        format: "image/png"
                    }, {
                        isBaseLayer: false,
                        visibility: false,
                        projection:new OpenLayers.Projection("EPSG:900913"),
                        buffer: 0
                    }
                ),


            ]
        });

        var store = Ext.create('Ext.data.TreeStore', {
            model: 'GeoExt.data.LayerTreeModel',
            root: {
                expanded: true,
                children: [
                     {
                        plugins: ['gx_baselayercontainer'],
                        expanded: true,
                        text: "Base Maps"
                    }, {
                        plugins: ['gx_overlaylayercontainer'],
                        expanded: true
                    }
                ]
            }
        });

        var layer;

        // create the tree with the configuration from above
        tree = Ext.create('GeoExt.tree.Panel', {
            border: true,
            region: "west",
            title: "Layers",
            width: 250,
            split: true,
            collapsible: true,
            collapseMode: "mini",
            autoScroll: true,
            store: store,
            rootVisible: false,
            lines: true
        });

        Ext.create('Ext.Viewport', {
            layout: "fit",
            hideBorders: true,
            items: {
                layout: "border",
                deferredRender: false,
                items: [
			mapPanel, 
			tree, 
                       ]
            }
        });
    }
});
