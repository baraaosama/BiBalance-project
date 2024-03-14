<template>
    <div class="loginPage  ">
        <div class="container d-flex flex-column flex-sm-row ">
             <form @submit.prevent="login()">
                <div class="title">تسجيل الدخول</div>
                <p class="error-message" v-if="error">{{ errorMessage }}</p>
                <div class="mb-4 text-end">
                    <label for="email" class="form-label mb-3 "><i class="fa-solid ms-2 fa-user"></i>اسم المستخدم</label>
                    <input :class="{'error': emailError}" v-model="email" type="text" class="form-control  text-end" id="email" placeholder="ادخل اسم المستخدم ">
                </div>
                <div class="mb-5 text-end">
                    <password-input :error="passError" @password-change="handlePasswordChange" v-model="password" id="password" label="كلمه المرور" placeholder="ادخل كلمه المرور"></password-input>
                 </div>
                
                 
                 <input class="btn" value="تسجيل الدخول" type="submit">
                 <p class="text-center">ليس لديك حساب؟<router-link :to="{ name: 'register'}">انشاء حساب</router-link></p>
             </form>
            <div class="image ">
                <img src="@/assets/images/login/image.png" class="logoo" alt="">
                <img src="@/assets/images/login/title.png" class="ulogoo" alt="">
            </div>
            
        </div>
    </div>
</template>

<script>
import PasswordInput from '@/components/PasswordInput.vue';
import axios from 'axios';
import swal from 'sweetalert2';
export default {
    components: {
        PasswordInput
    },
    data() {
        return {
            password: '',
            email: '',
            error: false,
            errorMessage: '',
            passError: false,
            emailError: false ,
            role: null,
        };
    },
    methods: {
        handlePasswordChange(password) {
            this.password = password;
        },
        validateEmail() {
            if (this.email === '') {
                this.error = true;
                this.errorMessage = 'البريد الالكتروني مطلوب';
                this.emailError = true;
                return false;
            } else {
                this.error = false;
                this.errorMessage = '';
                this.emailError = false;
                return true;
            }
        },
        validatePassword() {
            if (this.password === '') {
                this.error = true;
                this.errorMessage = 'كلمه المرور مطلوبه';
                this.passError = true;
                return false;
            } else {
                this.error = false;
                this.errorMessage = '';
                this.passError = false;
                return true;
            }
        }, 
        login() {
            this.validateEmail();
            this.validatePassword();
            if (!this.validateEmail() || !this.validatePassword()) {
                return;
            }
            axios.post('http://127.0.0.1:8000/api/login', {
                email: this.email,
                password: this.password
            }).then((response) => {
                if(response.data.success != false){
                    swal.fire({
                        icon: 'success',
                        title: 'تم تسجيل الدخول بنجاح',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    console.log(response.data.data.token)
                    localStorage.setItem('profile', 'user');
                    this.$store.dispatch('setProfile', 'user');
                    localStorage.setItem('token', response.data.data.token);
                this.$store.dispatch('setToken', response.data.data.token);
                this.role = response.data.data.role;
            axios.get('http://127.0.0.1:8000/api/getTotalScore', {
                headers: {
                    Authorization: `Bearer ${this.$store.state.token}`
                }
            }).then((response) => {
                console.log(response.data.data.totalScore);
                this.$store.dispatch('setFullScore', response.data.data.totalScore);
            }).catch((error) => {
                console.log(error);
            });
            if(this.role == 'admin' || this.role == 'super-admin'){
                this.$router.push({ name: 'members' });
            }else{
                this.$router.push({ name: 'home' });
            }
                }else{
                    this.error = true;
                    this.errorMessage = response.data.message.errorMessage;
                    
                }
            }).catch((error) => {
                console.log(error);
                this.error = true;
                this.errorMessage = error.response.data.message;
            });
        }
    }
}
</script>
<style scoped>
@media (min-width: 1200px){
    .container, .container-lg, .container-md, .container-sm, .container-xl {
        max-width: 1240px;
    }
}
.error-message {
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
    text-align: center;
}
.error {
    border: 1px solid red !important;
}
</style>

