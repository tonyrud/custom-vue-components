export default function(data) {
    const inputs = [
        {
            groupName: 'select-group',
            controls: [],
        },
    ];
    const baseControl = {
        name: 'selectInstrument',
        controlType: {
            controlTag: 'select',
            default: 'Please select a value',
            items: ['Most Popular', 'Customer Rating', 'Price'],
        },
        value: '',
        validators: [
            {
                validator: 'required',
            },
        ],
    };
    const updatedInput = Object.assign(baseControl, data);
    inputs[0].controls.push(updatedInput);
    return inputs;
}
