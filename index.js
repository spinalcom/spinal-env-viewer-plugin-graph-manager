import GraphManagerVue from "spinal-env-viewer-plugin-graph-manager-vue";
import GraphManagerCo from "./GraphManager.js";
import { SpinalForgeExtention } from "spinal-env-viewer-panel-manager-service_spinalforgeextention";


const extentions = SpinalForgeExtention.createExtention({
  name: "plugin-graph-manager",
  vueMountComponent: GraphManagerVue.Component,
  toolbar: {
    //TODO find proper icon
    icon: "ballot",
    label: "Graph Manager",
    subToolbarName: "spinalcom"
  },
  panel: {
    title: "Graph Manager",
    className: "plugin-graph-viewer",
    closeBehaviour: "hide"
  },
  style: {
    height: '80vh'
  },
  onLoad: () => {
    new GraphManagerCo(GraphManagerVue.Store);
  }
});
SpinalForgeExtention.registerExtention("plugin-graph-manager", extentions);
