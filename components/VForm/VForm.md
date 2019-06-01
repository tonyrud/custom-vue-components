# Examples

## Full form example:

```js
<template>
    <div>
        <VForm
            formName="form-name"
            :config="formConfig"
            @submit="formSubmitted" >
            <VButton title="Submit" theme="submit" />
        </VForm>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formConfig: [
                {
                    // inline: true,
                    groupName: 'user-info',
                    controls: [
                        {
                            name: 'email',
                            placeholder: 'Email',
                            controlType: {
                                controlTag: 'input',
                                type: 'text',
                            },
                            validators: [
                                {
                                    validator: 'required',
                                },
                                {
                                    validator: 'email',
                                },
                            ],
                        },
                        {
                            name: 'password',
                            placeholder: 'Password',
                            controlType: {
                                controlTag: 'input',
                                type: 'password',
                            },
                            validators: [
                                {
                                    validator: 'required',
                                },
                                {
                                    validator: 'minLength',
                                    amount: 7,
                                },
                            ],
                        },
                    ],
                },
                {
                    inline: false,
                    groupName: 'user-details',
                    controls: [
                        {
                            name: 'phone',
                            placeholder: 'Phone number',
                            prefix: '#',
                            controlType: {
                                controlTag: 'input',
                                type: 'number',
                            },
                            validators: [
                                {
                                    validator: 'required',
                                },
                                {
                                    validator: 'numeric',
                                },
                                {
                                    validator: 'maxLength',
                                    amount: 10,
                                },
                                {
                                    validator: 'minLength',
                                    amount: 10,
                                },
                            ],
                            icons: {
                                left: {
                                    src: 'https://sweetwater.com/path/to/icon',
                                },
                                right: {
                                    src: 'https://sweetwater.com/path/to/icon',
                                },
                            },
                        },
                        {
                            name: 'testing',
                            placeholder: 'Testing',
                            controlType: {
                                controlTag: 'input',
                                type: 'text',
                            },
                            validators: [
                                {
                                    validator: 'required',
                                },
                                {
                                    validator: 'maxLength',
                                    amount: 4,
                                },
                            ],
                        },
                    ],
                },
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
                                    { text: 'mics' },
                                ],
                            },
                            validators: [
                                {
                                    validator: 'required',
                                },
                            ],
                        },
                    ],
                },
                {
                    inline: false,
                    groupName: 'groupRadios',
                    controls: [
                        {
                            name: 'drums',
                            label: 'Select Drums',
                            inline: true,
                            placeholder: '',
                            flexWidth: '10%',
                            controlType: {
                                controlTag: 'input',
                                type: 'radio',
                                items: [
                                    { text: 'Tama' },
                                    { text: 'Pearl' },
                                    { text: 'Yamaha' },
                                ],
                            },
                            validators: [
                                {
                                    validator: 'required',
                                },
                            ],
                        },
                    ],
                },
                {
                    inline: false,
                    groupName: 'groupInstrument',
                    controls: [
                        {
                            name: 'selectInstrument',
                            controlType: {
                                controlTag: 'select',
                                defaultValue: 'Sorting',
                                items: ['Most Popular', 'Customer Rating', 'Price'],
                            },
                            validators: [
                                {
                                    validator: 'required',
                                },
                            ],
                        },
                        {
                            name: 'checkboxes',
                            label: 'Check Options',
                            controlType: {
                                controlTag: 'input',
                                type: 'checkbox',
                                items: [
                                    { text: 'Musician', disabled: true },
                                    { text: 'Sound Engineer' },
                                    { text: 'Dealer' },
                                ],
                            },
                        },
                        {
                            name: 'more checkboxes',
                            inline: true,
                            label: 'Check More Options',
                            flexWidth: '25%',
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
            ],
        }
    },
    methods: {
        formSubmitted(e) {
            console.log('form submitted: ', e);
        },
    },
};
</script>
```
