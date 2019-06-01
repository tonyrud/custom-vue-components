<template>
    <div
        :class="[
            'form__radios',
            {
                inline: inline,
                'form__control--error': hasErrorAndSubmitted,
            },
        ]"
        data-test="form-radios"
    >
        <div
            v-for="(item, i) in selectItems"
            :key="item.name"
            :style="{ flex: `0 0 ${flexWidth}` }"
            data-test="form-radio-group"
            class="form__radio-group"
        >
            <input
                :id="`${name}-${i}`"
                ref="input"
                :value="selectItems[i]"
                :name="name"
                :type="type"
                :disabled="item.disabled"
                data-test="radio-input"
                class="form__radio-input"
                @blur="blurred"
                @change="updateControl(selectItems[i].text)"
            />
            <label :for="`${name}-${i}`" data-test="radio-label" class="form__radio-label">
                <span v-if="type === 'radio'" class="form__radio-button" />
                <span v-else class="form__checkbox-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" viewBox="0 0 30 24">
                        <path
                            fill-rule="evenodd"
                            d="M29.2 2.656L26.54 0 10.82 14.28 4.57 8.035 0 12.632l10.547 10.545"
                        />
                    </svg>
                </span>
                {{ item.text }}
            </label>
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
        flexWidth: {
            type: String,
            required: false,
            default: '',
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
            required: true,
        },
        inline: {
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
    },
    data: () => ({
        value: '',
        checkValues: [],
    }),
    mounted() {
        this.updateControl();
    },
    methods: {
        controlClicked(i) {
            this.$refs.input[i].checked = !this.$refs.input[i].checked;
        },
        updateControl(value = '') {
            this.value = value;
            if (value === undefined || value === null) {
                return;
            }
            if (value && this.type === 'checkbox') {
                // if we don't have the current value, add it, else remove it from the array of items
                if (!this.checkValues.includes(value)) {
                    this.checkValues.push(value);
                } else {
                    this.checkValues = this.checkValues.filter(item => item !== value);
                }
                this.$emit('input', this.checkValues, this.$v.value);
            }

            // emit regular value if not a checkbox
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
$width: 1.8rem;

.form {
    &__control--error {
        .form__radios {
            margin-top: 2.2rem;
        }

        .form__label {
            color: color('red');
        }
    }

    &__radios {
        &.inline {
            display: flex;
            flex-wrap: wrap;

            .form__radio-group {
                flex: 0 0 27%;
            }
        }
    }

    &__radio-group {
        align-items: center;
        display: flex;
        margin-bottom: 0.6em;
        position: relative;
        text-align: left;
        text-transform: capitalize;
    }

    &__radio-input {
        clip: rect(0, 0, 0, 0);
        height: 1px;
        left: 5px;
        overflow: hidden;
        position: absolute;
        top: 5px;
        width: 1px;

        &:disabled + .form__radio-label {
            cursor: not-allowed;
            opacity: 0.4;
        }

        &:disabled + .form__radio-label:hover .form__radio-button {
            border: 1px solid color('grey');
        }

        &:checked + .form__radio-label .form__radio-button,
        &:focus + .form__radio-label .form__radio-button {
            border: 5px solid color('blue');
        }

        &:checked + .form__radio-label .form__checkbox-button {
            background-color: color('blue');
            border: none;

            svg {
                opacity: 1;
            }
        }

        &:focus + .form__radio-label .form__checkbox-button {
            border: 2px solid color('blue');
        }
    }

    &__radio-label {
        align-items: center;
        cursor: pointer;
        display: flex;
        position: relative;

        &:hover {
            color: color('blue');
        }

        &:hover .form__radio-button,
        &:hover .form__checkbox-button {
            border: $input-hover-border;
        }
    }

    &__radio-button,
    &__checkbox-button {
        background-color: #fff;
        border: 1px solid color('grey');
        border-radius: 50%;
        height: $width;
        margin-right: 0.8rem;
        position: relative;
        width: $width;
    }

    &__checkbox-button {
        align-items: center;
        border-radius: 3px;
        display: flex;
        justify-content: center;

        svg {
            fill: #fff;
            opacity: 0;
            width: 0.6em;
        }
    }
}
</style>
