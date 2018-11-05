<template>
    <!-- <md-list>
         <md-list-item class="NodeItem">
             <drop-up-down-button :opened="opened" :click="displayChildren" v-if="children.length > 0"/>
             {{info.name}}
             <base-icon-button
                     id="hideObjectEye"
                     :button-info="{icon: 'remove_red_eye', toolTip: '' }"
                     :click="hideBIMObject"
             />
             <color-maker :color="info.color"/>

             <div class="children">
                 <div v-if="opened">
                     <md-list slot="md-expand">
                         <div v-for="(child, i) in children" :key="'child node'+ i">
                             <md-list-item>
                                 <node-item :info="child.info" :children="child.children"/>
                             </md-list-item>
                         </div>
                     </md-list>
                 </div>
             </div>
         </md-list-item>
     </md-list>-->

    <ul>
        <li >
            <node-header
                    :has-child="children.length > 0"
                    :display-children="displayChildren"
                    :hide-bim-object="hideBIMObject"
                    :info="info"
                    :opened="opened"
            />
            <ul class="children" v-if="opened">
                <li v-for="child in children">
                    <node-item :info="child.info" :children="child.children"/>
                </li>
            </ul>
        </li>
    </ul>
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
            }
        },


    }
</script>

<style scoped>
    .NodeItem {
        display: flex;
        background: #B3B0B0;
        border: 2px solid #979797;
    }

    #hideObjectEye {
        float: left;
    }
    li{

    }
</style>