<template>
    <div>
        <md-button class="md-icon-button md-primary" v-on:click="click">
            <md-tooltip md-delay="300" :md-direction="toolTipDirection" v-if="buttonInfo.toolTip.length > 0">
                {{buttonInfo.toolTip}}
            </md-tooltip>
            <md-icon>
                {{buttonInfo.icon}}
            </md-icon>
        </md-button>
    </div>
</template>

<script>
    export default {
        name: "BaseIconButton",
        props: {
            buttonInfo: {
                type: Object,
                required: true,
                validator: function (button) {
                    return button.hasOwnProperty("icon")
                        && button.hasOwnProperty("toolTip")
                }
            },
            toolTipDirection: {
                type: String,
                default: "right"
            },
            click: {
                type: Function,
                required: true
            }
        },

    }
</script>

<style scoped>

</style>