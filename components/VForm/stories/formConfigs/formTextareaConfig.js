export default function(data) {
    const inputs = [
        {
            groupName: 'textarea-group',
            controls: [],
        },
    ];
    const baseControl = {
        name: 'test textarea',
        placeholder: 'Basic textarea field',
        controlType: {
            controlTag: 'textarea',
        },
        value: '',
    };
    const updatedInput = Object.assign(baseControl, data);
    inputs[0].controls.push(updatedInput);
    return inputs;
}
