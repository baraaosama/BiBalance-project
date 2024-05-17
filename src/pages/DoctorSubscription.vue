<template>
    <div class="landinPage">
        <h2>الاشتراك</h2>
        <div class="number-row">
            <div class="number" :class="{'active': activeStep ==1, 'complete': activeStep > 1}">1</div>
            <div class="number" :class="{'active': activeStep ==2, 'complete': activeStep > 2}">2</div>
            <div class="number" :class="{'active': activeStep ==3, 'complete': activeStep > 3}">3</div>
            <div class="number" :class="{'active': activeStep ==4, 'complete': activeStep > 4, 'disable': permission == false}">4</div>
        </div>
        <div class="container">
            <form v-if="activeStep == 1">
                <div class="row" >
                    <div class="col-12 col-sm-6 mb-5">
                    <label for="" class="mb-2">الاسم</label>
                    <input type="text" class="form-control" v-model="name">
                    </div>
                    <div class="col-12 col-sm-6 mb-5">
                    <label for="" class="mb-2">البريد الالكتروني</label>
                    <input type="email" class="form-control" v-model="email">
                    </div>
                    <div class="col-12 col-sm-6 mb-5">
                    <label for="" class="mb-2">رقم الهاتف</label>
                    <input type="number" class="form-control" v-model="mobile_number">
                    </div>
                    <div class="col-12 col-sm-6 mb-5">
                    <label for="" class="mb-2">كلمه المرور</label>
                    <input type="password" class="form-control" v-model="password">
                    </div>
                    <div class="col-12 col-sm-6 mb-5">
                    <label for="" class="mb-2">اسم الجامعه</label>
                    <input type="text" class="form-control" v-model="university">
                    </div>
                    <div class="col-12 col-sm-6 mb-5">
                    <label for="" class="mb-2">سنه التخرج</label>
                    <input type="date" class="form-control" v-model="graduation_year">
                    </div>
                    <div class="col-12 col-sm-6 mb-5">
                    <label for="" class="mb-2">الرقم القومي</label>
                    <input type="number" class="form-control" v-model="ssn">
                    </div>
                    <div class="col-12 col-sm-6 mb-5">
                    <label for="" class="mb-2">صوره شخصيه</label>
                    <input type="file" class="form-control" @change="profileImageChange">
                    </div>
                    <div class="col-12 col-sm-6" style="margin: auto">
                    <input class="next" type="button" value="التالي" @click="nextStep()">
                    </div>
                </div>
            </form>
            <form  v-if="activeStep == 2">
            <div class="row">
                <div class="col-12 mb-5">
                <label for="" class="mb-2">صوره البطاقه الشخصيه</label>
                <input type="file" class="form-control" @change="ssnImageChange">
                </div>
                <div class="col-12 mb-5">
                <label for="" class="mb-2">صوره كارنيه النقابه</label>
                <input type="file" class="form-control" @change="cardImageChange">
                </div>
                <div class="col-12 col-sm-6 btn">
                    <input class="next" type="button" value="التالي" @click="submitInfo()">
                </div>
            
            </div>
            </form>
            <form v-if="activeStep == 3">
                <div class="row">
                    <div class="col-12 col-sm-6 mb-5">
                    <label for="" class="mb-2">المحافظه</label>
                    <input type="text" class="form-control" v-model="government">
                    </div>
                    <div class="col-12 col-sm-6 mb-5">
                    <label for="" class="mb-2">المنطقه</label>
                    <input type="text" class="form-control" v-model="city">
                    </div>
                    <div class="col-12 col-sm-6 mb-5">
                    <label for="" class="mb-2">الشارع</label>
                    <input type="text" class="form-control" v-model="street">
                    </div>
                    <div class="col-12 col-sm-6 mb-5">
                    <label for="" class="mb-2">العماره</label>
                    <input type="text" class="form-control" v-model="building_name">
                    </div>
                    <div class="col-12 col-sm-6 mb-5">
                    <label for="" class="mb-2">الدور</label>
                    <input type="text" class="form-control" v-model="floor">
                    </div>
                    <div class="col-12 col-sm-6 mb-5">
                    <label for="" class="mb-2">رقم التواصل</label>
                    <input type="text" class="form-control" v-model="mobile_number2">
                    </div>
                    <div class="col-12 col-sm-6 btn">
                    <input class="next" type="button" value="التالي" @click="submitAddress()">
                    </div>
                </div>
            </form>
            <div v-if="pending" class="pending">
                <h3 class="title">في انتظار الموافقه علي طلبك</h3>
                <img src="@/assets/images/doc/boowaiting.png" alt="">
            </div>
            <div class="row" v-if="activeStep == 4 && pending == false">
       
                <div class="col-12 col-lg-4 one">
                    <h2>سيلفر</h2>
                    <div class="card">
                        <h3>300</h3>
                        <p>جنيه/3شهور</p>
                        <div><img src="@/assets/images/doc/close-circle.png" alt="">حساب موثوق</div>
                        <div><img src="@/assets/images/doc/tick-circle.png" alt="">20 منشور</div>
                        <div><img src="@/assets/images/doc/tick-circle.png" alt="">5 كوبونات</div>
                        <div class="sub-btn" @click="showPayment(1)">اشترك</div>
                    </div>

                </div>
                <div class="col-12 col-lg-4 one ">
                    <h2>جولد</h2>
                    <div class="card diff">
                        <h3>600</h3>
                        <p>جنيه/6شهور</p>
                        <div><img src="@/assets/images/doc/close-circle.png" alt="">حساب موثوق</div>
                        <div><img src="@/assets/images/doc/tick-circle.png" alt="">50 منشور</div>
                        <div><img src="@/assets/images/doc/tick-circle.png" alt="">15 كوبونات</div>
                        <div class="sub-btn" @click="showPayment(2)">اشترك</div>
                    </div>

                </div>
                <div class="col-12 col-lg-4 one">
                    <h2>بلاتنيوم</h2>
                    <div class="card">
                        <h3>1000</h3>
                        <p>جنيه/سنويا</p>
                        <div><img src="@/assets/images/doc/tick-circle.png" alt="">حساب موثوق</div>
                        <div><img src="@/assets/images/doc/tick-circle.png" alt="">عدد منشورات غير محدود</div>
                        <div><img src="@/assets/images/doc/tick-circle.png" alt="">كوبونات غير محدوده</div>
                        <div class="sub-btn" @click="showPayment(3)">اشترك</div>
                    </div>

                </div>
                <div class="PayMent" v-if="paymentMode && paymentWay">
                    <div class="row">
                        <div class="col-12">
                            <h2>طريقه الدفع</h2>
                        </div>
                        <div class="col-4 d-flex align-items-center">
                            <img src="@/assets/images/doc/visa.png" alt="" @click="choosePaymentWay">
                        </div>
                        <div class="col-4">
                            <img src="@/assets/images/doc/instapay.png" alt="" @click="choosePaymentWay">
                        </div>
                        <div class="col-4">
                            <img src="@/assets/images/doc/vodafone.png" alt="" @click="choosePaymentWay">
                        </div>
                    </div>
                    <div class="row" v-if="showReset">
                        <h2>وصل الدفع</h2>
                        <div class="col-12">
                            <label for="reset" class="mb-2">Choose File</label>
                            <input type="file" id="reset" class="form-control" @change="resetImageChange">
                        </div>
                        <div class="payButton" @click="submitPayment()">رفع الصورة</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            activeStep: 4,
            permission: false,
            name: null,
            email: null,
            mobile_number: null,
            password: null,
            ssn: null,
            university: null,
            graduation_year: null,
            profile_image: null,
            ssn_image: null,
            card_image : null,
            doctor_id: null,
            government: null,
            city: null,
            street: null,
            floor: null,
            building_name: null,
            mobile_number2: null,
            pending: false,
            doctorStatus: null,
            planID: null,
            paymentMode: false,
            paymentWay: false,
            showReset: false,
            receipt: null
        }
    },
    methods: {
        nextStep() {
            if (this.activeStep == 1) {
                this.activeStep = 2
            } else if (this.activeStep == 2) {
                this.activeStep = 3
            } else if (this.activeStep == 3) {
                this.activeStep = 4
            }
        },
        submitInfo() {
        const formData = new FormData();
        formData.append('name', this.name);
        formData.append('email', this.email);
        formData.append('mobile_number', this.mobile_number);
        formData.append('password', this.password);
        formData.append('ssn', this.ssn);
        formData.append('university', this.university);
        formData.append('graduation_year', parseInt(this.graduation_year));
        formData.append('profile_image', this.profile_image);
        formData.append('ssn_image', this.ssn_image);
        formData.append('card_image', this.card_image);

        axios.post('http://127.0.0.1:8000/api/doctor', formData)
            .then(res => {
                this.doctor_id = res.data.data.doctor.id
                this.activeStep = 3
                localStorage.setItem('token', res.data.data.token);
                this.$store.dispatch('setToken', res.data.data.token);
            })
            .catch(err => {
            console.log(err);
            });
        },
        submitAddress() {
            const formData = new FormData();
            formData.append('government', this.government);
            formData.append('city', this.city);
            formData.append('street', this.street);
            formData.append('floor', this.floor);
            formData.append('building_name', this.building_name);
            formData.append('mobile_number', this.mobile_number2);
            formData.append('doctor_id', this.doctor_id);

            axios.post('http://127.0.0.1:8000/api/clinic', formData)
                .then(res => {
                    console.log(res)
                    this.pending = true
                    this.activeStep = 4
                })
                .catch(err => {
                console.log(err);
                });
        },
        profileImageChange(e) {
            console.log(e)
            this.profile_image = e.target.files[0]
        },
        ssnImageChange(e) {
            console.log(e)
            this.ssn_image = e.target.files[0]
        },
        cardImageChange(e) {
            console.log(e)
            this.card_image = e.target.files[0]
        },
        showPayment(id) {
            this.planID = id
            this.paymentMode = true
            this.paymentWay = true
        },
        resetImageChange(e) {
            console.log(e)
            this.receipt = e.target.files[0]
        },
        choosePaymentWay() {
            this.showReset = true
        },
        submitPayment() {
            const formData = new FormData();
            formData.append('plan_id', this.planID);
            formData.append('receipt', this.receipt);
            axios.post('http://127.0.0.1:8000/api/subscribe-plan', formData,
                {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.token}`
                    }
                }
            )
                .then(res => {
                    console.log(res)
                    this.$router.push({ name: 'profile' });
                })
                .catch(err => {
                console.log(err);
                });
        }
    },
    mounted() {
        this.doctorStatus = localStorage.getItem('DoctorStatus')
        if(this.doctorStatus == 'pending'){
            this.activeStep = 4
            this.pending = true
        }else if(this.doctorStatus == 'staging'){
            this.activeStep = 4
            this.pending = false
        }
    },
}
</script>

<style scoped>
.landinPage {
    padding: 30px 0;
}
.landinPage form{
   
    padding: 56px;
    border-radius: 24px;
    border: 3px solid rgba(22 72 99 )    
}
.landinPage form .next {
    background-color: rgba(22 72 99 );
    border-radius: 8px;
    width: 100%;
    color: #fff;
    height: 45px;
}
.landinPage form .btn {
    margin: 0 auto;
}
.landinPage h2 {
    font-size: 56px;
    font-weight: 700;
    margin-bottom: 25px ;
    text-align: center;
}

.number-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 600px;
    margin: 50px auto;
    position: relative;
    
}
.number {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    font-weight: 700;
    position: relative;
    z-index: 1;
    border: 2px solid #d0d0d0;
    color: #d0d0d0;
}
.number::before {
    content: "";
    position: absolute;
    height: 3px;
    background-color:rgba(208, 208, 208, 1); 
    width: 280%;
    left: -141%;
    top: 50%;
    z-index: -1;
    transform: translate(-50%, -50%);
}
.number:last-child::before {
    width: 0;
}
@media (max-width:756px) {
    .number-row {
        width: 350px;
    }
    .number::before {
        width: 109%;
        left: -58%;
    }
}
@media (max-width:400px) {
    .landinPage h2 {
        font-size: 30px;
    }
    .number-row {
        width: 200px;
    }
    .number {
        width: 35px;
        height: 35px;
        font-size: 20px;
    }
    .number::before {
        width: 67%;
        left: -37%;
    }
}
.number.active {
    border: 2px solid rgba(22 72 99 );
    color: rgba(22 72 99 );
}
.number.complete {
    background-color: rgba(22 72 99 );
    color: #fff;
    border: 2px solid rgba(22 72 99 );
}
.number.complete::before {
    background-color: rgba(22 72 99 );
}
.number.disable {
    border: 1px solid #d0d0d0;
    color: #d0d0d0;
}
.landinPage  .pending img {
    height: 400px;
    margin: 40px 0;
}
.landinPage .container > div{
    text-align: center;
}
.container .card {
    height: 500px;
    padding: 48px 60px 48px 60px;
    border-radius: 16px;
    margin-bottom: 50px;
    border: 3px solid rgba(22, 72, 99, 1);
}
.container h2 {
    font-size: 36px;
    font-weight: 700;
    text-align: center;
    color: rgba(22, 72, 99, 1);
    margin-bottom: 20px;
}
.container h3 {
    font-size: 80px;
    font-weight: 800;
    color: rgba(22, 72, 99, 1);
    text-align: center;
    margin-bottom: 0;
}
.container p {
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    color: rgba(22, 72, 99, 1);
    margin-bottom: 40px;
}
.container .card img {
    margin-left: 15px;
}
.container .card div {
    margin-bottom: 15px;
    text-align: right;
}
.container .card .sub-btn {
    width: 200px;
    padding: 8px 72px 8px 72px;
    border-radius: 52px;
    display: inline-block;
    text-decoration: none;
    background-color: rgba(22, 72, 99, 1);
    margin-top: 20px;
    text-align: center;
    color: #fff;
    margin-inline:auto ;
    font-weight: 700;
    font-size: 24;


}
.container .diff {
    background-color: rgba(22, 72, 99, 1);
    color: #fff;
}
.container .diff h3,
.container .diff p {
    color: #fff;
}
.container .diff .sub-btn {
    background-color: #FFF;
    color: rgba(22, 72, 99, 1);
    font-weight: 700;
    /* font-size: 24px; */
}


.container h2 {
    font-size: 56px;
    font-weight: 700;
    margin: 25px ;
    text-align: center;
}

.container .PayMent {
    width: 585px;
    border-radius: 16px;
    border: 1px solid rgba(220, 220, 220);
    padding: 0px 77px 30px 43px;
    box-shadow: 0px 2px 17.399999618530273px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -10%);
    z-index: 100;
    background-color: #FFF;
    flex-direction: column;
    min-height: 300px;
    padding-right: 43px;
}
.container .PayMent .row:nth-child(2){
    justify-content: center;
}
.container .PayMent img {
    width: 130px;
}
.container .PayMent h2 {
   
    font-size: 36px;
    font-weight: 700;
    color: rgba(22, 72, 99, 1);

}

@media (max-width:556px) {
    .container .PayMent img {
        width: 100px;
    }
    .container .PayMent h2 {
       
        font-size: 22px;
    
    }
}
.PayMent input {
    display: none;
}
.PayMent label{
    background-color: #B3B3B3;
    color: black;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
}
.payButton{
    background-color: rgba(22, 72, 99, 1);
    color: #fff;
    padding: 10px 30px;
    border-radius: 40px;
    cursor: pointer;
    margin-top: 10px;
    width: fit-content;
}

</style>