# Select Dropdown Documentation

This component is built dynamically from the `config` prop passed into `VForm` component. This component creates select dropdowns from the passed array into config.

## Component Usage

#### Radio Example with Validators
Setting `inline: true` on the control will set items to inline-block
```js
[
    {
        name: 'selectInstrument',
        label: 'Select Instrument',
        controlType: {
            controlTag: 'select',
            default: 'Sorting',
            items: ['Most Popular', 'Customer Rating', 'Price'],
        },
        validators: [
            {
                validator: 'required',
            },
        ],
    },
]

```

## Available Validators
- required



