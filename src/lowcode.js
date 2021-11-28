import Vue from "vue";

import LowCodeForm from "./components/LowCodeForm";
import LowCodeFormSearch from "./components/LowCodeFormSearch";
import LowCodeTable from "./components/LowCodeTable";
import LowCodeFormItem from "./components/LowCodeFormItem";
import Fragment from "vue-fragment";

Vue.use(LowCodeForm);
Vue.use(LowCodeFormSearch);
Vue.use(LowCodeTable);
Vue.use(LowCodeFormItem);
Vue.use(Fragment.Plugin);
