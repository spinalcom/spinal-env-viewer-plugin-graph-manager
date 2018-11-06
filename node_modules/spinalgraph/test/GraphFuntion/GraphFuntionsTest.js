const lib = require("../../build/index");
const assert = require("assert");
describe("How to use the function dedicated to the graph", function () {
    it("should return a json", async function () {

        const json = lib.GraphFunction['initDummyJsonGraph']();
        const startingNode = new lib.SpinalNode();
        const graph = lib.GraphFunction['importGraph'](json);
        //console.log(graph.getElement('1').relationListTypeSpinalRelation.getElement("hasContext").getChildrenIds())
        const js = await lib.GraphFunction['exportGraph'](graph.get('1'), {});

        for (let key in js) {
            if (js.hasOwnProperty(key)) {
                assert.equal(js.hasOwnProperty(key), json.hasOwnProperty(key));
                if (js[key] instanceof Array) {
                    for (let i = 0; i < js[key].length; i++) {
                        assert(json[key].includes(js[key][i]), "Every object of js should be in json");
                    }
                    assert.equal(js[key], json[key]);
                    assert.equal(js[key].length, json[key].length);
                }
                else {
                    console.log(js[key]);
                    for (let k in js[key]) {
                        if (js[key].hasOwnProperty(k)) {
                            assert.equal(js[key][k], json[key][k]);
                        }
                    }

                }
            }
        }


        /*  console.log(json);
                 console.log(newJson);*/

    });
});