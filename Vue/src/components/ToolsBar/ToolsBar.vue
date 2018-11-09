<template>
    <div>
        <div v-for="(b, index) in buttons" v-bind:key="index">
            <a :style="classes.a">
                <base-badge-icon-button
                        :button="b.button"
                        :badge_content="b.badge_content"
                        @click="b.button.action(option)"
                />
            </a>
        </div>
    </div>
</template>

<script>
    import BaseBadgeIconButton from "../Button/BaseBadgeIconButton.vue";

    export default {
        name: "ToolsBar",
        components: {BaseBadgeIconButton},
        props: {
            buttons: {
                type: Array,
                required: true,
            },
            classes: {
                type: Object,
                default: function () {
                    return {
                        a: {
                            float: "left",
                            size:   "500px"
                        }
                    }
                }
            },
            option: {
                type:Object
            }
        }
    }
</script>

<style scoped>

</style>