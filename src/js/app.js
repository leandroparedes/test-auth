// Import Vue
import Vue from 'vue';

// Import Framework7
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';

// Import App Component
import App from '../components/app.vue';

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

// Init Firebase
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAS7IKbbpDbyl9_Y8ImIJRTLuHnKUa9N_Y",
  authDomain: "test-auth-d4c7e.firebaseapp.com",
  databaseURL: "https://test-auth-d4c7e.firebaseio.com",
  projectId: "test-auth-d4c7e",
  storageBucket: "test-auth-d4c7e.appspot.com",
  messagingSenderId: "691660665332",
  appId: "1:691660665332:web:68ff24b44dfef4ddfec9a1"
};

firebase.initializeApp(firebaseConfig);

Vue.prototype.$firebase = firebase;

// Init App
new Vue({
  el: '#app',
  render: (h) => h(App),

  // Register App Component
  components: {
    app: App
  },
});