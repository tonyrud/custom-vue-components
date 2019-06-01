import Vuelidate from 'vuelidate';
import Vue from 'vue';
import TestHelpers from '@@/.config/jest/TestHelpers';
import FormInput from './FormInput.vue';

Vue.use(Vuelidate);

let testHelpers;
let wrapper;

const vmDataBasic = {
    name: 'test-input',
    placeholder: 'Testing Input',
    type: 'text',
    formModuleName: 'Test',
    hasErrorAndSubmitted: false,
    vuelidate: {
        value: '',
    },
};

const blurredMock = jest.fn();
const updateControlMock = jest.fn();
const isBetweenMinMaxNumberMock = jest.fn();

describe('<FormInput />', () => {
    beforeEach(() => {
        testHelpers = new TestHelpers(FormInput, {
            propsData: vmDataBasic,
        });

        wrapper = testHelpers.wrapper;

        wrapper.setMethods({
            blurred: blurredMock,
            updateControl: updateControlMock,
            isBetweenMinMaxNumber: isBetweenMinMaxNumberMock,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('<template> - "input-label-container"', () => {
        it('adds/removes "required"', () => {
            testHelpers.dataSelector = 'input-label-container';
            testHelpers.not.hasClass('required');

            wrapper.setProps({
                required: true,
            });

            testHelpers.hasClass('required');
        });
    });

    describe('<template> - "input"', () => {
        const event = { preventDefault: () => {} };
        beforeEach(() => {
            testHelpers.dataSelector = 'input';
            jest.spyOn(event, 'preventDefault');
        });

        it('adds/removes ".has-value"', () => {
            testHelpers.not.hasClass('has-value');

            wrapper.setProps({
                hasValue: true,
            });

            testHelpers.hasClass('has-value');
        });

        it('adds/removes ".input--error"', () => {
            testHelpers.not.hasClass('form__control-input--error');

            wrapper.setProps({
                hasErrorAndSubmitted: true,
            });

            testHelpers.hasClass('form__control-input--error');
        });

        it('[attrs] has correct name', () => {
            testHelpers.hasAttribute('name', 'test-input');
        });

        it('[attrs] has correct id', () => {
            testHelpers.hasAttribute('id', 'test-input');
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

            expect(blurredMock.mock.calls.length).toBe(0);

            inputEl.trigger('blur');
            expect(blurredMock.mock.calls.length).toBe(1);

            inputEl.trigger('blur');
            expect(blurredMock.mock.calls.length).toBe(2);
        });

        it('@input should emit', () => {
            const inputEl = testHelpers.testElement;

            expect(updateControlMock.mock.calls.length).toBe(0);

            inputEl.trigger('input');
            inputEl.trigger('input');
            inputEl.trigger('input');

            expect(updateControlMock.mock.calls.length).toBe(3);
        });

        it('keydown should call isBetweenMinMaxNumber()', () => {
            const inputEl = testHelpers.testElement;

            expect(isBetweenMinMaxNumberMock.mock.calls.length).toBe(0);

            inputEl.trigger('keydown');
            inputEl.trigger('keydown');
            inputEl.trigger('keydown');

            expect(isBetweenMinMaxNumberMock.mock.calls.length).toBe(3);
        });

        it('keypress should return true on backspace or enter', () => {
            testHelpers = new TestHelpers(FormInput, {
                propsData: { ...vmDataBasic, type: 'number', min: 10 },
            });

            const testPress = testHelpers.wrapper.vm.isBetweenMinMaxNumber({
                code: 'Test',
            });
            const digitPressedWithNoMax = testHelpers.wrapper.vm.isBetweenMinMaxNumber({
                code: 'Digit',
                key: 5,
                preventDefault: () => {},
            });

            expect(digitPressedWithNoMax).toBeUndefined();
            expect(testPress).toBe(true);
        });

        it('should be focused', () => {
            expect(testHelpers.wrapper.find('input:focus').exists()).toBe(false);

            testHelpers = new TestHelpers(FormInput, {
                propsData: { ...vmDataBasic, focus: true },
            });

            expect(testHelpers.wrapper.find('input:focus').exists()).toBe(true);

            const input = testHelpers.wrapper.find('input:focus');
            expect(document.activeElement === input.vnode.elm).toBe(true);
        });
    });

    describe('<template> - "input-button"', () => {
        beforeEach(() => {
            testHelpers.dataSelector = 'input-button';
        });
        it('adds/removes ".btn__input--primary"', () => {
            wrapper.setProps({
                button: {
                    primary: true,
                },
            });

            testHelpers.hasClass('btn__input--primary', 'input-button');
        });

        it('shows/removes button', () => {
            expect(testHelpers.wrapper.contains('[data-test=input-button]')).toBe(false);

            wrapper.setProps({
                button: {},
            });

            expect(testHelpers.wrapper.contains('[data-test=input-button]')).toBe(true);
        });

        it('has correct button text', () => {
            wrapper.setProps({
                button: {
                    text: 'Submit',
                },
            });
            testHelpers.hasText('Submit', 'input-button');
        });
    });

    describe('<template> - "input-password"', () => {
        beforeEach(() => {
            testHelpers.dataSelector = 'input-password';
        });
        it('adds/removes span for password', () => {
            expect(testHelpers.wrapper.contains('[data-test=input-password]')).toBe(false);
            wrapper.setProps({
                type: 'password',
            });
            testHelpers.doesExist();
        });

        it('@click should show/hide password', () => {
            wrapper.setProps({
                type: 'password',
            });

            testHelpers.hasText('Show');

            const passwordEl = testHelpers.testElement;

            passwordEl.trigger('click');
            testHelpers.hasText('Hide');

            passwordEl.trigger('click');
            testHelpers.hasText('Show');
        });
    });

    describe('<template> - "input-container"', () => {
        beforeEach(() => {
            testHelpers.dataSelector = 'input-container';
        });
        it('adds/removes "has-button"', () => {
            testHelpers.not.hasClass('has-buttons', 'input-container');

            wrapper.setProps({
                button: {},
            });

            testHelpers.hasClass('has-button', 'input-container');
        });

        it('adds/removes "has-prefix"', () => {
            testHelpers.not.hasClass('has-prefix', 'input-container');

            wrapper.setProps({
                prefix: '$',
            });

            testHelpers.hasClass('has-prefix', 'input-container');
        });

        it('adds/removes "has-suffix"', () => {
            testHelpers.not.hasClass('has-suffix', 'input-container');
            wrapper.setProps({
                suffix: '$',
            });
            testHelpers.hasClass('has-suffix', 'input-container');
        });
    });

    describe('<template> - "input-prefix', () => {
        beforeEach(() => {
            testHelpers.dataSelector = 'input-prefix';
        });
        it('shows/removes prefix span', () => {
            expect(testHelpers.testElement.exists()).toBe(false);

            wrapper.setProps({
                prefix: '00',
            });

            expect(testHelpers.testElement.exists()).toBe(true);
        });

        it('has correct prefix text', () => {
            wrapper.setProps({
                prefix: '.00',
            });
            testHelpers.hasText('.00', 'input-prefix');
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

    describe('<template> - "input-suffix', () => {
        beforeEach(() => {
            testHelpers.dataSelector = 'input-suffix';
        });

        it('shows/removes suffix span', () => {
            expect(testHelpers.wrapper.contains('[data-test=input-suffix]')).toBe(false);

            wrapper.setProps({
                suffix: '$',
            });

            expect(testHelpers.testElement.exists()).toBe(true);
        });

        it('has correct suffix text', () => {
            wrapper.setProps({
                suffix: '$',
            });
            testHelpers.hasText('$', 'input-suffix');
        });
    });
});
