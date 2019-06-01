import TestHelpers from '@@/.config/jest/TestHelpers';
import FormControl from './FormControl.vue';
import FormErrors from './../FormErrors/FormErrors.vue';
import FormLabel from './../FormLabel/FormLabel.vue';
import bus from './../../_store/formBus.js';

jest.mock('./../../_store/formBus.js');

const basicControl = {
    name: 'email',
    placeholder: 'Email',
    focus: false,
    controlType: {
        controlTag: 'input',
        type: 'text',
    },
    validators: [],
    value: '',
};

const controlWithValidators = {
    ...basicControl,
    validators: [
        {
            validator: 'required',
        },
        {
            validator: 'minLength',
        },
    ],
};

const controlRadio = {
    ...basicControl,
    controlType: {
        controlTag: 'input',
        type: 'radio',
        items: [],
    },
};

const controlSelect = {
    ...basicControl,
    controlType: {
        controlTag: 'select',
        items: [],
    },
};

const controlTextarea = {
    ...basicControl,
    controlType: {
        controlTag: 'textarea',
        items: [],
    },
};

const vmDataBasic = {
    formModuleName: 'testing-contol',
    control: basicControl,
};

bus[vmDataBasic.formModuleName] = {
    hasBeenSubmitted: false,
    controlsWithValidations: [],
    hasBeenBlurred: false,
};

let testHelpers;
let wrapper;

describe('<FormControl />', () => {
    beforeEach(() => {
        testHelpers = new TestHelpers(FormControl, {
            propsData: vmDataBasic,
            mocks: {
                bus3: bus,
            },
            computed: {
                hasErrorAndSubmitted() {
                    return false;
                },
            },
        });

        wrapper = testHelpers.wrapper;
    });

    describe('<template> - "form-errors" renders', () => {
        it('shows errors when submitted', async () => {
            expect(testHelpers.wrapper.contains(FormErrors)).toBe(false);

            testHelpers.component.hasErrors = true;
            testHelpers.component.submitted = true;

            expect(testHelpers.wrapper.contains(FormErrors)).toBe(true);
        });
    });

    describe('<template> - "form label" renders', () => {
        it('shows label when control has label', async () => {
            expect(testHelpers.wrapper.contains(FormLabel)).toBe(false);

            wrapper.setProps({
                control: {
                    label: 'label',
                    controlType: {
                        controlTag: 'input',
                        type: 'text',
                    },
                },
            });

            expect(testHelpers.wrapper.contains(FormLabel)).toBe(true);
        });
    });

    describe('computed props', () => {
        it('creates a requiredInput', () => {
            expect(testHelpers.component.requiredInput).toBe(false);

            wrapper.setProps({
                control: controlWithValidators,
            });

            expect(testHelpers.component.requiredInput).toBe(true);
        });

        it('returns hasValue correctly', () => {
            expect(testHelpers.component.hasValue).toBe(false);

            wrapper.setProps({
                control: {
                    value: 'yep',
                },
            });

            expect(testHelpers.component.hasValue).toBe(true);
        });
    });

    describe('methods', () => {
        it('gets correct component Input', () => {
            expect(testHelpers.component.componentType()).toMatch(/FormInput/);
        });

        it('gets correct component RadioCheck', () => {
            wrapper.setProps({
                control: controlRadio,
            });

            expect(testHelpers.component.componentType()).toMatch(/FormRadioCheck/);
        });

        it('gets correct component Select', () => {
            wrapper.setProps({
                control: controlSelect,
            });

            expect(testHelpers.component.componentType()).toMatch(/FormSelect/);
        });

        it('gets correct component Textarea', () => {
            wrapper.setProps({
                control: controlTextarea,
            });

            expect(testHelpers.component.componentType()).toMatch(/FormTextArea/);
        });

        it('setValidators sets validators correctly', () => {
            expect(testHelpers.component.setValidators()).toMatchObject({
                value: {},
            });

            wrapper.setProps({
                control: controlWithValidators,
            });

            expect(testHelpers.component.setValidators()).toMatchObject({
                value: {
                    required: expect.any(Function),
                    minLength: expect.any(Function),
                },
            });
        });
    });
});
