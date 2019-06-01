<template>
    <div class="select-container">
        <select
            :id="name"
            ref="select"
            :type="type"
            :name="name"
            :value="value"
            :aria-label="ariaLabel"
            :disabled="disabled"
            :class="['form__control-select', { 'form__control-select--error': hasErrorAndSubmitted }]"
            data-test="select"
            @input="updateControl($event.target.value)"
            @blur="blurred"
        >
            <option v-if="defaultValue" data-test="select-default-option" value="" disabled>{{ defaultValue }}</option>
            <option v-for="item in selectItems" :key="item" :value="item" data-test="select-option">{{ item }}</option>
        </select>
        <svg
            class="select__arrow"
            height="5"
            name="caret--down"
            role="img"
            viewBox="0 0 10 5"
            width="10"
            aria-label="open select options"
            alt="open select options"
        >
            <title>open list of options</title>
            <path d="M10 0L5 5 0 0z" />
        </svg>
    </div>
</template>

<script>
import bus from './../../_store/formBus';

export default {
    props: {
        ariaLabel: {
            type: String,
            required: false,
            default: '',
        },
        button: {
            type: Object,
            required: false,
            default() {
                return {};
            },
        },
        defaultValue: {
            type: String,
            required: false,
            default: 'Default',
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        focus: {
            type: Boolean,
            required: false,
            default: false,
        },
        name: {
            type: String,
            required: false,
            default: 'input-text',
        },
        placeholder: {
            type: String,
            required: false,
            default: 'text',
        },
        prefix: {
            type: String,
            required: false,
            default: '',
        },
        required: {
            type: Boolean,
            required: false,
            default: false,
        },
        suffix: {
            type: String,
            required: false,
            default: '',
        },
        selectItems: {
            type: Array,
            required: true,
            default() {
                return [];
            },
        },
        type: {
            type: String,
            required: false,
            default: 'text',
        },
        vuelidate: {
            type: [Object, String],
            required: false,
            default() {
                return {};
            },
        },
        formModuleName: {
            type: String,
            required: true,
        },
        hasErrorAndSubmitted: {
            type: Boolean,
            required: true,
        },
    },
    data: () => ({
        value: '',
    }),
    created() {
        if (!this.defaultValue) {
            this.value = this.selectItems[0];
        }
    },
    mounted() {
        if (this.focus) {
            this.$refs.select.focus();
        }
        this.updateControl();
    },
    methods: {
        updateControl(value = '') {
            this.value = value;
            this.$emit('input', value, this.$v.value);
        },
        blurred() {
            bus.$emit(`${this.formModuleName}/elementBlur`, true);
            this.$v.$touch();
        },
    },
    validations() {
        return this.vuelidate;
    },
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss">
.form__control {
    .select-container {
        position: relative;
    }

    &-select {
        appearance: none;
        background-color: #fff;
        border: $input-default-border;
        border-radius: 0.6rem;
        box-shadow: none;
        color: #444;
        cursor: pointer;
        font-size: $input-label-font-size;
        height: $input-height;
        line-height: 1.5;
        outline: none;
        padding-left: 1.6rem;
        position: relative;
        transition: border 0.2s;
        width: 100%;

        &:focus {
            border: $input-focus-border;
            box-shadow: 0 1.6rem 3.2rem rgba-color('grey', 0.1);
            outline: none;
        }

        &:hover {
            border: $input-hover-border;

            &.form__control-select--error {
                border: $input-error-border;
            }
        }
    }

    .select__arrow {
        border-left: 1px solid color('medium-grey');
        fill: color('blue');
        height: 66%;
        padding-left: 1.7rem;
        pointer-events: none;
        position: absolute;
        right: 2.2rem;
        top: 0.8rem;
        width: 2.6rem;
    }

    &-select--error {
        border: $input-error-border;
        color: color('red');

        ~ .select__arrow {
            border-left: 1px solid color('red');
            fill: color('red');
        }
    }
}
</style>
