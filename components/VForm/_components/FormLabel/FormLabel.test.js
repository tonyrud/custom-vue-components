import TestHelpers from '@@/.config/jest/TestHelpers';
import FormLabel from './FormLabel.vue';

let testHelpers;
let wrapper;

const vmDataBasic = {
    label: 'test label',
};

describe('<FormLabel />', () => {
    beforeEach(() => {
        testHelpers = new TestHelpers(FormLabel, {
            propsData: vmDataBasic,
        });
        wrapper = testHelpers.wrapper;
    });

    describe('<template> - message text is correct', () => {
        it('shows correct message', () => {
            testHelpers.dataSelector = 'form-label';

            testHelpers.hasText('test label');

            wrapper.setProps({
                label: 'updated message',
            });

            testHelpers.hasText('updated message');
        });
    });
});
