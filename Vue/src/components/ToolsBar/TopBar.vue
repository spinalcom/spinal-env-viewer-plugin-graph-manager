<template>
    <tools-bar
            class="TopBar"
            :buttons="buttons"
            :classes="classes"
            :option="graph"
    />
</template>

<script>
    import ToolsBar from "./ToolsBar.vue";

    export default {
        name: "topBar",
        components: {ToolsBar},
        props: {
            buttons: {
                type: Array,
                required: true,
            },
            graph:{
                type: Object
            }
        },
        data: function () {
            return {
                classes: {
                    a: {
                        size: "500px"
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .topBar {
        border: 2px solid;
        width: 50px;
    }
</style>