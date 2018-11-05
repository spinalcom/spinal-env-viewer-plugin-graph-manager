<template>
    <tools-bar :buttons="buttons" :classes="classes"></tools-bar>
</template>

<script>
    import ToolsBar from "./ToolsBar.vue";
    export default {
        name: "SideBar",
        components: {ToolsBar},
        props:{
            buttons: {
                type: Array,
                required: true,
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

</style>