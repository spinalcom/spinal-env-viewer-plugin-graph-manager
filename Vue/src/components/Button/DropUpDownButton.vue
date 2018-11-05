<template>
    <div>
        <md-button class="md-icon-button md-primary"  v-on:click="click" >
            <md-icon>
                {{icon}}
            </md-icon>
        </md-button>
    </div>
</template>

<script>
    import BaseIconButton from "./BaseIconButton.vue";

    export default {
        name: "DropUpDownButton",
        components: {BaseIconButton},
        props: {
            opened: {
                type: Boolean,
                default: function () {
                    return false;
                }
            },
            click: {
                type: Function,
                default: function () {
                    return;
                }
            }
        },
        watch: {
            opened: {
                handler: 'changeIcon',
                immediate: true
            }
        },
        data: function () {
            return {
                icon: "arrow_drop_up",
            }
        },
        methods: {
            changeIcon: function (value) {
                this.icon = value ? "arrow_drop_up" : "arrow_drop_down";
            }
        }
    }
</script>

<style scoped>

</style>