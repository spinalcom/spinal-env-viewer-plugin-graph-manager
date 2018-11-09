<template>
    <div>
        <md-button class="md-icon-button md-primary" @click="$emit('click')" v-if="buttonInfo.icon_type === 'in' ">
            <md-tooltip md-delay="300" :md-direction="toolTipDirection" v-if="buttonInfo.toolTip.length > 0">
                {{buttonInfo.toolTip}}
            </md-tooltip>
            <md-icon>
                {{buttonInfo.icon}}
            </md-icon>
        </md-button>
        <md-button class="md-icon-button md-primary"  @click="$emit('click')" v-else-if="buttonInfo.icon_type === 'class' ">
            <md-tooltip md-delay="300" :md-direction="toolTipDirection" v-if="buttonInfo.toolTip.length > 0">
                {{buttonInfo.toolTip}}
            </md-tooltip>
            <md-icon :class="buttonInfo.icon"/>
        </md-button>
        <md-button class="md-icon-button md-primary"  @click="$emit('click')" v-else>
            <md-tooltip md-delay="300" :md-direction="toolTipDirection" v-if="buttonInfo.toolTip.length > 0">
                {{buttonInfo.toolTip}}
            </md-tooltip>
            <md-icon :md-src="buttonInfo.icon"/>
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

                    return button.hasOwnProperty("backgroundColor")
                    && button.hasOwnProperty('fontColor')
                    && button.hasOwnProperty('icon')
                    && button.hasOwnProperty("toolTip")
                    && button.hasOwnProperty('icon_type');
                }
            },
            toolTipDirection: {
                type: String,
                default: "right"
            }
        },

    }
</script>

<style scoped>

</style>