<template>
    <div>
        <!-- Badge button-->
        <md-badge
                :md-content="badge_content.label"
                v-if="badge_content.label.length > 0"
                :class="{background: badge_content.backgroundColor, color:  badge_content.font_color}"
        >
            <base-icon-button :button-info="button" @click="$emit('click')"/>
        </md-badge>

        <!-- Normal button -->
        <base-icon-button :button-info="button" @click="$emit('click')" v-else/>
    </div>
</template>

<script>

    import BaseIconButton from "./BaseIconButton.vue";

    export default {
        name: "BaseBadgeIconButton",
        components: {BaseIconButton},
        props: {
            button: {
                type: Object,
                required: true,
            },
            badge_content: {
                type: Object,
                default: function(){
                    return {
                        label: "",
                        font_color: "#FFF",
                        backgroundColor: "#ff3e3e",
                    }
                }
            }
        }

    }
</script>

<style scoped>

</style>