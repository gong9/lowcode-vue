import LowCodeTable from "./src";

LowCodeTable.install = function (Vue) {
  Vue.component(LowCodeTable.name, LowCodeTable);
};

export default LowCodeTable;
