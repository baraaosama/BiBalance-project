<template>
  <div class="landingPage">
    <div class="container text-center text-lg-end d-flex  flex-row-reverse align-items-center">
      <img src="@/assets/images/thinking.png" alt="logo" class="d-none d-lg-block">
      <div class="landingContent">
        <h2>تحكم و طور من حياتك من خلال التمارين و الالعاب المخصصة لك</h2>
        <p>قم باجراء الاختبار لتحدد حالتك و الحصول علي التمارين المناسبة لك</p>
        <div class="btn" ><router-link :to="{name: 'test'}" style="color: white">ابدأ الان</router-link></div>
      </div>
    </div>
  </div>
  <div class="section2 py-5">
    <div class="container d-flex justify-content-between align-items-center p-3 gap-5">
        <div class="content  text-center  text-lg-end ">
            <p class="fs-lg-2">لتحسين و متابعه حالتك لحظه بلحظه حمل التطبيق الان لتتمتع بجميع المميزات</p>
            <div class="btn">حمل الان</div>
        </div>
        <img src="@/assets/images/mobile.png" alt="" class="d-none d-lg-block">
    </div>
 </div>
 <!-- sec3  -->
 <div class="sec3 py-5">
    <div class="container d-flex flex-column-reverse flex-lg-row-reverse align-items-center justify-content-around justify-content-lg-between text-center text-lg-end">
        <img src="@/assets/images/traning.png" alt="">
        <div class="content">
        نقدم مجموعه من التمارين والالعاب المصممه خصيصا لتحسين حالتك العاطفيه والعقليه
        </div>
    </div>
 </div>
 <!-- sec4  -->
 <div class="sec4 py-5">
    <div class="container d-flex flex-column flex-lg-row align-items-center justify-content-between gap-5 text-center text-lg-end">
        <img @mouseover="changelogo()" @mouseleave="resetLogo()"  :src="logo" alt="" class="animate-logo">
        <div class="content">
            <p>استمتع بالالعاب التي  تساعدك علي التركيز والتحكم في المشاعر الان</p>
            <div class="btn">ابدأ الان</div>
        </div>
    </div>
 </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      logo: require('@/assets/images/animatLogo.png'),
      token: this.$store.state.token,
    };
  },
  methods: {
    changelogo() {
      this.logo = require('@/assets/images/animated-logo.png');
    },
    resetLogo() {
      this.logo = require('@/assets/images/animatLogo.png');
    }
  },
  created() {
    if(this.token){
            axios.get('http://127.0.0.1:8000/api/profile', {
                headers: {
                    Authorization: `Bearer ${this.$store.state.token}`
                }
            }).then((response) => {
                this.$store.dispatch('setUser', response.data.data.profile);
            }).catch((error) => {
                console.log(error);
            });
    }
  }
  
}
</script>

<style>
@import '@/assets/styles/all.min.css';
@import '@/assets/styles/bootstrap.min.css';
@import '@/assets/styles/style.css';
</style>