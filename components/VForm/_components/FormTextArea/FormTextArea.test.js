import Vuelidate from 'vuelidate';
import Vue from 'vue';
import TestHelpers from '@@/.config/jest/TestHelpers';
import FormTextArea from './FormTextArea.vue';

Vue.use(Vuelidate);

let testHelpers;
let wrapper;

const vmDataBasic = {
    name: 'test-textarea',
    placeholder: 'Testing FormTextArea',
    type: 'text',
    formModuleName: 'Test',
    hasErrorAndSubmitted: false,
    vuelidate: {
        value: '',
    },
};

const jestMockBlur = jest.fn();

describe('<FormTextArea />', () => {
    beforeEach(() => {
        testHelpers = new TestHelpers(FormTextArea, {
            propsData: vmDataBasic,
        });

        testHelpers.wrapper.setMethods({
            blurred: jestMockBlur,
        });

        wrapper = testHelpers.wrapper;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('<template> - "textarea-label-container"', () => {
        it('adds/removes "required"', () => {
            testHelpers.dataSelector = 'textarea-label-container';
            testHelpers.not.hasClass('required');

            wrapper.setProps({
                required: true,
            });

            testHelpers.hasClass('required');
        });
    });

    describe('<template> - "textarea"', () => {
        beforeEach(() => {
            testHelpers.dataSelector = 'textarea';
        });

        it('adds/removes ".has-value"', () => {
            testHelpers.not.hasClass('has-value');

            wrapper.setProps({
                hasValue: true,
            });

            testHelpers.hasClass('has-value');
        });

        it('adds/removes ".input--error"', () => {
            testHelpers.not.hasClass('form__control-textarea--error');

            wrapper.setProps({
                hasErrorAndSubmitted: true,
            });

            testHelpers.hasClass('form__control-textarea--error');
        });

        it('[attrs] has correct name', () => {
            testHelpers.hasAttribute('name', 'test-textarea');
        });

        it('[attrs] has correct id', () => {
            testHelpers.hasAttribute('id', 'test-textarea');
        });

        it('[attrs] has correct type', () => {
            testHelpers.hasAttribute('type', 'text');

            wrapper.setProps({
                type: 'email',
            });

            testHelpers.hasAttribute('type', 'email');
        });

        it('[attrs] has correct aria label', () => {
            testHelpers.not.hasAttribute('aria-label');

            wrapper.setProps({
                ariaLabel: 'test label',
            });

            testHelpers.hasAttribute('aria-label', 'test label');
        });

        it('[attrs] has disabled', () => {
            testHelpers.not.hasAttribute('disabled');

            wrapper.setProps({
                disabled: true,
            });

            testHelpers.hasAttribute('disabled', 'disabled');
        });

        it('[attrs] has maxlength', () => {
            testHelpers.not.hasAttribute('maxlength');

            wrapper.setProps({
                validators: [
                    {
                        validator: 'maxLength',
                        amount: 52,
                    },
                ],
            });

            testHelpers.hasAttribute('maxlength', '52');
        });

        it('@blur should emit', () => {
            const inputEl = testHelpers.testElement;

            expect(jestMockBlur.mock.calls.length).toBe(0);

            inputEl.trigger('blur');
            expect(jestMockBlur.mock.calls.length).toBe(1);

            inputEl.trigger('blur');
            expect(jestMockBlur.mock.calls.length).toBe(2);
        });

        it('should be focused', () => {
            expect(testHelpers.wrapper.find('textarea:focus').exists()).toBe(false);

            testHelpers = new TestHelpers(FormTextArea, {
                propsData: { ...vmDataBasic, focus: true },
            });

            expect(testHelpers.wrapper.find('textarea:focus').exists()).toBe(true);

            const input = testHelpers.wrapper.find('textarea:focus');
            expect(document.activeElement === input.element).toBe(true);
        });
    });

    describe('<template> - "label"', () => {
        beforeEach(() => {
            testHelpers.dataSelector = 'label';
        });
        it('has correct label placeholder', () => {
            wrapper.setProps({
                placeholder: 'placeholder text',
            });

            testHelpers.hasText('placeholder text');
        });
        it('has correct for naming', () => {
            wrapper.setProps({
                name: 'for name',
            });

            testHelpers.hasAttribute('for', 'for name');
        });
    });

    describe('<template> - "maxLength"', () => {
        beforeEach(() => {
            testHelpers.dataSelector = 'textarea-maxlength';
        });

        it('maxLength subtracts correctly', () => {
            wrapper.setProps({
                value: 'test',
                validators: [
                    {
                        validator: 'maxLength',
                        amount: 50,
                    },
                ],
            });

            testHelpers.hasText('46');
        });

        it('maxLength shows original count', () => {
            wrapper.setProps({
                value: '',
                validators: [
                    {
                        validator: 'maxLength',
                        amount: 52,
                    },
                ],
            });

            testHelpers.hasText('52');
        });

        it('maxLength is visible', () => {
            expect(testHelpers.testElement.exists()).toBe(false);

            wrapper.setProps({
                validators: [
                    {
                        validator: 'maxLength',
                        amount: 52,
                    },
                ],
            });
            expect(testHelpers.testElement.exists()).toBe(true);
        });
    });
});
