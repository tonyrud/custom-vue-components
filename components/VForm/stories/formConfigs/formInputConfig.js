const randomNum = () => {
    const random = Math.floor(Math.random() * 200);
    const date = Date.now()
        .toString()
        .substr(-2);
    return random + date;
};

export default function(data) {
    const num = randomNum();

    const inputs = [
        {
            groupName: 'group',
            controls: [],
        },
    ];
    const baseControl = {
        name: `test input-${num}`,
        placeholder: 'Basic input field',
        controlType: {
            controlTag: 'input',
            type: 'text',
        },
        value: '',
    };
    const updatedInput = Object.assign(baseControl, data);
    inputs[0].controls.push(updatedInput);
    return inputs;
}
