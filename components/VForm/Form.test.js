import TestHelpers from '@@/.config/jest/TestHelpers';
import Form from './VForm';
import bus from './_store/formBus';

let testHelpers;
let wrapper;

const vmDataBasic = {
    formName: 'test-form-name',
    config: [],
};

const group1 = {
    inline: true,
    groupName: 'groupUser',
    controls: [
        {
            name: 'email',
            placeholder: 'Email',
            controlType: {
                controlTag: 'input',
                type: 'text',
            },
            validators: [
                {
                    validator: 'required',
                },
                {
                    validator: 'email',
                },
            ],
        },
        {
            name: 'password',
            placeholder: 'Password',
            controlType: {
                controlTag: 'input',
                type: 'password',
            },
            validators: [
                {
                    validator: 'required',
                },
                {
                    validator: 'minLength',
                    amount: 7,
                },
            ],
            valid: false,
        },
    ],
};

const group2 = {
    inline: false,
    groupName: 'groupDetails',
    controls: [
        {
            name: 'phone',
            placeholder: 'Phone number',
            prefix: '#',
            controlType: {
                controlTag: 'input',
                type: 'number',
            },
            validators: [
                {
                    validator: 'required',
                },
                {
                    validator: 'numeric',
                },
                {
                    validator: 'maxLength',
                    amount: 10,
                },
                {
                    validator: 'minLength',
                    amount: 10,
                },
            ],
            icons: {
                left: {
                    src: 'https://sweetwater.com/path/to/icon',
                },
                right: {
                    src: 'https://sweetwater.com/path/to/icon',
                },
            },
        },
        {
            name: 'testing',
            placeholder: 'Testing',
            controlType: {
                controlTag: 'input',
                type: 'text',
            },
            validators: [
                {
                    validator: 'required',
                },
                {
                    validator: 'maxLength',
                    amount: 4,
                },
            ],
        },
    ],
};

describe('Form Component Index', () => {
    beforeEach(() => {
        testHelpers = new TestHelpers(Form, {
            propsData: vmDataBasic,
        });

        wrapper = testHelpers.wrapper;
    });

    describe('<template> - "form"', () => {
        it('renders correct length of children', () => {
            testHelpers.hasChildCount(0);
            let vmUpdatedData = {};

            vmUpdatedData = { ...vmDataBasic, config: [group1] };

            wrapper.setProps({
                ...vmUpdatedData,
            });

            testHelpers.hasChildCount(1);

            vmUpdatedData = { ...vmDataBasic, config: [group1, group2] };

            wrapper.setProps({
                ...vmUpdatedData,
            });

            testHelpers.hasChildCount(2);
        });
    });

    describe('props', () => {
        it('sets form module name', () => {
            expect(testHelpers.component.formModuleName).toBe('form-test-form-name');
        });
    });

    describe('Event Bus', () => {
        it('bus should have correct name property', () => {
            expect(bus).toHaveProperty('form-test-form-name');
        });

        it('bus should init with correct default values', () => {
            expect(bus['form-test-form-name']).toMatchObject({
                hasBeenSubmitted: false,
                controlsWithValidations: {},
                hasBeenBlurred: false,
            });
        });
    });

    describe('methods', () => {
        it('submitForms emits submit', () => {
            expect(testHelpers.wrapper.emitted().submit).toBeUndefined();

            testHelpers.component.submitForm();
            testHelpers.component.submitForm();

            expect(testHelpers.wrapper.emitted().submit).toHaveLength(2);
        });

        it('submitForms emits correct data', () => {
            wrapper.setProps({
                ...vmDataBasic,
                config: [group1],
            });

            testHelpers.component.submitForm();

            expect(testHelpers.wrapper.emitted().submit[0][0]).toMatchObject({
                values: expect.any(Object),
                valid: expect.any(Boolean),
            });
        });
    });
});
