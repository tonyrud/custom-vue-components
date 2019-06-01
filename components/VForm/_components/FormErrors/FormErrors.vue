<template>
    <div v-if="errorMessage" class="form-group__errors">
        <span v-if="errorMessage" data-test="error-icon" class="form-group__icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="1623 1525 16 16">
                <path
                    d="M1631 1541a8.009 8.009 0 0 1-8-8 8.009 8.009 0 0 1 8-8 8.009 8.009 0 0 1 8 8 8.009 8.009 0 0 1-8 8zm0-5.04a1.041 1.041 0 0 0-1.039 1.04 1.041 1.041 0 0 0 1.039 1.04 1.042 1.042 0 0 0 1.04-1.04 1.041 1.041 0 0 0-1.04-1.042zm0-8a1.041 1.041 0 0 0-1.039 1.04v4a1.041 1.041 0 0 0 1.039 1.041 1.042 1.042 0 0 0 1.04-1.04v-4a1.042 1.042 0 0 0-1.04-1.043z"
                    data-name="Error icon"
                />
            </svg>
        </span>
        <span data-test="error-message" class="form-group__message">{{ errorMessage }}</span>
    </div>
</template>

<script>
export default {
    props: {
        errorMessage: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss">
.form-group {
    &__errors {
        align-items: center;
        display: flex;
        margin-top: 0.3em;
    }

    &__icon {
        align-items: center;
        display: flex;
        fill: color('red');
        margin-right: 0.4em;

        svg {
            width: 12px;
        }
    }

    &__message {
        color: color('red');
        font-size: 0.7em;
        left: 20px;
        text-align: left;
        top: 3px;
        transition: all 0.3s;
    }
}
</style>
