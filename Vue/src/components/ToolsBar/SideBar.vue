<template>
    <tools-bar class="sideBar"
               :buttons="buttons"
               :classes="classes"
               :option="option"
    />
</template>

<script>
    import ToolsBar from "./ToolsBar.vue";
    export default {
        name: "sideBar",
        components: {ToolsBar},
        props:{
            buttons: {
                type: Array,
                required: true,
            },
            option: {
                type: Object,
                required: true
            }
        },
        data: function () {
            return {
                classes: {
                    a: {
                        float: "left",
                        size:   "500px"
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .sideBar{
        border: 2px solid;
        height: 100%;
        width: 50px;
    }
</style>