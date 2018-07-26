import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld';
import WriteArticle from '@/components/pages/writeArticle';
import ReadArticle from '@/components/pages/readArticle';
import Register from '@/components/pages/register';
import PersonalPage from '@/components/pages/personalpage';
import CreateCommunity from '@/components/pages/createcommunity';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/WriteArticle',
      name: 'WriteArticle',
      component: WriteArticle
    },
    {
      path: '/readArticle',
      name: 'readArticle',
      component: ReadArticle
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/PersonalPage',
      name: 'PersonalPage',
      component:PersonalPage
    },
    {
      path: '/CreateCommunity',
      name: 'CreateCommunity',
      component:CreateCommunity
    }
  ]
})
