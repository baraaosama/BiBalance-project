<template>
    <div class="content d-flex">
    <div class="setting ">
        <div class="item"><img src="@/assets/images/list/people.png" alt=""><router-link :to="{name: 'members'}">الاعضاء</router-link></div>
        <div class="item"><img src="@/assets/images/list/radio.png" alt=""><router-link :to="{name: 'dashboard-practice'}">التمارين</router-link></div>
    </div>
    <div class="newMember w-100 my-3 ">
       <div class="container">
         <div class="banner d-flex justify-content-between">
            <div class="title">
                <img src="@/assets/images/list/profile-2user.png" alt="">الاعضاء
            </div>
            <div class="btn" @click="openModal('roleMode')">+ اضافه عضو جديد</div>
        </div>
        <div class="box mt-5">
            <div class="admins d-flex justify-content-between" v-for="admin in admins" :key="admin.id">                                                            
                <div class="right">
                    <img src="@/assets/images/user.png" alt="">
                    <span>{{ admin.username }}</span>
                </div>   
                <div class="left">
                    <span>{{ admin.role }}</span>
                    <img src="@/assets/images/list/edit-2.png" alt="" @click="openModal('updateRole')">
                    <img src="@/assets/images/list/trash.png" alt="" @click="deleteRole(admin.id)">
                </div>
            </div>
        </div>
       </div>
    </div>
   </div>
   <div class="popup" v-if="showModal && addRoleMode">
            <form class="row g-3 " @submit.prevent="addRole()">
                <div class="row" style="position: relative;">
                    <div class="close" @click="closeModal('roleMode')">X</div>
                    <div class="col-12 mx-auto">
                        <div class="title text-center">اضافه عضو جديد</div>
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">البريد الالكتروني</label>
                    <input type="email" v-model="email" class="form-control" id="inputEmail4">
                </div>
                <div class="col-md-6 ms-auto">
                    <label for="inputState" class="form-label">الدور</label>
                    <select id="inputState" class="form-select" v-model="role">
                        <option value='admin' selected>Admin</option>
                        <option value="super-admin">Super Admin</option>
                        <option value="user">user</option>
                    </select>
                </div>
                 <div class="col-12 mx-auto">
                    <input type="submit" class="btn" value="اضافه">
                </div>
            </form>
   </div>
    <div class="popup" v-if="showModal && updateRoleMode">
            <form class="row g-3 " @submit.prevent="updateRole()">
                <div class="row" style="position: relative;">
                    <div class="close" @click="closeModal('updateRole')">X</div>
                    <div class="col-12 mx-auto">
                        <div class="title text-center">تعديل بيانات عضو</div>
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">البريد الالكتروني</label>
                    <input type="email" v-model="email" class="form-control" id="inputEmail4">
                </div>
                <div class="col-md-6 ms-auto">
                    <label for="inputState" class="form-label">الدور</label>
                    <select id="inputState" class="form-select" v-model="role">
                        <option value='admin' selected>Admin</option>
                        <option value="super-admin">Super Admin</option>
                        <option value="user">user</option>
                    </select>
                </div>
                 <div class="col-12 mx-auto">
                    <input type="submit" class="btn" value="تعديل">
                </div>
            </form>
   </div>

   <div class="modal-back" v-if="showModal">
   </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';
export default {
    data() {
        return {
            showModal: false,
            token: this.$store.state.token,
            email: null,
            role: null,
            addRoleMode: false,
            updateRoleMode: false,
            admins: [],
        };
    },
    methods: {
        openModal( mode) {
            this.showModal = true;
            if(mode === 'roleMode'){
                this.addRoleMode = true;
            }else if(mode === 'updateRole'){
                this.updateRoleMode = true;
            }
        },
        closeModal(mode) {
            this.showModal = false;
            if(mode === 'roleMode'){
                this.addRoleMode = false;
            }else if(mode === 'updateRole'){
                this.updateRoleMode = false;
            }
        },
        addRole() {
            console.log(this.email, this.role);
            if (!this.email || !this.role) {
                return;
            }
            axios.post('http://127.0.0.1:8000/api/add-role', {
                email: this.email,
                role: this.role,
            }, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            }).then(() => {
                this.getAdmins();
                this.showModal = false;

            }).catch((err) => {
                console.log(err);
            });
        },
        getAdmins(){
            axios.get('http://127.0.0.1:8000/api/roles', {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        }).then((res) => {
            this.admins = res.data.data;
        }).catch((err) => {
            console.log(err);
        });
        },
        updateRole(){
            axios.put('http://127.0.0.1:8000/api/update-role', {
                email: this.email,
                role: this.role,
            },
            {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            }).then(() => {
                this.getAdmins();
                this.showModal = false;
            }).catch((err) => {
                console.log(err);
            });
        },
        deleteRole(id){
            console.log(id);
            swal.fire({
                title: 'هل تريد حذف هذا العضو؟',
                showCancelButton: true,
                confirmButtonColor: 'white',
                cancelButtonColor: '#164863',
                confirmButtonText: 'نعم',
                cancelButtonText: 'لا',
            }).then((alertResult) => {
                if(alertResult.isConfirmed){
                    console.log('delete');
                axios.delete(`http://127.0.0.1:8000/api/delete-role/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            }).then(() => {

                this.getAdmins();
            }).catch((err) => {
                console.log(err);
            });
                }
            });
        }
    },
    mounted() {
        this.getAdmins();
    },
}
</script>

<style scoped>
a{
    color:white;
}
.popup{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
}
.close{
    padding: 0;
    position: absolute;
    top: -20px;
    right: -20px;
    font-size: 20px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal-back{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
}
.popup {
    width: 70%;
    box-shadow: 0px 0px 13.899999618530273px 1px rgba(0, 0, 0, 0.15);
    border-radius: 24px;
    max-width: 600px;
}
.popup form {
    padding: 40px;
}
.popup form input ,
.popup form select {
    background-color: rgba(236, 236, 236, 1);
    height: 50px;
    margin-bottom: 20px;

}
.popup form label {
    font-size: 24px;
    font-weight: 600;
    color:rgba(22, 72, 99, 1);

}
.popup form .title{
    font-size: 32px;
    font-weight: 700;
    color: rgba(22, 72, 99, 1);
    margin-bottom: 20px;

}
input.btn{
    background-color: #164863 !important;
    color: white;
}
@media (max-width: 991px){
    .close{
        right: -4%;
    }
}
@media (max-width: 768px){
    .close{
        right: -5%;
    }
}

</style>