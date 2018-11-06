/**
 *This file is a demonstration about how to create a context and how to use it.
 */


const SpinalGraphLib = require("../build/index");
require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;


//We just initialize a new graph without any element and a default type.
const spinalGraph = new SpinalGraphLib.SpinalGraph();

//We create a basic model which will be our element for our future context.
const element = new globalType.Model();
const elementName = "Tutorial Element";
//We are giving a name to our element in order to recognize it.
element.add_attr({
    name: elementName
});

const contextType = "Tutorial type";
const contextName = "Tutorial Context";
//We are creating a new spinal context with a type and an element.
const spinalContext = new SpinalGraphLib.SpinalContext(contextType, contextName, element);

//We are adding the context to the graph.
spinalGraph.addContext(spinalContext);

//let get back our context.
const childPromise = spinalGraph.getContext(contextName);
childPromise.then(child => {

    if (!child.info.hasOwnProperty("name") || child.info.name.get() !== contextName) {
        console.error("hum something is wrong please notify this problem to the maintainer of the graph.")
    }
    else {
        console.log("ok we have our context");
        //Do something meaningful with your context
    }

    const childElementPromise = child.getElement();

    childElementPromise.then(el => {
        if (el.name.get() !== elementName) {
            console.error("hum something is wrong please notify this problem to the maintainer of the graph.")
        }
        else {
            console.log("ok we have our element")
            //Do something meaningful with your element
        }
    }).catch(() => {
        console.error("hum something is wrong please notify this problem to the maintainer of the graph.")
    });

});
