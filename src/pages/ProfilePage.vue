<template>
    <div class="profile-banner">
        <div class="container pt-4 d-sm-flex align-items-center text-center text-sm-end">
            <svg xmlns="http://www.w3.org/2000/svg" width="157" height="157" viewBox="0 0 157 157" fill="none">
                <g clip-path="url(#clip0_604_10990)">
                  <rect width="157" height="157" rx="78.5" fill="#666666"/>
                  <mask id="mask0_604_10990" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="9" width="190" height="189">
                    <circle cx="98.91" cy="103.62" r="94.2" fill="#403F3F"/>
                  </mask>
                  <g mask="url(#mask0_604_10990)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M77.4567 85.6366C78.1529 85.5494 78.9362 85.5494 79.5454 85.6366C94.8624 85.1136 106.959 72.5623 107.046 57.1347C107.046 41.3585 94.2532 28.5457 78.501 28.5457C62.6618 28.5457 49.9556 41.3585 49.9556 57.1347C49.9556 72.5623 62.1396 85.1136 77.4567 85.6366ZM78.5033 156.999C97.0578 156.999 119.323 149.765 132.026 135.59C131.312 127.416 121.607 118.04 113.971 111.779C94.5601 95.9518 62.5892 95.9518 43.0355 111.779C35.3996 118.04 25.6941 127.416 24.9805 135.59C37.6832 149.765 59.9487 156.999 78.5033 156.999Z" fill="#AEAEAE"/>
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_604_10990">
                    <rect width="157" height="157" rx="78.5" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <div class="content me-sm-5 mt-3">
                <h2 v-if="user">{{ user.name }}</h2>
                 <p v-if="user">{{ user.email }}</p>   
              </div>
        </div>
     </div>
     <div class="profile-info " v-if="profile == 'user'">
        <div class="progress">
            <div class="prog" :style="{width: this.getFullScoreonPercentage()}"></div>
        </div>
        <span class="prec">{{ this.getFullScoreonPercentage() }}</span>
       <div class="container d-flex flex-column justify-content-around flex-wrap align-content-center align-content-sm-start">
        <div class="item">
            <img src="@/assets/images/profile/star.png" alt=""> <span> التمارين</span>
        </div>
        <div class="item">
            <img src="@/assets/images/profile/list.png" alt=""> <span>قائمه المهام</span>
        </div>
        <div class="item">
            <img src="@/assets/images/profile/lock.png" alt=""> <span>كلمه المرور</span>
        </div>
        <div class="item logout" @click="logout()">
            <img src="@/assets/images/profile/lougout.png" alt=""> <span>تسجيل الخروج</span>
        </div>
       </div>
    
     </div>
     <div class="profile-info " v-if="profile == 'doctor'">
       <div class="container d-flex flex-column justify-content-around flex-wrap align-content-center align-content-sm-start">
        <div class="item">
            <img src="@/assets/images/doc/call.png" alt=""> <span> رقم الهاتف</span>  <div class="info" v-if="user">{{ user.mobile_number }}</div>
        </div>
        <div class="item">
            <img src="@/assets/images/doc/Vector.png" alt=""> <span>عنوان العياده</span> <div class="info" v-if="user"><span v-for="info in user.clinics" :key="info.id">{{ info.government }} . {{ info.city }} . {{ info.street }}</span></div>
        </div>
        <div class="item">
            <img src="@/assets/images/doc/empty-wallet-time.png" alt=""> <span>الاشتراك</span> <div class="info">6شهور ينتهي في 9/9/2024</div>
        </div>
        <div class="item">
            <img src="@/assets/images/doc/setting-2.png" alt=""> <span>الاعدادات</span>
        </div>
        <div class="item">
            <img src="@/assets/images/profile/lock.png" alt=""> <span>كلمه المرور</span>
        </div>
        <div class="item" @click="doctorLogout()">
            <img src="@/assets/images/profile/lougout.png" alt=""> <span class="text-danger">تسجيل الخروج</span>
        </div>
       </div>
    
     </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            token: this.$store.state.token,
            user: this.$store.state.user,
            fullScore: this.$store.state.fullScore,
            profile: null,
        };
    },
    created() {
        if(!this.token){
            this.$router.push({ name: 'login' });
        }
    },
    mounted() {
        if(!this.token){
            this.$router.push({ name: 'login' });
        }else if(this.token){
            this.profile = localStorage.getItem('profile')
            console.log(this.profile)
            if(this.profile == 'user'){
                axios.get('http://127.0.0.1:8000/api/profile', {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.token}`
                    }
                }).then((response) => {
                    localStorage.setItem('user', response.data.data.profile);
                    this.$store.dispatch('setUser', response.data.data.profile);
                    this.user = this.$store.state.user;
                }).catch((error) => {
                    console.log(error);
                });
            }else if(this.profile == 'doctor'){
                axios.get('http://127.0.0.1:8000/api/doctor-profile', {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.token}`
                    }
                }).then((response) => {
                    console.log(response)
                    localStorage.setItem('user', response.data.data['doctor-info']);
                    this.$store.dispatch('setUser', response.data.data['doctor-info']);
                    this.user = this.$store.state.user;
                }).catch((error) => {
                    console.log(error);
                });
            }
    }
    },
    methods: {
        logout() {
            if(this.token){
                console.log(this.$store.state.token);
                console.log(this.token);
            axios.post('http://127.0.0.1:8000/api/logout',{},{
                headers: {
                    Authorization: `Bearer ${this.$store.state.token}`
                }
            }).then((res) => {
                localStorage.removeItem('token');
                console.log(res);
                this.$store.dispatch('setToken', null);
                this.$router.push({ name: 'home' });
            })
            .catch((error) => {
                console.log(error);
            });
            }
        },
        doctorLogout() {
            if(this.token){
                console.log(this.$store.state.token);
                console.log(this.token);
            axios.post('http://127.0.0.1:8000/api/doctor-logout',{},{
                headers: {
                    Authorization: `Bearer ${this.$store.state.token}`
                }
            }).then((res) => {
                localStorage.removeItem('token');
                localStorage.removeItem('DoctorStatus');
                console.log(res);
                this.$store.dispatch('setToken', null);
                this.$router.push({ name: 'home' });
            })
            .catch((error) => {
                console.log(error);
            });
            }
        },
        getFullScoreonPercentage(){
            return (this.fullScore / 32) * 100 + '%';
        }
    },
}
</script>

<style scoped>
.profile-info .container {
    height: 465px;
}
.profile-info .container div {
    display: flex;
    align-items: center;
    width: unset;
}
.profile-info .container img {
    width: 40px;
}
.profile-info .item .info {
    font-size: 20px;
    font-weight: 500;
    color:  rgba(130, 130, 130, 1);
    margin-right: 30px;
}
.profile-info .item .info span{
    font-size: 20px;
    font-weight: 500;
    color:  rgba(130, 130, 130, 1);
}
.profile-info .container span {
    color: rgba(22, 72, 99, 1);
    font-size: 25px;
    font-weight: 600;
    margin-right: 15px;
}
</style>