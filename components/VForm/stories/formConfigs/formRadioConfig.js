export default function(data) {
    const inputs = [
        {
            groupName: 'radio-group',
            controls: [],
        },
    ];
    const baseControl = {
        name: 'instruments',
        label: 'Select Instrument',
        placeholder: '',
        controlType: {
            controlTag: 'input',
            type: 'radio',
            items: [{ text: 'guitars' }, { text: 'drums' }, { text: 'mics' }],
        },
        value: '',
        validators: [],
    };
    const updatedInput = Object.assign(baseControl, data);
    inputs[0].controls.push(updatedInput);
    return inputs;
}
