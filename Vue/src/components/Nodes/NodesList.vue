<template>
    <div class="items">
        <node-item class="item"
                   v-for="(node, index) in nodes"
                   :key="'node' + index"
                   :info="node.info"
                   :children="node.children"
                   :context="node.context"
                   @node-selected="$emit('node-selected', $event)"
        />
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
        },
        methods: {
            item: function(event){
                console.log(event)
            }
        }
    }
</script>

<style scoped>
    .items {
        width: 100%;
        border: 2px solid;
    }
</style>