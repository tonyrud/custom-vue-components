export default function(data) {
    const inputs = [
        {
            groupName: 'checkbox-group',
            controls: [],
        },
    ];
    const baseControl = {
        name: 'checkboxes',
        // inline: true,
        label: 'Check Options',
        controlType: {
            controlTag: 'input',
            type: 'checkbox',
            items: [{ text: 'Musician' }, { text: 'Sound Engineer' }, { text: 'Dealer' }],
        },
        value: '',
    };
    const updatedInput = Object.assign(baseControl, data);
    inputs[0].controls.push(updatedInput);
    return inputs;
}
