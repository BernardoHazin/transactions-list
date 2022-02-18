// @ts-ignore
import { createApp, provide, h } from 'vue'
import App from './App.vue'
import apolloClient from './apollo-client'
import { DefaultApolloClient } from '@vue/apollo-composable'
import router from './router'

createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App)
})
  .use(router)
  .mount('#app')
