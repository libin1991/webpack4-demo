import Vue from 'vue';
import {AppContainer} from '@stu/components';

import router from '@stu/router';
console.log(AppContainer);
setTimeout(() => {
  console.log(AppContainer);
}, 5000);
console.log(router);

new Vue({
  el: '#root',
  router,
  components: { AppContainer },
  render(h) {
    return h(AppContainer, null, [h('router-view')]);
  },
});
