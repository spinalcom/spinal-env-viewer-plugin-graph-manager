<template>
    <div id="colorItem" :style="style">

    </div>
</template>

<script>
    export default {
        name: "ColorMaker",
        props: {
            color: {
                type: String,
                default: function () {
                    return "";
                }
            }
        },
        data: function () {
            return {
                style: ''
            }
        },
        methods: {
            getStyle: function () {
                if (this.color !== "")
                    this.style = "background:" + this.color + "; width: 15px";
                else
                    this.style = "width: 15px";
            }
        },
        watch: {
            style: {
                handler: 'getStyle',
                immediate: true
            }
        }
    }
</script>

<style scoped>

</style>