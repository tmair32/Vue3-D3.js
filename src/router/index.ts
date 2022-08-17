import { RouteRecordRaw } from "vue-router";

// const loadView = (view: string) => {
//   return () =>
//     import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
// };

const routes: Array<RouteRecordRaw> = [
  {
    path: "/chart",
    name: "Chart",
    component: () =>
      import(
        /* webpackChunkName: "view-[request]" */ `~/pages/charts/index.vue`
      ),
  },
];

export default routes;
