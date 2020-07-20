import BaseTable from "./Table.vue";

let myTable = {
    install: function (Vue) {
        Vue.component("BaseTable", BaseTable);
    }
};
export default myTable;
