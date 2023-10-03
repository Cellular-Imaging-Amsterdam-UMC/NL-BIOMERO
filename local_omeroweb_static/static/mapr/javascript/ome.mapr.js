//   Copyright (C) 2016 University of Dundee & Open Microscopy Environment.
//   All rights reserved.

//   This program is free software: you can redistribute it and/or modify
//   it under the terms of the GNU Affero General Public License as
//   published by the Free Software Foundation, either version 3 of the
//   License, or (at your option) any later version.

//   This program is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   GNU Affero General Public License for more details.

//   You should have received a copy of the GNU Affero General Public License
//   along with this program.  If not, see <http://www.gnu.org/licenses/>.

//   Author: Aleksandra Tarkowska <A(dot)Tarkowska(at)dundee(dot)ac(dot)uk>,

//   Version: 1.0

//   Here we override jstree setup and configure


// jQuery load callback...

$(function () {

    var jstreeInst = $.jstree.reference('#dataTree');

    // payload
    var oldData = jstreeInst.settings.core.data;
    jstreeInst.settings.core.data = function(node, callback, payload) {
        if (payload === undefined) {
            payload = {};
        }
        if (MAPANNOTATIONS.CTX.value.length > 0) {
            payload['value'] = MAPANNOTATIONS.CTX.value;
        }
        // case sensitive results in a JSTree
        //if (MAPANNOTATIONS.CTX.case_sensitive.length > 0) {
        //    payload['case_sensitive'] = MAPANNOTATIONS.CTX.case_sensitive;
        //}
        // query results in a JSTree
        //if (MAPANNOTATIONS.CTX.query) {
        //    payload['query'] = MAPANNOTATIONS.CTX.query;
        //}
        oldData.apply(jstreeInst, [node, callback, payload]);
    }

    // custom type map
    jstreeInst.settings.types['#'].valid_children = ['map'];
    jstreeInst.settings.types['map'] = {
        'icon': WEBCLIENT.URLS.static_webclient + 'image/left_sidebar_icon_map.png',
        'valid_children': ['project', 'screen'],
        'draggable': false
    }

    if (MAPANNOTATIONS.CTX.label.length > 0) {
        jstreeInst.settings.types['map'].icon = MAPANNOTATIONS.URLS.static_webclient + 'image/' + MAPANNOTATIONS.CTX.label + '_icon_16x16.png';
    }
    jstreeInst.settings.types['plate'].valid_children = ['image'];

    jstreeInst.settings.sort = function(nodeId1, nodeId2) {
        var inst = this;
        var node1 = inst.get_node(nodeId1);
        var node2 = inst.get_node(nodeId2);

        function sortingStrategy(n1, n2) {
            // sorting strategy
            // sort by extra.imgCount or by name

            if(n1.type === 'experimenter') {
                if (n1.data.obj.id === WEBCLIENT.USER.id) {
                    return -1;
                } else if (n2.data.obj.id === WEBCLIENT.USER.id) {
                    return 1;
                }
            }

            var s1 = null;
            var s2 = null;
            var revert = false;
            // extra:counter shoudl take priority in sorting
            if (n1.data.obj.extra && n1.data.obj.extra.counter) {
                s1 = parseInt(n1.data.obj.extra.counter);
                s2 = parseInt(n2.data.obj.extra.counter);
                revert = true
            }
            // If counters are the same sort by Name
            if (s1 === s2) {
                // otherwise sort by name
                s1 = n1.text.toLowerCase();
                s2 = n2.text.toLowerCase();
            }
            // If names are same, sort by ID
            if (s1 === s2) {
                return n1.data.obj.id <= n2.data.obj.id ? -1 : 1;
            }
            if (revert)
                return s1 <= s2 ? 1 : -1;
            return s1 <= s2 ? -1 : 1;
        }

        return sortingStrategy(node1, node2);
    };


    // ----- Show -----
    // e.g. /mapr/gene/?value=CDC5&show=screen-51
    // $('#dataTree').on('loaded.jstree', function(e, data) {
    $('#dataTree').on('load_node.jstree', function(e, data) {
        // If we're not ROOT node, ignore
        if (data.node.id !== 'j1_1') return;
        var inst = data.instance;
        // Check for e.g. ?show=screen-51
        var show = OME.getURLParameter("show");
        var value = OME.getURLParameter("value");
        // Handle whitespace or other characters
        value = decodeURI(value);
        if (show && value) {
            // Find node that contains study:
            // /mapr/api/gene/paths_to_object/?map.value=CEP120&project=18328
            var url = MAPANNOTATIONS.URLS.paths_to_object + '?' + show.replace('-', '=');
            $.getJSON(url, {'map.value': value}, function(data) {
                if (data.paths && data.paths.length > 0) {
                    // Just traverse the first path, start looking at child of root
                    let pathToObj = data.paths[0].slice(1);
                    // start at root node
                    let rootNode = jstreeInst.get_node('ul > li:first');

                    function traverse(node, path) {
                        if (path.length == 0) {
                            inst.select_node(node);
                            return;
                        }
                        let nodeData = path[0];
                        node = inst.locate_node(nodeData.type + '-' + nodeData.id, node)[0];
                        if (!node) {
                            return;
                        }
                        path = path.slice(1);
                        inst.open_node(node, function(){
                            traverse(node, path);
                        });
                    }
                    // start recursive traversing...
                    traverse(rootNode, pathToObj);
                }
            });
        }
    });

});
