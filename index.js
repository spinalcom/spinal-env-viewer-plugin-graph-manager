import GraphManagerVue from "spinal-env-viewer-plugin-graph-manager-vue"
function GraphManagerPanel(viewer, container, id, title, options) {
    this.viewer = viewer;
    Autodesk.Viewing.UI.DockingPanel.call(this, container, id, title, options);

    // the style of the docking panel
    // use this built-in style to support Themes on Viewer 4+
    this.container.classList.add('docking-panel-container-solid-color-a');
    this.container.style.top = "10px";
    this.container.style.left = "10px";
    this.container.style.width = "auto";
    this.container.style.height = "auto";
    this.container.style.resize = "auto";

    // this is where we should place the content of our panel
    var div = document.createElement('div');
    GraphManagerVue.Component.$mount(div);
    this.container.appendChild(div);
    // and may also append child elements...

}

GraphManagerPanel.prototype = Object.create(Autodesk.Viewing.UI.DockingPanel.prototype);
GraphManagerPanel.prototype.constructor = GraphManagerPanel;

const GraphManager = class {
    constructor(viewer, options) {
        Autodesk.Viewing.Extension.call(this, viewer, options);
        this.cfg = {};
        this.cfg.toolbar = {
            icon: "done", // icon name from material
            label: "label",
            subToolbarName: "spinalcom"
        };
    }
    load() {

        if (this.viewer.toolbar) {
            // Toolbar is already available, create the UI
            this.createUI();
        } else {
            // Toolbar hasn't been created yet, wait until we get notification of its creation
            this.onToolbarCreatedBinded = this.onToolbarCreated.bind(this);
            this.viewer.addEventListener(av.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
        }
        return true;
    }
    unload() {
        this.viewer.toolbar.removeControl(this.subToolbar);
        return true;
    }
    onToolbarCreated   () {
        this.viewer.removeEventListener(av.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
        this.onToolbarCreatedBinded = null;
        this.createUI();
    };

    createUI() {
        var viewer = this.viewer;
        var panel = this.panel;

        // button to show the docking panel
        var toolbarButtonShowDockingPanel = new Autodesk.Viewing.UI.Button('Graph Manager');
        toolbarButtonShowDockingPanel.onClick = function (e) {
            // if null, create it
            if (panel == null) {
                panel = new GraphManagerPanel(viewer, viewer.container,
                    'Graph Manager', 'Graph Manager');
            }
            console.log("hello lo");
            // show/hide docking panel
            panel.setVisible(!panel.isVisible());
        };
        // myAwesomeToolbarButton CSS class should be defined on your .css file
        // you may include icons, below is a sample class:
        /*
        .myAwesomeToolbarButton {
            background-image: url(/img/myAwesomeIcon.png);
            background-size: 24px;
            background-repeat: no-repeat;
            background-position: center;
        }*/
        toolbarButtonShowDockingPanel.addClass('GraphManagerButton');
        toolbarButtonShowDockingPanel.setToolTip('Graph Manager');

        // SubToolbar
        this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('Graph');
        this.subToolbar.addControl(toolbarButtonShowDockingPanel);

        viewer.toolbar.addControl(this.subToolbar);
    }
};

export default (function() {
    Autodesk.Viewing.theExtensionManager.registerExtension('GraphManager', GraphManager);

    window.spinal.ForgeExtentionManager.addExtention('GraphManager');
})();