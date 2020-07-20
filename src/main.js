import Vue from 'vue';
import iView from 'iview';
import router from './router';

// import 'babel-polyfill';
// import './libs/filter';
import './permission';
import BaseService from './service/BaseServive';

import App from './app.vue';
import alert from './components/MessageBox/alert';
import confirm from './components/MessageBox/confirm';
import BaseTable from "./components/Table/myTable";
// 总定义全局组建
import '@/components/customComponent';


import 'iview/dist/styles/iview.css';
// 引入样式
import 'vue-easytable/libs/themes-base/index.css';
//引入阿里巴巴图标
// import './assets/iconfont/iconfont.css';


Vue.use(iView);
Vue.use(alert);
Vue.use(confirm);
Vue.use(BaseTable);
Vue.prototype.$ajax = BaseService;


new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
