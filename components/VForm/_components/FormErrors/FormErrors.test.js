import TestHelpers from '@@/.config/jest/TestHelpers';
import FormErrors from './FormErrors.vue';

let testHelpers;
let wrapper;

const vmDataBasic = {
    errorMessage: 'test message',
};

describe('<FormErrors />', () => {
    beforeEach(() => {
        testHelpers = new TestHelpers(FormErrors, {
            propsData: vmDataBasic,
        });
        wrapper = testHelpers.wrapper;
    });

    describe('<template> - shows icon', () => {
        it('adds removes icon', () => {
            testHelpers.dataSelector = 'error-icon';
            expect(testHelpers.testElement.exists()).toBe(true);

            wrapper.setProps({
                errorMessage: '',
            });

            expect(testHelpers.testElement.exists()).toBe(false);
        });
    });

    describe('<template> - message text is correct', () => {
        it('shows correct message', () => {
            testHelpers.dataSelector = 'error-message';

            testHelpers.hasText('test message');

            wrapper.setProps({
                errorMessage: 'updated message',
            });

            testHelpers.hasText('updated message');
        });
    });

    describe('props', () => {
        it('has correct value', () => {
            expect(testHelpers.wrapper.props().errorMessage).toBe('test message');
        });
    });
});
