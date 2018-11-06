/**
 *
 * This file contain useful functions that help manipulate the graph structure
 * such as an generic implementation of the Deep First Search and Breadth First Search algorithm.
 *
 */

import "spinal-core-connectorjs";

import {
    SPINAL_RELATION_TYPE,
    SPINAL_RELATION_LST_PTR_TYPE,
    SPINAL_RELATION_PTR_LST_TYPE,
} from "../Relations/SpinalRelationFactory"
import SpinalNode from "../Nodes/SpinalNode";
import SpinalGraph from "../Nodes/SpinalGraph";
import SpinalContext from "../Nodes/SpinalContext";

const JSON_RELATIONS_NAME = "relation";
const JSON_NODES_INFO_NAME = "nodes_info";
const JSON_STARTING_NODE_NAME = "starting_node";

async function exportGraph(startingNode, json) {

    const startingNodeId = startingNode.getId();

    const relationMapsToJson = (relationType, relationMap, json) => {
        relationMap.forEach((relation) => {

            const childrenIds = relation.getChildrenIds();

            for (let i = 0; i < childrenIds.length; i++) {
                json[relationType].push({ from: startingNodeId, relationName: relation.name, to: childrenIds[i] })
            }

        });
    };

    const initJSON = () => {
        if (!json.hasOwnProperty(JSON_NODES_INFO_NAME) && !json.hasOwnProperty(JSON_RELATIONS_NAME)) {

            json[JSON_NODES_INFO_NAME] = [];

            json[JSON_RELATIONS_NAME] = {
                SPINAL_RELATION_TYPE: [],
                SPINAL_RELATION_LST_PTR_TYPE: [],
                SPINAL_RELATION_PTR_LST_TYPE: []
            };

            json[JSON_STARTING_NODE_NAME] = startingNode.info.id;
        }
    };


    initJSON();

    if (!json[JSON_NODES_INFO_NAME].includes(startingNode.info)) {


        json[JSON_NODES_INFO_NAME].push(startingNode.info);
        const relationJson = {};
        relationMapsToJson(SPINAL_RELATION_TYPE, startingNode.relationListTypeSpinalRelation, relationJson);
        relationMapsToJson(SPINAL_RELATION_LST_PTR_TYPE, startingNode.relationListTypeSpinalRelationLstPtr, relationJson);
        relationMapsToJson(SPINAL_RELATION_PTR_LST_TYPE, startingNode.relationListTypeSpinalRelationPtrLst, relationJson);
        json[JSON_RELATIONS_NAME][startingNodeId] = relationJson;


        const children = await startingNode.getChildren([]);
        for (let i = 0; i < children.length; i++) {
            await exportGraph(children[i], json);
        }

        return json;
    }
    else {
        return "undefined"
    }
};


const importGraph = (json) => {

    const nodes = new Map();
    if (!json.hasOwnProperty(JSON_NODES_INFO_NAME) || !json.hasOwnProperty(JSON_RELATIONS_NAME) || !json.hasOwnProperty(JSON_STARTING_NODE_NAME)) {
        throw new Error("Cannot import Graph Json Malformed")
    }

    const createNodeFromInfo = (info) => {
        let node;
        switch (info.type) {
            case "SpinalGraph":
                node = new SpinalGraph();
                break;
            case "SpinalContext":
                node = new SpinalContext();
                break;
            default:
                node = new SpinalNode();
                break;
        }

        node.info = info;

        return node;
    };

    const addChildrenToNode = (json) => {
        if (json[JSON_RELATIONS_NAME].hasOwnProperty(SPINAL_RELATION_TYPE))
            json[JSON_RELATIONS_NAME][SPINAL_RELATION_TYPE].forEach(relation => {

                let node;
                if (nodes.has(relation.from) && nodes.has(relation.to)) {
                    node = nodes.get(relation.from);
                    node.addChild(nodes.get(relation.to), relation.relationName, SPINAL_RELATION_TYPE);
                }

            });

        if (json[JSON_RELATIONS_NAME].hasOwnProperty(SPINAL_RELATION_LST_PTR_TYPE))
            json[JSON_RELATIONS_NAME][SPINAL_RELATION_LST_PTR_TYPE].forEach(relation => {
                let node;
                if (nodes.has(relation.from) && nodes.has(relation.to)) {
                    node = nodes.get(relation.from);
                    node.addChild(nodes.get(relation.to), relation.relationName, SPINAL_RELATION_LST_PTR_TYPE);
                }

            });

        if (json[JSON_RELATIONS_NAME].hasOwnProperty(SPINAL_RELATION_PTR_LST_TYPE))
            json[JSON_RELATIONS_NAME][SPINAL_RELATION_PTR_LST_TYPE].forEach(relation => {
                let node;
                if (nodes.has(relation.from) && nodes.has(relation.to)) {
                    node = nodes.get(relation.from);
                    node.addChild(nodes.get(relation.to), relation.relationName, SPINAL_RELATION_PTR_LST_TYPE);
                }

            });

    };
    //Create a node for each info contain in json[JSON_NODES_INFO_NAME]
    json[JSON_NODES_INFO_NAME].forEach(info => {

        const node = createNodeFromInfo(info);

        nodes.set(node.info.id.toString(), node);

    });
    addChildrenToNode(json);

    return nodes;
};


const initDummyJsonGraph = () => {

    const jsonGraph = {};
    const relation = {};
    const floorsChildren = {
        7: { rooms: [11, 12], equipment: [5, 6] },
        8: { rooms: [13, 14], equipment: [9, 10] }
    };

    const roomChildren = {
        11: {
            ref: 15,
            equipment: [16]
        },
        12: { equipment: [17] },
        13: { equipment: [18] },
        14: { equipment: [19] }
    };

    const initJSON = () => {
        jsonGraph[JSON_NODES_INFO_NAME] = [];
        jsonGraph[JSON_RELATIONS_NAME] = {};
        jsonGraph[JSON_STARTING_NODE_NAME] = "";
    };

    const initRelation = () => {
        relation[SPINAL_RELATION_TYPE] = [];
        relation[SPINAL_RELATION_LST_PTR_TYPE] = [];
        relation[SPINAL_RELATION_PTR_LST_TYPE] = [];
    };

    const initGraphRelation = () => {
        relation[SPINAL_RELATION_LST_PTR_TYPE].push({ from: 1, relationName: "hasContext", to: 2 });
    };

    const initContextRelation = () => {
        relation[SPINAL_RELATION_TYPE].push({ fom: 2, relationName: "hasBuilding", to: 3 });
    };

    const initBuildingRelation = () => {
        relation[SPINAL_RELATION_TYPE].push({ from: 3, relationName: "buildingHasFloor", to: 7, });
        relation[SPINAL_RELATION_TYPE].push({ from: 3, relationName: "buildingHasFloor", to: 7, });
        relation[SPINAL_RELATION_LST_PTR_TYPE].push({ from: 3, relationName: "buildingHasEquipment", to: 4 });
    };

    const initFloorRelation = (id) => {
        const floorInfo = floorsChildren[id];
        for (let i = 0; i < floorInfo["rooms".length]; i++)
            relation[SPINAL_RELATION_TYPE].push({
                from: id,
                relationName: "floorHasRoom",
                to: floorInfo["rooms"][i]
            });
        for (let i = 0; i < floorInfo["equipment"].length; i++) {
            relation[SPINAL_RELATION_LST_PTR_TYPE].push({
                from: id,
                relationName: "FloorHasEquipment",
                to: floorInfo["equipment"][i]
            });
        }
    };

    const initRoomRelation = (id) => {
        const roomInfo = roomChildren[id];
        if (roomInfo.hasOwnProperty("ref")) {
            relation[SPINAL_RELATION_TYPE].push({
                from: id,
                relationName: "HasReference",
                to: roomInfo["ref"]
            });
        }

        roomInfo["equipment"].forEach(equipmentId => {
            relation[SPINAL_RELATION_LST_PTR_TYPE].push({
                from: id,
                relationName: "RoomHasEquipment",
                to: equipmentId
            });
        })
    };

    const createNodes = () => {
        jsonGraph[JSON_STARTING_NODE_NAME] = 1;
        jsonGraph[JSON_NODES_INFO_NAME].push({ type: "SpinalGraph", id: 1 });
        jsonGraph[JSON_NODES_INFO_NAME].push({ type: "SpinalContext", id: 2 });
        for (let i = 3; i < 20; i++) {
            jsonGraph[JSON_NODES_INFO_NAME].push({ type: "SpinalNode", id: i });
        }
    };

    const createRelation = () => {
        initRelation();
        initGraphRelation();
        initContextRelation();
        initBuildingRelation();
        for (let id in floorsChildren) {
            if (floorsChildren.hasOwnProperty(id)) {
                initFloorRelation(id)
            }
        }

        for (let id in roomChildren) {
            if (roomChildren.hasOwnProperty(id)) {
                initRoomRelation(id)
            }
        }
    };

    initJSON();
    createNodes();
    createRelation();
    jsonGraph[JSON_RELATIONS_NAME] = relation;
    return jsonGraph;

};


export {
    initDummyJsonGraph,
    importGraph,
    exportGraph
}