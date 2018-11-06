<template>
    <div class="nodeHeader">
        <drop-up-down-button
                :opened="opened"
                :click="displayChildren"
                v-if="hasChild"
        />
        <div class="name">
            <h3> {{info.name}}</h3>
        </div>
        <base-icon-button
                class="item"
                :button-info="{icon: 'remove_red_eye', toolTip: '' }"
                :click="hideBimObject"
        />
        <color-maker
                :color="info.color"
        />
    </div>
</template>

<script>
    import DropUpDownButton from "../Button/DropUpDownButton.vue";
    import BaseIconButton from "../Button/BaseIconButton.vue";
    import ColorMaker from "../ColorMarker/ColorMaker.vue";

    export default {
        name: "NodeHeader",
        components: {ColorMaker, BaseIconButton, DropUpDownButton},
        props: {
            opened: {
                type: Boolean,
                required: true
            },
            displayChildren: {
                type: Function,
                required: true
            },
            hasChild: {
                type: Boolean,
                required: true
            },
            info: {
                type: Object,
                required: true
            },
            hideBimObject: {
                type: Function,
                required: true,
            }
        }
    }
</script>

<style scoped>
    .nodeHeader {
        display: grid;
        grid-template-columns: auto auto auto auto;
        width: 100%;
    }

    .item {
        text-align: center;
    }

    .name {

        width: 50%;
    }

</style>