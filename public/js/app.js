class Errors {
    /**
     * Create a new Errors instance.
     */
    constructor() {
        this.errors = {};
    }

    /**
     * Determine if an errors exists for the given field.
     * 
     * @param {string} field 
     */
    has(field) {
        return this.errors.hasOwnProperty(field);
    }
    
    /**
     * Ddetermine if we have any errors.
     */
    any() {
        return Object.keys(this.errors).length > 0;
    }

    /**
     * Retrieve the error message for a field.
     * 
     * @param {string} field 
     */
    get(field) {
        if (this.errors[field]) {
            return this.errors[field][0];
        }
    }

    /**
     * Record the new errors.
     * 
     * @param {object} errors 
     */
    record(errors) {
        this.errors = errors.errors;
    }

    /**
     * Clear one all error fields.
     * 
     * @param {string|null} field 
     */
    clear(field) {
        delete this.errors[field];
    }
}

new Vue({
    el: '#app',

    data: {
        name: '',
        description: '',
        errors: new Errors()
    },

    methods: {
        onSubmit() {
            axios.post('/projects', this.$data)
                    .then(this.onSuccess)
                    .catch(error => this.errors.record(error.response.data));
        },

        onSuccess(response) {
            alert(response.data.message);

            form.reset();
        }
        
    }
});