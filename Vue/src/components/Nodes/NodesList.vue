<template>

    <div class="items">
        <node-item class="item"
                   v-for="(node, index) in nodes"
                   :key="'node' + index"
                   :info="node.info"
                   :children="node.children"/>

    </div>

</template>

<script>
    import NodeItem from "./NodeItem.vue";

    export default {
        name: "NodesList",
        components: {NodeItem},
        props: {
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
    .items {
        width: 100%;
    }
</style>