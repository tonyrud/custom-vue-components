<template>
    <form data-test="form-component" class="form" novalidate @submit.prevent="submitForm">
        <FormGroup
            v-for="item in config"
            :key="item.name"
            :form-group="item"
            :form-module-name="formModuleName"
            @change="valueChanged"
        />
        <slot />
    </form>
</template>

<script>
import FormGroup from './_components/FormGroup/FormGroup.vue';
import bus from './_store/formBus';

export default {
    name: 'VForm',
    components: {
        FormGroup,
    },
    props: {
        /**
         * Pass an array of groups, and controls to render a form.
         */
        config: {
            type: Array,
            required: true,
        },
        /**
         * This is the name of the form, and is used in the event bus for each forms state management
         */
        formName: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            controlsWithValidations: [],
            formModuleName: null,
        };
    },
    created() {
        this.formModuleName = `form-${this.formName}`;
        bus[this.formModuleName] = {
            hasBeenSubmitted: false,
            controlsWithValidations: {},
            hasBeenBlurred: false,
        };

        bus.$on(`${this.formModuleName}/elementBlur`, () => {
            /**
             * Blur event.
             *
             * @event blur
             * @type {boolean}
             */
            this.$emit('blur');
            bus[this.formModuleName].hasBeenBlurred = true;
        });

        // grab all controls and flatten the array
        const controls = this.config.map(group => group.controls);
        const flattenedControls = [].concat(...controls);

        // loop over and grab any controls with validators property
        const validatorControls = flattenedControls.filter(control =>
            Object.prototype.hasOwnProperty.call(control, 'validators'),
        );

        // default to true, false means no errors
        const validatorsAsObj = validatorControls.reduce((obj, item) => {
            obj[item.name] = true;
            return obj;
        }, {});

        bus[this.formModuleName].controlsWithValidations = validatorsAsObj;
    },
    methods: {
        valueChanged(value) {
            /**
             * This will pass you the string value that was just updated on the form.
             *
             * @event change
             * @type {object}
             */
            this.$emit('change', value);
        },
        submitForm() {
            bus[this.formModuleName].hasBeenSubmitted = true;
            bus.$emit(`${this.formModuleName}/hasBeenSubmitted`);
            const values = {};

            // create control values to pass in event
            this.config.forEach(item => {
                const groupName = item.groupName;
                item.controls.forEach(control => {
                    // check if group exists, create empty object if not
                    if (!values[groupName]) {
                        values[groupName] = {};
                    }
                    values[groupName][control.name] = control.value;
                });
            });
            /**
             * Submit event. This will pass you the values of the current form, and if it is valid based on validators passed in form controls. You will get 'valid', and 'values' properties.
             *
             * @event submit
             * @type {object}
             */
            this.$emit('submit', {
                values,
                valid: this.checkFormValid(),
            });
        },
        checkFormValid() {
            return Object.values(bus[this.formModuleName].controlsWithValidations).every(item => item === false);
        },
    },
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss">
.form {
    color: color('base');
    width: 100%;
}
</style>
