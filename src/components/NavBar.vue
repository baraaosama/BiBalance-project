<template>
    <nav class="navbar navbar-expand-lg navbar-light ">
        <div class="container">
            <div class="im d-sm-none"><img src="@/assets/images/Logo.png " alt=""></div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse text-center  " id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
                    <li class="nav-item d-none d-lg-block">
                        <img src="@/assets/images/Logo.png" alt="Logo">
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'home' }" class="nav-link" exact :class="{ activeLink: $route.name === 'home' }"
                            aria-current="page">الرئيسيه
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'practice' }" class="nav-link" exact
                            :class="{ activeLink: $route.name === 'practice' }" aria-current="page">التمارين والالعاب</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'test' }" class="nav-link" exact
                            :class="{ activeLink: $route.name === 'test' }" aria-current="page">الاختبار</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'doctor' }" class="nav-link" exact
                            :class="{ activeLink: $route.name === 'doctor' }" aria-current="page">الاطباء</router-link>
                    </li>
                    <li class="nav-item">
                        <a  class="nav-link" 
                            >التوصيه</a>
                    </li>
                    <div class="buttons me-auto d-flex align-items-center profile" v-if="token">
                        <router-link :to="{name: 'profile'}"><img src="@/assets/images/user.png" alt=""></router-link>
                    </div>
                    <div class="buttons me-auto d-flex align-items-center" v-else>
                        <div class="btn register"><router-link :to="{name: 'register'}">انشاء حساب</router-link></div>
                        <div class="btn login"><router-link :to="{ name: 'login'}">تسجيل الدخول</router-link></div>
                    </div>
                </ul>
            </div>       
        </div>
    </nav>
</template>
<script>
export default {
  name: 'NavBar',
  data() {
    return {
      token: this.$store.state.token,
    };
  },
  watch: {
    '$store.state.token': function(newToken) {
      this.token = newToken;
    },
  },
  created() {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('setToken', localStorage.getItem('token'));
    }
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('setToken', localStorage.getItem('token'));
    }
    this.token = this.$store.state.token;
  },
};

</script>

<style>

</style>