<template>
    <div class="RegisterPage">
        <div class="container d-flex flex-column flex-sm-row ">
             <form @submit.prevent="register()" style="height: 600px;">
                <div class="title mb-3">انشاء حساب</div>
                <p class="error-message" v-if="error">{{ errorMessage }}</p>
                <div class="mb-3 text-end">
                    <label for="user-name" class="form-label mb-3 "><i class="fa-solid ms-2 fa-user"></i>اسم المستخدم</label>
                    <input type="text" v-model="userName" :class="{'error': userNameError}" class="form-control  text-end" id="user-name" placeholder="ادخل اسم المستخدم ">
                 </div>
                <div class="mb-3 text-end">
                    <label for="email" class="form-label mb-3 "><i class="fa-solid ms-2 fa-envelope"></i>البريد الالكتروني</label>
                    <input type="text" v-model="email" :class="{'error': emailError}" class="form-control  text-end" id="email" placeholder="ادخل بريدك الالكتروني">
                 </div>
                 <div class="mb-3 text-end">
                    <password-input :error="passError" @password-change="handlePasswordChange" v-model="password" id="password" label="كلمه المرور" placeholder="ادخل كلمه المرور"></password-input>
                 </div>
                 <div class="mb-3 text-end">
                    <password-input :error="confirmPassError" @password-change="handleConfirmPasswordChange" v-model="confirmPassword" id="password-confirm" label="تاكيد كلمه المرور" placeholder="ادخل كلمه المرور مره أخرى"></password-input>
                 </div>
                 <input class="btn" value="إنشاء حساب" type="submit">
                 <p class="text-center">لديك حساب بالفعل؟<router-link :to="{name: 'login'}">تسجيل دخول</router-link></p>
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
export default {
    components: {
        PasswordInput
    },
    data() {
        return {
            password: '',
            confirmPassword: '',
            email: '',
            userName: '',
            error: false,
            errorMessage: '',
            passError: false,
            emailError: false ,
            confirmPassError: false,
            userNameError: false,
        };
    },
    methods: {
        handlePasswordChange(password) {
            this.password = password;
        },
        handleConfirmPasswordChange(password) {
            this.confirmPassword = password;
        },
        validateUserName() {
            if (this.userName === '') {
                this.error = true;
                this.errorMessage = 'اسم المستخدم مطلوب';
                this.userNameError = true;
                return false;
            } else {
                this.error = false;
                this.errorMessage = '';
                this.userNameError = false;
                return true;
            }
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
        validateConfirmPassword() {
            if (this.confirmPassword === '') {
                this.error = true;
                this.errorMessage = 'تاكيد كلمه المرور مطلوب';
                this.confirmPassError = true;
                return false;
            } else {
                this.error = false;
                this.errorMessage = '';
                this.confirmPassError = false;
                return true;
            }
        },
        register() {
            this.validateUserName();
            this.validateEmail();
            this.validatePassword();
            this.validateConfirmPassword();
            if (!this.validateUserName() || !this.validateEmail() || !this.validatePassword() || !this.validateConfirmPassword()) {
                return;
            }
            axios.post('http://127.0.0.1:8000/api/register', {
                name: this.userName,
                email: this.email,
                password: this.password,
                password_confirmation: this.confirmPassword
            }).then((response) => {
                localStorage.setItem('token', response.data.data.token);
                this.$store.commit('setToken', localStorage.getItem('token'));
                this.$router.push({name: 'home'});
                
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