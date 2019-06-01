<template>
    <div
        :class="{
            'has-button': button,
            'has-prefix': prefix,
            'has-suffix': suffix,
        }"
        data-test="input-container"
        class="input-container"
    >
        <span v-if="prefix" data-test="input-prefix" class="form__control-prefix">
            {{ prefix }}
        </span>
        <div :class="{ required: required }" data-test="input-label-container" class="form__input-label-container">
            <input
                :id="name"
                ref="input"
                :class="[
                    'form__control-input',
                    {
                        'has-value': hasValue,
                        'form__control-input--error': hasErrorAndSubmitted,
                    },
                ]"
                :type="inputType"
                :name="name"
                :min="min"
                :max="max"
                :value="value"
                :aria-label="ariaLabel"
                :disabled="disabled"
                data-test="input"
                autocomplete="off"
                @input="updateControl($event.target.value)"
                @blur="blurred"
                @keydown="isBetweenMinMaxNumber"
            />
            <label :for="name" data-test="label" class="form__control-label"> {{ placeholder }}</label>
        </div>
        <span v-if="suffix" data-test="input-suffix" class="form__control-suffix">
            {{ suffix }}
        </span>
        <span
            v-if="isPassword"
            data-test="input-password"
            class="form__control-password-show"
            @click="showPassword(passwordBtnTitle === 'Show')"
        >
            {{ passwordBtnTitle }}
        </span>

        <button
            v-if="button"
            :class="{ 'btn__input--primary': button.primary }"
            data-test="input-button"
            class="btn__input"
        >
            {{ button.text }}
        </button>
    </div>
</template>

<script>
import bus from './../../_store/formBus';

export default {
    name: 'FormInput',
    props: {
        /**
         * Sets aria-label attribute on input.
         */
        ariaLabel: {
            type: String,
            default: '',
        },
        /**
         * Adds a button to input, see examples below.
         */
        button: {
            type: Object,
            required: false,
            default: undefined,
        },
        /**
         * Disable the input
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Set focus on the input
         */
        focus: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * @ignore
         */
        formModuleName: {
            type: String,
            required: true,
            default: '',
        },
        /**
         * @ignore
         */
        hasErrorAndSubmitted: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * @ignore
         */
        hasValue: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
            A minimum length value for the input
        */
        min: {
            type: Number,
            required: false,
            default: 0,
        },
        /**
            A maximum length value for the input
        */
        max: {
            type: Number,
            required: false,
            default: null,
        },
        /**
            The name for the input
        */
        name: {
            type: String,
            required: false,
            default: 'input-text',
        },
        /**
            Input placeholder
        */
        placeholder: {
            type: String,
            required: false,
            default: 'text',
        },
        /**
            A character based prefix, ex: $ or %
        */
        prefix: {
            type: String,
            required: false,
            default: '',
        },
        /**
            ️️@ignore
        */
        required: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
            A character based suffix, ex: $ or %
        */
        suffix: {
            type: String,
            required: false,
            default: '',
        },
        /**
            The type of input you want, ex 'number', 'password'
        */
        type: {
            type: String,
            required: false,
            default: 'text',
        },
        /**
            @ignore
        */
        vuelidate: {
            type: [Object, String],
            required: false,
            default() {
                return {};
            },
        },
        /**
            The value of the input
        */
        value: {
            type: [String, Number],
            required: false,
            default: '',
        },
    },
    data: () => ({
        passwordBtnTitle: 'Show',
        updateType: '',
    }),
    computed: {
        isPassword() {
            return this.type === 'password';
        },
        inputType() {
            return this.updateType || this.type;
        },
    },
    mounted() {
        if (this.focus) {
            this.$refs.input.focus();
        }
        this.updateControl();
    },
    methods: {
        updateControl(value = this.value) {
            if (value === undefined || value === null) {
                return;
            }
            // update v-model in FormControl.vue component

            /**
             This emits to control component when updated. The changed value, and vuelidate information are passed up.

              @event input
              @type {string|array}
             */
            this.$emit('input', value, this.$v.value);
        },
        blurred() {
            bus.$emit(`${this.formModuleName}/elementBlur`, true);
            this.$v.$touch();
        },
        showPassword(showHideTxt) {
            this.updateType = showHideTxt ? 'text' : 'password';
            this.passwordBtnTitle = showHideTxt ? 'Hide' : 'Show';
        },
        /* eslint-disable consistent-return */
        isBetweenMinMaxNumber(e) {
            // make sure a digit was pressed
            if (!e.code.includes('Digit')) {
                return true;
            }

            const currentChar = parseInt(e.key);
            const currentInputValue = this.$refs.input.value;
            const combinedTotal = parseInt(currentInputValue + currentChar);

            if (this.max && combinedTotal > this.max) {
                // make sure the combined total is more than max
                this.$refs.input.value = currentChar;
                e.preventDefault();
            } else if (this.min >= 0) {
                // make sure the combinedTotal is less than min
                if (!currentInputValue && currentChar < this.min) {
                    this.$refs.input.value = this.min;
                    e.preventDefault();
                }
            }
        },
        /* eslint-enable consistent-return */
    },
    validations() {
        return this.vuelidate;
    },
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
/* stylelint-disable declaration-no-important */

.form__input-label-container {
    position: relative;
    width: 100%;

    &.required::after {
        color: color('red');
        content: '*';
        font-weight: bold;
        position: absolute;
        right: 1.2rem;
        top: 1.5rem;
    }
}

.input-container {
    position: relative;

    &.has-button {
        display: flex;

        .form__control-input {
            border-bottom-right-radius: 0;
            border-top-right-radius: 0;
        }
    }

    &.has-prefix {
        display: flex;

        .form__control-input {
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
        }
    }

    &.has-suffix {
        display: flex;

        .form__control-input {
            border-bottom-right-radius: 0;
            border-top-right-radius: 0;
        }
    }
}

.form__control {
    &-password-show {
        color: color('blue');
        cursor: pointer;
        font-size: 1.4rem;
        font-weight: bold;
        position: absolute;
        right: 1.6rem;
        text-decoration: underline;
        top: 1.3rem;
    }

    &-input {
        background-color: rgba(#fff, 0.8);
        border: $input-default-border;
        border-radius: $border-radius;
        color: color('base');
        display: block;
        font-family: inherit;
        font-size: 1.6rem;
        height: $input-height;
        padding-left: 1rem;
        transition: border 0.2s;
        width: 100%;

        &:hover {
            border: $input-hover-border;

            &:disabled {
                border: $input-default-border;
                cursor: not-allowed;
            }

            &:disabled ~ .form__control-label {
                cursor: not-allowed;
            }

            &.form__control-input--error {
                border: $input-error-border;
            }
        }

        &:focus {
            box-shadow: 0 1.6rem 3.2rem rgba-color('grey', 0.1);
            outline: none;

            &:not(.form__control-input--error) {
                border: $input-focus-border;
            }
        }

        &:disabled {
            opacity: 0.3;
        }

        &.has-value {
            padding-top: 1.2rem;
        }

        &--error {
            border: $input-error-border;
            color: color('red') !important;
        }

        &--error + .form__control-label {
            color: color('red');
        }

        &.has-value + .form__control-label {
            transform: translateY(-36px) scale(0.8);
        }
    }

    &-label {
        color: color('grey');
        cursor: text;
        font-size: $input-label-font-size;
        left: 1.1rem;
        position: absolute;
        transform: translateY(-26px);
        transform-origin: 0 0;
        transition: all 0.2s ease;
        will-change: transform;
    }

    &-prefix,
    &-suffix {
        align-items: center;
        background-color: color('light-grey');
        border: $input-default-border;
        color: darken(color('light-grey'), 30%);
        display: flex;
        font-size: 1.3rem;
        height: $input-height;
        justify-content: center;
        min-width: 3.8rem;
        padding: 0 0.5em;
    }

    &-prefix {
        border-bottom-left-radius: $border-radius;
        border-right: none;
        border-top-left-radius: $border-radius;
    }

    &-suffix {
        border-bottom-right-radius: $border-radius;
        border-left: none;
        border-top-right-radius: $border-radius;
    }
}

.btn__input {
    background-color: color('grey');
    border: none;
    border-bottom-right-radius: $border-radius;
    border-top-right-radius: $border-radius;
    color: #fff;
    cursor: pointer;
    font-size: 1.4rem;
    padding: 0 1.6em;

    &--primary {
        background-color: color('blue');
    }

    &:focus {
        outline: none;
    }
}
</style>
