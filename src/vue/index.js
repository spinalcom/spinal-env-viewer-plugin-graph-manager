import Store from './store';
import App from './App.vue';
import Vue from 'vue';

let GraphManagerVue = Vue.extend( {
  render: h => h( App ),
  methods: {
    opened: function () {

    },
    closed: function () {

    },
    removed: function () {
    }
  },
  store: Store
} );

export {
  GraphManagerVue,
  Store
};

