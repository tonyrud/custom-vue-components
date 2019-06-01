# Radio and Checkbox Documentation

This component is built dynamically from the `config` prop passed into `VForm` component. This component creates radios and checkboxes

## Component Usage

#### Radio Example with Validators
Setting `inline: true` on the control will set items to inline-block
```js
[
    {
        inline: false,
        groupName: 'groupRadios',
        controls: [
            {
                name: 'instruments',
                label: 'Select Instrument',
                placeholder: '',
                controlType: {
                    controlTag: 'input',
                    type: 'radio',
                    items: [
                        { text: 'guitars' },
                        { text: 'drums' },
                        { text: 'mics' }],
                },
                validators: [
                    {
                        validator: 'required',
                    },
                ],
            },
        ],
    },
]
```

#### Simple Checkbox Example
Setting `inline: true` on the control will set items to inline-block, `flexWidth` will set width of each item.
```js
[
    {
        inline: false,
        groupName: 'groupRadios',
        controls: [
            {
                name: 'styles',
                inline: true,
                label: 'Check More Options',
                flexWidth: '32%',
                controlType: {
                    controlTag: 'input',
                    type: 'checkbox',
                    items: [
                        { text: 'Death Metal' },
                        { text: 'Power Metal' },
                        { text: 'Trash Metal' },
                        { text: 'Progressive Metal' },
                        { text: 'Classic Metal' },
                    ],
                },
            },
        ],
    },
]
```

## Validators
- required



