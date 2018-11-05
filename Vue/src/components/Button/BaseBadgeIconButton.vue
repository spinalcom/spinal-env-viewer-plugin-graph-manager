<template>
    <div>
        <!-- Badge button-->
        <md-badge :md-content="badge_content" v-if="badge_content.length > 0">
            <base-icon-button :button-info="button" :click="button.func"/>
        </md-badge>

        <!-- Normal button -->
        <base-icon-button :button-info="button" :click="button.func" v-else/>
    </div>
</template>

<script>

    import BaseIconButton from "./BaseIconButton";

    export default {
        name: "BaseBadgeIconButton",
        components: {BaseIconButton},
        props: {
            button: {
                type: Object,
                required: true,
            },
            badge_content: {
                type: String,
                default: ""
            }
        },

    }
</script>

<style scoped>

</style>