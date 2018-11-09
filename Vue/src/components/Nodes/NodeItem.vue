<template>
    <div>
        <node-header
                class="node-header"
                :has-child="children.length > 0"
                :display-children="displayChildren"
                :hide-bim-object="hideBIMObject"
                :info="info"
                :opened="opened"
                @node-selected="$emit('node-selected', context)"
        />
        <ul class="children" v-if="opened">
            <li v-for="child in children">
                <node-item :info="child.info" :children="child.children" :context="child.context" @node-selected="$emit('node-selected', child.context)"/>
            </li>
        </ul>
    </div>
</template>

<script>
    import DropUpDownButton from "../Button/DropUpDownButton.vue";
    import BaseIconButton from "../Button/BaseIconButton.vue";
    import ColorMaker from "../ColorMarker/ColorMaker.vue";
    import NodeHeader from "./NodeHeader.vue";

    export default {
        name: "NodeItem",

        components: {NodeHeader, ColorMaker, BaseIconButton, DropUpDownButton},
        data: function () {
            return {
                opened: false
            }
        },

        props: {
            info: {
                type: Object,
                required: true,
            },
            context: {
                type: Object,
                required: true
            },
            children: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },

        methods: {
            displayChildren: function () {
                this.opened = !this.opened;

            },
            hideBIMObject: function () {
                console.log("hide bim object");
            },
            logChild: function (child) {
                console.log("vue child", child)

            },
            onSelectedNode: function () {
                this.onClick(this.context);
            }
        },


    }
</script>

<style scoped>

    #hideObjectEye {
        float: left;
    }

    ul {
        width: 100%;
        list-style-type: none;
    }

    .node-header {
        border: 2px solid;
    }
</style>