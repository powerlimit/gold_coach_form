var app = new Vue({
  el: '#form-app',
  data: {
    message: 'Hello Vue!',
    show: false,
    step: 1,
    name: '',
    phone: '',
    email: '',
    showMore: false,
    uid: null,
    basePrice: 7,
    item12: false,
    item39: false,
  },
  watch: {
    show (val) {
      let body = document.querySelector('body');
      body.style.overflow = val ? 'hidden' : 'visible';
    }
  },
  computed: {
    total () {
      let total = this.basePrice;
      total += this.item12 ? 12 : 0;
      total += this.item39 ? 39 : 0;
      return total;
    },
    /**
     * Place to set uid values based on selected products
     * @returns {number}
     */
    value () {
      switch (this.total) {
        case 7:
          return 1;
        case 19:
          return 2;
        case 46:
          return 3;
        default:
          return 4;
      }
    }
  },
  methods: {
    handleSubmit () {
      document.querySelectorAll('input').forEach(el => {
        el.style.borderColor = '#b6b6b6'
      });
      const re = /\S+@\S+\.\S+/;
      const isValid = re.test(this.email);
      if (this.step === 1) {
        if (!this.name) {
          document.querySelector('input[name=name]').style.borderColor = 'red'
        }
        if (!this.email) {
          document.querySelector('.email-input').style.borderColor = 'red'
        } else {
          if (!isValid) {
            document.querySelector('.email-input').style.borderColor = 'red';
            alert('Введите корректный email.');
            return false;
          }
        }
        if (!this.phone) {
          document.querySelector('input[name=phone]').style.borderColor = 'red'
        }
        if (!this.name || !this.phone || !this.email) {
          alert('Все поля обязательны для заполнения!');
          return false
        }
        this.step = 2;
        return false
      } else {
        document.querySelector('.f-form').submit();
      }
    }
  }
});

document
  .querySelector('.js-open-form')
  .addEventListener('click', () => {
  app.show = true;
});