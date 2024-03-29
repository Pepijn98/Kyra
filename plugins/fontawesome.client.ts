import { library, config } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

config.autoAddCss = false;

library.add(fab, far, fas);

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("fa-icon", FontAwesomeIcon);
});
