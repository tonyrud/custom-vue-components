import TestHelpers from '@@/.config/jest/TestHelpers';
import FormGroup from './FormGroup.vue';

let testHelpers;
let wrapper;

const formGroupTwoControls = {
    groupName: 'groupUser',
    controls: [
        {
            name: 'email',
        },
        {
            name: 'password',
        },
    ],
};

const formGroupOneControl = {
    ...formGroupTwoControls,
    controls: [
        {
            name: 'email',
        },
    ],
};

const formGroupInline = {
    ...formGroupTwoControls,
    inline: true,
};

const vmDataBasic = {
    formModuleName: 'test-module-name',
    formGroup: formGroupTwoControls,
};

describe('<FormGroup />', () => {
    beforeEach(() => {
        testHelpers = new TestHelpers(FormGroup, {
            propsData: vmDataBasic,
        });
        wrapper = testHelpers.wrapper;
    });

    describe('<template> - "form-group"', () => {
        beforeEach(() => {
            testHelpers.dataSelector = 'form-group';
        });
        it('renders correct length of children', () => {
            testHelpers.hasChildCount(2);

            wrapper.setProps({
                formGroup: formGroupOneControl,
            });

            testHelpers.hasChildCount(1);
        });

        it('adds/removes "inline" class', () => {
            testHelpers.not.hasClass('inline');

            wrapper.setProps({
                formGroup: formGroupInline,
            });

            testHelpers.hasClass('inline');
        });

        it('adds/removes "single-control" class', () => {
            testHelpers.not.hasClass('single-control');

            wrapper.setProps({
                formGroup: formGroupOneControl,
            });

            testHelpers.hasClass('single-control');
        });
    });
});
