<template>
    <label data-test="form-label" class="form__label">
        {{ label }}
    </label>
</template>

<script>
export default {
    name: 'FormLabel',
    props: {
        label: {
            type: String,
            required: false,
            default: '',
        },
    },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss" type="text/scss">
.form__label {
    color: color('base');
    display: block;
    font-weight: 700;
    margin-bottom: 1.2rem;
    text-align: left;
    transition: all 0.1s;
}
</style>
