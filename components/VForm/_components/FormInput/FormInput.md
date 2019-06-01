#

NOTE: This component is built dynamically from the `config` prop passed into `VForm` component.

## Usage and Examples

#### Basic

```js
<template>
    <div>
        <VForm
            formName="input-basic"
            :config="formConfig" >
        </VForm>
    </div>
</template>


<script>
export default {
    data() {
        return {
            formConfig: [
                {
                    groupName: 'basic',
                    controls: [
                        {
                            name: 'simple',
                            placeholder: 'Simple text input',
                        },{
                            name: 'simple-label',
                            placeholder: 'With label',
                            label: 'Username'
                        },
                    ],
                },
            ]
        }
    },

};
</script>
```

#### Prefix / Suffix

```js
<template>
    <div>
        <VForm
            formName="input-prefix-suffix"
            :config="formConfig" >
        </VForm>
    </div>
</template>


<script>
export default {
    data() {
        return {
            formConfig: [
                {
                    groupName: 'prefix-suffix',
                    controls: [
                        {
                            name: 'prefix',
                            placeholder: 'Prefix input',
                            prefix: '#',
                        },
                        {
                            name: 'suffix',
                            placeholder: 'Suffix input',
                            suffix: '$',
                        },
                    ],
                },
            ]
        }
    },
};
</script>
```

#### Disabled

```js
<template>
    <div>
        <VForm
            formName="input-disabled"
            :config="formConfig" >
        </VForm>
    </div>
</template>


<script>
export default {
    data() {
        return {
            formConfig: [
                {
                    groupName: 'user-info',
                    controls: [
                        {
                            name: 'disabled',
                            placeholder: 'Disabled input',
                            disabled: true,
                        },
                    ],
                },
            ]
        }
    },
};
</script>
```

#### Password

```js
<template>
    <div>
        <VForm
            formName="input-password"
            :config="formConfig" >
        </VForm>
    </div>
</template>


<script>
export default {
    data() {
        return {
            formConfig: [
                {
                    groupName: 'password',
                    controls: [
                        {
                            name: 'password',
                            placeholder: 'Password',
                            controlType: {
                                type: 'password',
                            },
                        },
                    ],

                },
            ]
        }
    },

};
</script>
```

#### With buttons

```js
<template>
    <div>
        <VForm
            formName="input-button"
            :config="formConfig" >
        </VForm>
    </div>
</template>


<script>
export default {
    data() {
        return {
            formConfig: [
                {
                    groupName: 'buttons',

                    controls: [
                        {
                            name: 'secondary-button',
                            placeholder: 'Secondary button',
                            button: {
                                text: 'Send'
                            },
                        },
                        {
                            name: 'primary-button',
                            placeholder: 'Primary button',
                            button: {
                                text: 'Submit',
                                primary: true
                            },
                        },
                    ],

                },
            ]
        }
    },

};
</script>
```

#### Validators

-   required
-   email
-   numeric
-   minLength - expects `amount`
-   maxLength - expects `amount`

```js
<template>
    <div>
        <VForm
            formName="input-valdations"
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
                    groupName: 'validations',
                    controls: [
                        {
                            name: 'required',
                            placeholder: 'Required',
                            validators: [
                                {
                                    validator: 'required',
                                },
                            ],
                        },
                        {
                            name: 'email',
                            placeholder: 'Email',
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
                            name: 'max-min',
                            placeholder: 'Max / Min length',
                            validators: [
                                {
                                    validator: 'maxLength',
                                    amount: 7,
                                },
                                {
                                    validator: 'minLength',
                                    amount: 3,
                                },
                            ],
                        },
                        {
                            name: 'number',
                            placeholder: 'Numeric',
                            validators: [
                                {
                                    validator: 'numeric',
                                },
                            ],
                        },
                    ],
                },
            ]
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
