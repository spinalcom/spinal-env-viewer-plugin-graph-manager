/*
 * Copyright 2019 SpinalCom - www.spinalcom.com
 *
 *  This file is part of SpinalCore.
 *
 *  Please read all of the following terms and conditions
 *  of the Free Software license Agreement ("Agreement")
 *  carefully.
 *
 *  This Agreement is a legally binding contract between
 *  the Licensee (as defined below) and SpinalCom that
 *  sets forth the terms and conditions that govern your
 *  use of the Program. By installing and/or using the
 *  Program, you agree to abide by all the terms and
 *  conditions stated or referenced herein.
 *
 *  If you do not agree to abide by these terms and
 *  conditions, do not demonstrate your acceptance and do
 *  not install or use the Program.
 *  You should have received a copy of the license along
 *  with this file. If not, see
 *  <http://resources.spinalcom.com/licenses.pdf>.
 */

import {
  GraphManagerVue,
  Store
} from "./src/vue";
import GraphManager from "./src/GraphManager.js";

/*import { SpinalForgeExtention } from "spinal-env-viewer-panel-manager-service_spinalforgeextention";*/

/*
 
 const extentions = SpinalForgeExtention.createExtention({
 name: "plugin-graph-manager",
 vueMountComponent: GraphManagerVue,
 toolbar: {
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
 new GraphManager( Store );
 }
 });
 SpinalForgeExtention.registerExtention("plugin-graph-manager", extentions);
 */

export {
  GraphManagerVue,
  Store,
  GraphManager
}