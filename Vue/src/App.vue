<template>
    <div id="app">
        <div>
            <top-bar :buttons="topBarButton"/>
        </div>
        <div id="graph_body">
            <side-bar :buttons="sidBarButton"/>
            <nodes-list :nodes="nodes"/>
        </div>
    </div>
</template>

<script>

    import NodesList from "./components/Nodes/NodesList.vue";
    import TopBar from "./components/ToolsBar/TopBar";
    import SideBar from "./components/ToolsBar/SideBar";
    import {mapState} from 'vuex'

    export default {
        name: 'app',
        components: {
            SideBar,
            TopBar,
            NodesList,
        },
        computed: mapState([
            'topBarButton',
            'sidBarButton',
            'nodes'
        ]),

    }

</script>

<style>
    #app {
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
