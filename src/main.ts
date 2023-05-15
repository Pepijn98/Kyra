import { Buffer } from "buffer";
import { createPinia } from "pinia";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
import { ViteSSG } from "vite-ssg";
import { watch } from "vue";

import App from "~/App.vue";
import { type UserModule } from "~/types";

import "normalize.css";
import "~/style.css";

const routes = setupLayouts(generatedRoutes);

export const createApp = ViteSSG(
    App,
    { routes, base: import.meta.env.BASE_URL },
    (ctx) => {
        Object.values(import.meta.glob<{ install: UserModule }>("./modules/*.ts", { eager: true })).forEach((module) => module.install(ctx));
        const pinia = createPinia();
        ctx.app.use(pinia);

        if (ctx.isClient) {
            window.Buffer = Buffer;
            watch(
                pinia.state,
                (state) => {
                    localStorage.setItem("user-state", Buffer.from(JSON.stringify(state.user)).toString("base64"));
                },
                { deep: true}
            );
        }
    }
);
