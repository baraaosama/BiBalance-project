import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import PracticePage from '@/pages/PracticePage.vue'
import TestPage from '@/pages/TestPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import DoctorPage from '@/pages/DoctorPage.vue'
import DoctorSubscription from '@/pages/DoctorSubscription.vue'
import DoctorLogin from '@/pages/DoctorLogin.vue'
import ErrorPage from '@/pages/ErrorPage.vue'
import MemebersPage from '@/pages/DashBoard/MembersPage.vue'
import DashPractise from '@/pages/DashBoard/DashPractise.vue'
import ActivityPage from '@/pages/DashBoard/ActivityPage.vue'
import DoctorDash from  '@/pages/DashBoard/DoctorDash.vue'
import SubscriptionDash from '@/pages/DashBoard/SubscriptionDash.vue'



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/practice',
    name: 'practice',
    component: PracticePage
  },
  {
    path: '/test',
    name: 'test',
    component: TestPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage
  },
  {
    path: '/doctors',
    name: 'doctor',
    component: DoctorPage
  },
  {
    path: '/doctor-subscription',
    name: 'doctor-subscription',
    component: DoctorSubscription
  },
  {
    path: '/doctor-login',
    name: 'doctor-login',
    component: DoctorLogin
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    children: [
      {
        path: 'members',
        name: 'members',
        component: MemebersPage
      },
      {
        path: 'practice',
        name: 'dashboard-practice',
        component: DashPractise
      },
      {
        path: 'activity/:id',
        name: 'activity',
        component: ActivityPage
      },
      {
        path: 'doctors',
        name: 'doctors-dash',
        component: DoctorDash
      },
      {
        path: 'doctors-subscription',
        name: 'subscription-dash',
        component: SubscriptionDash
      }
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error',
    component: ErrorPage
  }
  

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // Check if the user is navigating to the login page
  if (to.name === 'login' || to.name === 'register' || to.name === 'members' || to.name === 'dashboard-practice' || to.name === 'activity'){
    // Hide the header and footer components
    document.querySelector('nav').style.display = 'none';
    document.querySelector('.footer').style.display = 'none';
  } else {
    // Show the header and footer components for other pages
    document.querySelector('nav').style.display = 'block';
    document.querySelector('.footer').style.display = 'block';
  }
  if (to.name === 'test' || to.name === 'members' || to.name === 'dashboard-practice' || to.name === 'activity') {
    // Hide the header and footer components
    document.querySelector('.footer').style.display = 'none';
  } else {
    // Show the header and footer components for other pages
    document.querySelector('.footer').style.display = 'block';
  }
  next();
});


export default router
