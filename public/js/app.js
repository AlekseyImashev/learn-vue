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
        if (field) {
            delete this.errors[field];

            return;
        } 

        this.errors = {};
    }
}

class Form {
    /**
     * Create a new form instance.
     * 
     * @param {object} data 
     */
    constructor(data) {
        this.originalData = data;

        for(let field in data) {
            this[field] = data[field];
        }

        this.errors = new Errors();
    }

    /**
     * Fetch all relevant data for the form.
     */
    data() {
        let data = Object.assign({}, this);

        delete data.originalData;
        delete data.errors;

        return data;
    }

    /**
     * Reset the form fields.
     */
    reset() {
        for(let field in this.originalData) {
            this[field] = '';
        }
        
        this.errors.clear();
    }

    /**
     * Submit the form.
     * 
     * @param {string} requestType 
     * @param {string} url 
     */
    submit(requestType, url) {
        axios[requestType](url, this.data())
                .then(this.onSuccess.bind(this))
                .catch(this.onFail.bind(this))
    }

    /**
     * Handle a successful form submissions.
     * 
     * @param {object} response 
     */
    onSuccess(response) {
        alert(response.data.message);

        this.reset();
    }

    /**
     * Handle a failed form submission.
     * 
     * @param {object} error 
     */
    onFail(error) {
        this.errors.record(error.response.data);
    }
}

new Vue({
    el: '#app',

    data: {
        form: new Form({
            name: '',
            description: ''
        })
    },

    methods: {
        onSubmit() {
            this.form.submit('post', '/projects');
        }
    }
});