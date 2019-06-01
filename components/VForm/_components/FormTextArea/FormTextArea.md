# Textarea Documentation

This component is built dynamically from the `config` prop passed into `VForm` component. This component creates textareas from the passed array into config.

## Component Usage

#### Radio Example with Validators
```js
[
    {
        groupName: 'groupTextbox',
        controls: [
            {
                name: 'textarea',
                placeholder: 'Placeholder for textarea',
                controlType: {
                    controlTag: 'textarea',
                },
                validators: [
                    {
                        validator: 'required',
                    },
                    {
                        validator: 'maxLength',
                        amount: 20,
                    },
                    {
                        validator: 'minLength',
                        amount: 10,
                    },
                ],
            },
        ],
    },
]

```

## Available Validators
- required
- minLength - expects `amount`
- maxLength - expects `amount`



