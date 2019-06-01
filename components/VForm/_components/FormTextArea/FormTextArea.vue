<template>
    <div :class="{ 'has-max-length': maxLength }" class="textarea-container">
        <div
            :class="{ required: required }"
            class="form__textarea-label-container"
            data-test="textarea-label-container"
        >
            <textarea
                :id="name"
                ref="textarea"
                :class="{
                    'has-value': hasValue,
                    'form__control-textarea--error': hasErrorAndSubmitted,
                }"
                :type="type"
                :name="name"
                :value="value"
                :aria-label="ariaLabel"
                :disabled="disabled"
                :maxlength="maxLength"
                data-test="textarea"
                autocomplete="off"
                class="form__control-textarea"
                @input="updateControl($event.target.value)"
                @blur="blurred"
            />
            <label :for="name" data-test="label" class="form__control-label">
                {{ placeholder }}
            </label>
        </div>
        <div v-if="maxLength" data-test="textarea-maxlength" class="form__control-maxlength">
            {{ !value.length ? maxLength : maxLength - value.length }}
        </div>
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
        formModuleName: {
            type: String,
            required: true,
        },
        hasErrorAndSubmitted: {
            type: Boolean,
            required: false,
            default: false,
        },
        hasValue: {
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
        required: {
            type: Boolean,
            required: false,
            default: false,
        },
        type: {
            type: String,
            required: false,
            default: 'text',
        },
        validators: {
            type: Array,
            required: false,
            default() {
                return [];
            },
        },
        value: {
            type: [String, Number],
            required: false,
            default: '',
        },
        vuelidate: {
            type: [Object, String],
            required: false,
            default() {
                return {};
            },
        },
    },
    computed: {
        maxLength() {
            if (!this.validators) {
                return undefined;
            }

            const hasMax = this.validators.find(i => i.validator === 'maxLength');

            return hasMax && hasMax.amount;
        },
    },
    mounted() {
        if (this.focus) {
            this.$refs.textarea.focus();
        }
        // this will initialize validations
        this.updateControl();
    },
    methods: {
        updateControl(value = this.value) {
            // update v-model in FormControl.vue component, with value, and vuelidate errors
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

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
/* stylelint-disable declaration-no-important */

.form__textarea-label-container {
    position: relative;
    width: 100%;

    &.required::after {
        color: color('red');
        content: '*';
        font-size: 12px;
        font-weight: bold;
        position: absolute;
        right: 13px;
        top: 13px;
    }
}

.textarea-container {
    &.has-max-length {
        margin-bottom: 3rem;
    }
}

.form__control {
    &-textarea {
        background-color: rgba(#fff, 0.7);
        border: $input-default-border;
        border-radius: $border-radius;
        color: color('base');
        display: block;
        font-family: inherit;
        font-size: 1.6rem;
        height: 100%;
        margin: -1px;
        min-height: $input-height * 2;
        padding-left: 1.1rem;
        padding-top: 1.1rem;
        resize: none;
        transition: border 0.3s;
        width: 100%;

        &:hover {
            border: $input-hover-border;

            &:disabled {
                border: 1px solid color('grey');
                cursor: not-allowed;
            }

            &:disabled ~ .form__control-label {
                cursor: not-allowed;
            }

            &.form__control-textarea--error {
                border: $input-error-border;
            }
        }

        &:focus {
            box-shadow: 0 1.6rem 3.2rem rgba-color('grey', 0.1);
            outline: none;
        }

        &:focus:not(.form__control-textarea--error) {
            border: $input-focus-border;
        }

        &:disabled {
            opacity: 0.3;
        }

        &:focus.input:not(.input--error) {
            outline: none;
        }

        &.has-value {
            padding-top: 2rem;
        }

        &--error {
            border: 1px solid color('red');
            color: color('red') !important;
        }

        &--error + .form__control-label {
            color: color('red');
        }

        &.has-value + .form__control-label {
            transform: translateY(-72px) scale(0.8);
        }
    }

    &-label {
        color: color('grey');
        font-size: $input-label-font-size;
        left: 1.1rem;
        position: absolute;
        transform: translateY(-66px);
        transform-origin: 0 0;
        transition: all 0.2s ease;
        will-change: transform;
    }

    &-maxlength {
        color: color('grey');
        font-size: 1em;
        margin-top: 0.4rem;
        position: absolute;
    }
}
</style>
