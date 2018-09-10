Vue.component('coupon', {
    props: ['value'],

    template: `
        <input type="text" 
               :value="value"
               @input="updateCode($event.target.value)"
               ref="input">
    `,

    data() {
        return {
            invalids: ['ALLFREE', 'SOMETHINGELSE']
        }
    },

    methods: {
        updateCode(code) {
            // Validation
            if (this.invalids.includes(code)) {
                alert('This coupon is no longer valid. Sorry!');

                this.$refs.input.value = code = '';
            }

            this.$emit('input', code);
        }
    }
});

new Vue({
    el: '#app',

    data: {
        coupon: 'FREEBIE'
    }
});