import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import Vuex from 'vuex'

Vue.use(Vuex)

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        Options: {customProperties: true},
        themes: {
            light: {
                primary: "#E87373",
                secondary: "#7367F0",
                custom: "#001AFF",
                binary: "#D6D5D5",
                cancel: "#EA5455",
                grey: "#9E9E9E",
                yellow: "#FBC02D",
                blue: "#1565C0",
                background: "#F5F5F5"
            }
        }
    }
});
