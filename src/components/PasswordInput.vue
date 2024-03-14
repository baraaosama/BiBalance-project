<template>
  <div class="password-input">
    <label :for="id" class="form-label mb-3"><i class="fa-solid ms-2 fa-lock"></i> {{ label }}</label>
    <input
        v-model="password"
        @input="emitPassword"
      :id="id"
      :class="{'error': error}"
      :type="showPassword ? 'text' : 'password'"
      class="form-control text-end"
        :placeholder="placeholder"
    />
    <i class="bi bi-eye-slash" :class="{'bi-eye' : showPassword}" @click="toggleShowPassword" id="togglePassword"></i>
  </div>
</template>

<script>
import 'bootstrap-icons/font/bootstrap-icons.css';
export default {
  data() {
    return {
        password: '',
      showPassword: false
    };
  },
  props: {
    label: {
      type: String,
      default: 'Password'
    },
    id: {
      type: String,
      default: 'password'
    },
    placeholder: {
      type: String,
      default: 'Enter your password'
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    emitPassword() {
      this.$emit('password-change', this.password);
    }
  }
};
</script>
<style scoped>
.password-input{
    position: relative;
}
.password-input > i{
    position: absolute ;
    left: 10px;
    top: 47px;
}
.error{
    border: 1px solid red !important;
}
</style>