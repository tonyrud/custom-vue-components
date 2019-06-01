<template>
    <div
        :class="{ inline: formGroup.inline, 'single-control': singleControl }"
        data-test="form-group"
        class="form__group"
    >
        <FormControl
            v-for="control in formGroup.controls"
            :key="control.name"
            :control="control"
            :form-module-name="formModuleName"
            @change="valueChanged"
        />
    </div>
</template>

<script>
import FormControl from './../FormControl/FormControl.vue';

export default {
    name: 'FormGroup',
    components: {
        FormControl,
    },
    props: {
        formGroup: {
            type: Object,
            required: true,
        },
        formModuleName: {
            type: String,
            required: true,
        },
    },
    computed: {
        singleControl() {
            return this.formGroup.controls.length === 1;
        },
    },
    methods: {
        valueChanged(value) {
            this.$emit('change', value);
        },
    },
};
</script>

<style lang="scss">
.form {
    &__group {
        width: 100%;

        .single-control {
            .form__control {
                margin-bottom: 0;
            }
        }

        &.inline {
            display: inline-flex;
            justify-content: space-between;

            .form__control {
                max-width: 47%;
            }
        }

        &:last-of-type {
            margin-bottom: 1.2rem;
        }
    }
}
</style>
