<template>
    <tools-bar :buttons="buttons" :classes="classes"></tools-bar>
</template>

<script>
    import ToolsBar from "./ToolsBar.vue";
    export default {
        name: "TopBar",
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
                        size:   "500px"
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>