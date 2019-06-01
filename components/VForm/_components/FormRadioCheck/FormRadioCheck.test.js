import Vuelidate from 'vuelidate';
import Vue from 'vue';
import TestHelpers from '@@/.config/jest/TestHelpers';
import FormRadioCheck from './FormRadioCheck.vue';

Vue.use(Vuelidate);

let testHelpers;
let wrapper;

const vmDataBasic = {
    name: 'test-check-radio',
    placeholder: 'Testing FormRadioCheck',
    type: 'radio',
    selectItems: [{ text: 'guitars' }, { text: 'drums' }, { text: 'mics' }],
    formModuleName: 'Test',
    hasErrorAndSubmitted: false,
    vuelidate: {
        value: '',
    },
};

const jestMockBlur = jest.fn();

describe('<FormRadioCheck />', () => {
    beforeEach(() => {
        testHelpers = new TestHelpers(FormRadioCheck, {
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

    describe('<template> - "form-radios"', () => {
        beforeEach(() => {
            testHelpers.dataSelector = 'form-radios';
        });
        it('adds/removes "inline" class', () => {
            testHelpers.not.hasClass('inline');

            wrapper.setProps({
                inline: true,
            });

            testHelpers.hasClass('inline');
        });

        it('adds/removes ".input--error"', () => {
            testHelpers.not.hasClass('form__control--error');

            wrapper.setProps({
                hasErrorAndSubmitted: true,
            });

            testHelpers.hasClass('form__control--error');

            wrapper.setProps({
                hasErrorAndSubmitted: false,
            });

            testHelpers.not.hasClass('form__control--error');
        });
    });

    describe('<template> - "input"', () => {
        beforeEach(() => {
            testHelpers.dataSelector = 'radio-input';
        });

        it('[attrs] has correct name', () => {
            testHelpers.hasAttribute('name', 'test-check-radio');
        });

        it('[attrs] has correct id', () => {
            const firstEl = testHelpers.testElements.at(0);
            const secondEl = testHelpers.testElements.at(2);

            expect(firstEl.attributes('id')).toBe('test-check-radio-0');

            expect(secondEl.attributes('id')).toBe('test-check-radio-2');
        });

        it('[attrs] has correct type', () => {
            testHelpers.hasAttribute('type', 'radio');

            wrapper.setProps({
                type: 'checkbox',
            });

            testHelpers.hasAttribute('type', 'checkbox');
        });

        it('[attrs] has disabled', () => {
            testHelpers.not.hasAttribute('disabled');

            wrapper.setProps({
                selectItems: [{ text: 'guitars', disabled: true }, { text: 'drums' }],
            });

            testHelpers.hasAttribute('disabled', 'disabled');

            const secondEl = testHelpers.getElementAt(1);
            expect(secondEl.attributes().disabled).toBeFalsy();
        });

        it('[attrs] correctly assigns "checked" on radio', () => {
            const radioEl = testHelpers.testElement;
            const radioEl1 = testHelpers.getElementAt(1);
            const radioEl2 = testHelpers.getElementAt(2);

            expect(radioEl.element.checked).toBe(false);
            expect(radioEl1.element.checked).toBe(false);
            expect(radioEl2.element.checked).toBe(false);

            radioEl.trigger('click');

            expect(radioEl.element.checked).toBe(true);

            radioEl2.trigger('click');

            expect(radioEl.element.checked).toBe(false);
            expect(radioEl1.element.checked).toBe(false);
            expect(radioEl2.element.checked).toBe(true);
        });

        it('[attrs] correctly assigns "checked" on checkboxes', () => {
            wrapper.setProps({
                type: 'checkbox',
            });
            const checkEl = testHelpers.testElement;
            const checkEl1 = testHelpers.getElementAt(1);
            const checkEl2 = testHelpers.getElementAt(2);

            expect(checkEl.element.checked).toBe(false);
            expect(checkEl1.element.checked).toBe(false);
            expect(checkEl2.element.checked).toBe(false);

            checkEl.trigger('click');

            checkEl2.trigger('click');

            expect(checkEl.element.checked).toBe(true);
            expect(checkEl1.element.checked).toBe(false);
            expect(checkEl2.element.checked).toBe(true);
        });

        it('[attrs] value updates vm data', () => {
            wrapper.setProps({
                type: 'checkbox',
            });
            const checkEl = testHelpers.testElement;
            const checkEl1 = testHelpers.getElementAt(1);
            const checkEl2 = testHelpers.getElementAt(2);

            expect(testHelpers.wrapper.vm.checkValues).toHaveLength(0);

            checkEl.trigger('click');
            checkEl1.trigger('click');

            expect(testHelpers.wrapper.vm.checkValues).toHaveLength(2);
            expect(testHelpers.wrapper.vm.checkValues).toContain('drums');
            expect(testHelpers.wrapper.vm.checkValues).toContain('guitars');

            checkEl.trigger('click');
            checkEl2.trigger('click');

            expect(testHelpers.wrapper.vm.checkValues).toHaveLength(2);

            expect(testHelpers.wrapper.vm.checkValues).not.toContain('guitars');
            expect(testHelpers.wrapper.vm.checkValues).toContain('drums');
            expect(testHelpers.wrapper.vm.checkValues).toContain('mics');
        });

        it('@change emits "input"', () => {
            const checkEl = testHelpers.testElement;
            const checkEl1 = testHelpers.getElementAt(1);
            const checkEl2 = testHelpers.getElementAt(2);

            expect(testHelpers.wrapper.emitted().input).toHaveLength(1);

            checkEl.trigger('click');

            expect(testHelpers.wrapper.emitted().input).toHaveLength(2);

            checkEl1.trigger('click');

            checkEl2.trigger('click');

            expect(testHelpers.wrapper.emitted().input).toHaveLength(4);
        });

        it('@blur should emit', () => {
            const inputEl = testHelpers.testElement;

            expect(jestMockBlur.mock.calls.length).toBe(0);

            inputEl.trigger('blur');
            expect(jestMockBlur.mock.calls.length).toBe(1);

            inputEl.trigger('blur');
            expect(jestMockBlur.mock.calls.length).toBe(2);
        });
    });
});
