<template>

    <md-list>
        <div class="items" v-for="(node, index) in nodes" :key="'node' + index">
            <node-item :info="node.info" :children="node.children"></node-item>
        </div>
    </md-list>

</template>

<script>
    import NodeItem from "./NodeItem.vue";
    export default {
        name: "NodesList",
        components: {NodeItem},
        props:{
            nodes: {
                type: Array,
                default: function () {
                    return []
                }
            }
        }
    }
</script>

<style scoped>

</style>