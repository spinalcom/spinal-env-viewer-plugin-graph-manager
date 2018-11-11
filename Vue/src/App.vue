<template>
    <div id="app">
        <div>
            <top-bar :buttons="topBarButton"/>
        </div>
        <div id="graph_body">
            <side-bar :buttons="sideBarButton" :option="selectedNode"/>
            <nodes-list @node-selected="onNodeSelected($event)" :nodes="nodes"/>
        </div>
    </div>
</template>

<script>

    import {NodesList, TopBar, SideBar} from "spinal-env-viewer-plugin-graph-manager-vue";
    import {mapState} from 'vuex'

    export default {
        name: 'app',
        components: {
            SideBar,
            TopBar,
            NodesList
        },
        computed: mapState([
            'topBarButton',
            'sideBarButton',
            'nodes',
            'selectedNode'
        ]),
        methods:
            {
                onNodeSelected: function (node) {
                    console.log(this.sideBarButton);
                    this.$store.dispatch("setSelectedNode", node);
                }
            }

    }

</script>

<style scoped>
    .app * {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    #graph_body {
        display: flex;
    }
</style>
