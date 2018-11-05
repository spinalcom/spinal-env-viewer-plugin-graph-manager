<template>
    <div class="NodeHeader">
        <drop-up-down-button
                :opened="opened"
                :click="displayChildren"
                v-if="hasChild"
        />
        {{info.name}}
        <base-icon-button
                id="hideObjectEye"
                :button-info="{icon: 'remove_red_eye', toolTip: '' }"
                :click="hideBimObject"
        />
        <color-maker
                :color="info.color"
        />
    </div>
</template>

<script>
    import DropUpDownButton from "../Button/DropUpDownButton";
    import BaseIconButton from "../Button/BaseIconButton";
    import ColorMaker from "../ColorMarker/ColorMaker";
    export default {
        name: "NodeHeader",
        components: {ColorMaker, BaseIconButton, DropUpDownButton},
        props:{
            opened: {
                type: Boolean,
                required: true
            },
            displayChildren:{
                type: Function,
                required: true
            },
            hasChild:{
                type: Boolean,
                required: true
            },
            info: {
                type:Object,
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
    .NodeHeader{
        display: flex;
    }
</style>