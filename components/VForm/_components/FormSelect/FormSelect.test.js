import Vuelidate from 'vuelidate';
import Vue from 'vue';
import TestHelpers from '@@/.config/jest/TestHelpers';
import FormSelect from './FormSelect';

Vue.use(Vuelidate);

let testHelpers;
let wrapper;
const jestMockBlur = jest.fn();

const vmDataBasic = {
    name: 'test-select',
    placeholder: 'Testing FormSelect',
    type: 'text',
    defaultValue: 'Sorting',
    selectItems: ['Guitars', 'Drums', 'Keyboards'],
    formModuleName: 'Test',
    hasErrorAndSubmitted: false,
    vuelidate: {
        value: '',
    },
};

describe('<FormSelect />', () => {
    beforeEach(() => {
        testHelpers = new TestHelpers(FormSelect, {
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

    describe('<template> - "select"', () => {
        beforeEach(() => {
            testHelpers.dataSelector = 'select';
        });

        it('adds/removes ".input--error"', () => {
            testHelpers.not.hasClass('form__control-select--error');

            wrapper.setProps({
                hasErrorAndSubmitted: true,
            });

            testHelpers.hasClass('form__control-select--error');
        });

        it('[attrs] has correct name', () => {
            testHelpers.hasAttribute('name', 'test-select');
        });

        it('[attrs] has correct id', () => {
            testHelpers.hasAttribute('id', 'test-select');
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

        it('@blur should emit', () => {
            const inputEl = testHelpers.testElement;

            expect(jestMockBlur.mock.calls.length).toBe(0);

            inputEl.trigger('blur');
            expect(jestMockBlur.mock.calls.length).toBe(1);

            inputEl.trigger('blur');
            expect(jestMockBlur.mock.calls.length).toBe(2);
        });

        it('should be focused', () => {
            expect(testHelpers.wrapper.find('select:focus').exists()).toBe(false);

            testHelpers = new TestHelpers(FormSelect, {
                propsData: { ...vmDataBasic, focus: true },
            });

            expect(testHelpers.wrapper.find('select:focus').exists()).toBe(true);

            const input = testHelpers.wrapper.find('select:focus');
            expect(document.activeElement === input.element).toBe(true);
        });
    });

    describe('<template> "option" default', () => {
        beforeEach(() => {
            testHelpers.dataSelector = 'select-default-option';
        });
        it('shows default option', () => {
            const str = 'option[data-test="select-default-option"]';

            wrapper.setProps({
                defaultValue: '',
            });

            expect(testHelpers.wrapper.find(str).exists()).toBe(false);

            wrapper.setProps({
                defaultValue: 'Default Select',
            });

            expect(testHelpers.wrapper.find(str).exists()).toBe(true);
        });

        it('has correct default text', () => {
            wrapper.setProps({
                defaultValue: 'Default Select',
            });

            testHelpers.hasText('Default Select');
        });
    });
});
