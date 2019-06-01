<template>
    <div class="form__control">
        <FormLabel v-if="control.label" :label="control.label" />
        <component
            :is="componentType()"
            v-model="control.value"
            :name="control.name"
            :min="control.min"
            :max="control.max"
            :aria-label="control.ariaLabel"
            :button="control.button"
            :prefix="control.prefix"
            :suffix="control.suffix"
            :inline="control.inline"
            :type="controlType"
            :required="requiredInput"
            :disabled="control.disabled"
            :flex-width="control.flexWidth"
            :validators="control.validators"
            :vuelidate="validators"
            :form-module-name="formModuleName"
            :placeholder="control.placeholder"
            :focus="control.focus"
            :default-value="control.controlType && control.controlType.defaultValue"
            :select-items="control.controlType && control.controlType.items"
            :has-error-and-submitted="hasErrorsAndSubmitted"
            :has-value="hasValue"
            data-test="component"
            @input="controlUpdated"
        />
        <FormErrors v-if="hasErrorsAndSubmitted" :error-message="errorMsg" />
    </div>
</template>

<script>
import { required, minLength, maxLength, between, numeric, email } from 'vuelidate/lib/validators';
import FormErrors from '../FormErrors/FormErrors.vue';
import FormInput from '../FormInput/FormInput.vue';
import FormLabel from '../FormLabel/FormLabel.vue';
import FormRadioCheck from '../FormRadioCheck/FormRadioCheck.vue';
import FormSelect from '../FormSelect/FormSelect.vue';
import FormTextArea from '../FormTextArea/FormTextArea.vue';
import bus from '../../_store/formBus.js';

export default {
    name: 'FormControl',
    components: {
        FormLabel,
        FormErrors,
        FormInput,
        FormRadioCheck,
        FormSelect,
        FormTextArea,
    },
    props: {
        control: {
            type: Object,
            required: true,
        },
        formModuleName: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            errorMsg: '',
            submitted: false,
            hasErrors: false,
        };
    },
    computed: {
        requiredInput() {
            const { validators } = this.control;
            return (
                validators && validators.map(i => i.validator).includes('required') && this.controlType !== 'password'
            );
        },
        hasValue() {
            const { value } = this.control;
            // need to make sure a string of '0' is still true!
            return !!value || parseInt(value) === 0;
        },
        hasErrorsAndSubmitted() {
            /* eslint-disable vue/no-side-effects-in-computed-properties */
            bus.$on(`${this.formModuleName}/hasBeenSubmitted`, () => {
                this.submitted = bus[this.formModuleName].hasBeenSubmitted;
            });
            /* eslint-enable */
            return this.hasErrors && this.submitted;
        },
        controlTag() {
            return (this.control.controlType && this.control.controlType.controlTag) || 'input';
        },
        controlType() {
            return (this.control.controlType && this.control.controlType.type) || 'text';
        },
    },
    created() {
        this.validators = this.setValidators();
        this.hasErrors = this.checkIfErrors();
    },
    methods: {
        controlUpdated(value, errors = {}) {
            this.$emit('change', value);
            this.$nextTick(() => {
                /* eslint-disable no-restricted-syntax, guard-for-in */
                // @todo does this need to be a `for in` or could it be Object.{keys,values,entries}?

                for (const err in errors) {
                    // using vuelidate, validators do not have a `$` in them, and are invalid when false.
                    if (!err.includes('$') && !errors[err]) {
                        this.errorMsg = this.getMsg(err, errors.$params);
                    } else if (!errors.$invalid) {
                        this.errorMsg = '';
                    }
                }
                this.updateErrors({
                    hasError: errors.$invalid,
                });
                /* eslint-enable */
            });
        },
        updateErrors({ hasError }) {
            // hasError is equal to the $invalid prop on a input
            bus[this.formModuleName].controlsWithValidations[this.control.name] = hasError;

            this.hasErrors = this.checkIfErrors();
        },
        checkIfErrors() {
            // const validationControls =
            //     bus[this.formModuleName].controlsWithValidations;
            const validationControls = bus[this.formModuleName].controlsWithValidations;

            if (validationControls.length) {
                return false;
            }

            // if this validation control is true, this control is invalid/has an error
            return !!validationControls[this.control.name];
        },
        componentType() {
            let component;

            const components = {
                default: 'FormInput',
                radiocheck: 'FormRadioCheck',
                select: 'FormSelect',
                textarea: 'FormTextArea',
            };

            // if controlTag is an input, we need to set what type of input
            if (this.controlTag === 'input') {
                if (this.controlType === 'radio' || this.controlType === 'checkbox') {
                    component = 'radiocheck';
                } else {
                    component = 'default';
                }
            } else {
                component = this.controlTag;
            }

            return components[component];
        },
        getMsg(error, { maxLength: inputMaxLength, minLength: inputMinLength }) {
            // set our min, max numbers if they exist
            const max = inputMaxLength ? inputMaxLength.max : undefined;
            const min = inputMinLength ? inputMinLength.min : undefined;

            const messages = {
                required: 'Required field',
                email: 'Valid email required',
                numeric: 'Numbers only',
                maxLength: `Maximum ${max} characters`,
                minLength: `Minimum of ${min} characters`,
            };
            return messages[error];
        },
        setValidators() {
            const controlValidators = this.control.validators;
            if (!controlValidators || !controlValidators.length) {
                return {
                    value: '',
                };
            }

            // set validators to what it's name is and look up the vuelidate function
            const validatorsAsObj = controlValidators.reduce((obj, item) => {
                obj[item.validator] = this.getValidator(item);
                return obj;
            }, {});

            // return what vuelidate library needs to connect to our control data
            return {
                value: validatorsAsObj,
            };
        },

        // set single validator to function that is in our array of validators
        getValidator({ validator, amount }) {
            const validatorsNames = {
                minLength: minLength(amount),
                required,
                numeric,
                email,
                maxLength: maxLength(amount),
                between: between(amount),
            };

            return validatorsNames[validator];
        },
    },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss" type="text/scss">
.form {
    &__control {
        position: relative;
        width: 100%;

        &,
        &:only-child {
            margin-bottom: 1.2rem;
        }
    }
}
</style>
