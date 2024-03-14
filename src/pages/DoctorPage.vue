<template>
    <div class="landingPage">
    <div class="container text-center text-lg-end d-flex  flex-row-reverse align-items-center">
     <img src="@/assets/images/doc/doctor boo.png" alt="logo" class="d-none d-lg-block animate__animated animate__backInLeft">
     <div class="landingContent animate__animated animate__backInRight">
         <h2>شارك معلوماتك الطبيه لتساعدنا</h2>
         <p>يمكنك الاشتراك لتنشر كل ما يساعدنا في التطوير والتحسين</p>
         <div class="d-flex">
            <router-link :to="{name : 'doctor-subscription'}">اشترك الان</router-link>
            <router-link :to="{name : 'doctor-login'}" style="margin-right: 10px">تابع حالتك</router-link>
         </div>
         
     </div>
    </div>
  </div>
  <!-- body -->
  <div class="feature">
    <div class="container h-100 d-flex  justify-content-between align-items-center gap-5">
        <div class="image d-none d-xl-block">
            <img src="@/assets/images/doc/wink.png" alt="">
        </div>
        <div class="content mx-auto text-xl-end ">
            <h2 class="text-center text-xl-end">المميزات</h2>
            <h3><img src="@/assets/images/doc/ranking.png" alt="">للاعلان عن خدماتك الطبيه  </h3>
            <h3><img src="@/assets/images/doc/ranking.png" alt="">تقديم خصومات وعروض</h3>
            <h3><img src="@/assets/images/doc/ranking.png" alt="">نشر بوست لمساعده المرضي</h3>
        </div>
    </div>
  </div>
  <!-- form  -->
  <div class="form">
    <div class="container d-flex  justify-content-between flex-column flex-lg-row" >
        <form class="inputs mb-5 mb-lg-0" action="#" >
            <div class="mb-3">
                <label for="formGroupExampleInput" class="form-label">الاسم</label>
                <input type="text" class="form-control" id="formGroupExampleInput" >
              </div>
              <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label">البريد الالكتروني</label>
                <input type="text" class="form-control" id="formGroupExampleInput2" >
              </div>
              <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label">رقم الهاتف</label>
                <input type="text" class="form-control" id="formGroupExampleInput2" >
              </div>
              <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label">الرساله</label>
                <textarea name="" id="" cols="30" rows="10" class="form-control" ></textarea>
              </div>
              <input class="sub" type="submit" value="ارسال">
        </form>
        <div class="contact_us">
            <h2>تواصل معنا</h2>
            <div class="facebook"><img src="@/assets/images/doc/facebook icon.png" alt="">Bibalancecontact@gmail.com</div>
            <div class="whatsapp"><img src="@/assets/images/doc/whatsapp icon.png" alt="">0101231236</div>
            <div class="email"><img src="@/assets/images/doc/email Icon.png" alt="">Bibalancecontact@gmail.com</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.landingPage{
    background: white;
}
.landingPage .container{
    height: calc(100vh - 79px);
}
.landingPage img {
    width: 466px;
}
.landingPage .container{
    justify-content: space-between;
}
.landingPage .landingContent h2 {
    color: rgba(22, 72, 99, 1);
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 45px;
}
.landingPage .landingContent p {
    font-size: 32px;
    color:rgba(22, 72, 99, 1);
    font-weight: 600;
    margin-bottom: 45px;
}
.landingPage .landingContent a {
    display:inline-block;
    width: 260px;
    height: 61px;
    padding: 0 72px 0px 72px;
    border-radius: 52px;
    gap: 8px;
    background-color:rgba(22, 72, 99, 1);
    color: #FFF;
    font-weight: 700;
    text-decoration: none;
    align-items: center;
    display: flex;
    justify-content: center;    
}
/*  */

/* feature */
.feature {
    background: linear-gradient(116.82deg, #164863 0%, #85A7B0 100%);
    height: 590px;
}

.feature .content h2 {
    font-size: 56px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 30px;
}
.feature .content h3 {   
    font-size: 40px;
    font-weight: 500;
    color: #FFF;
    margin-bottom: 30px;
}
.feature .content img {
    margin-left: 8px;
}
/* form  */
.form {
    padding: 50px 0;
}
.form .container {
    
    padding: 20px 44px 20px 44px;
    border: 4px;
    border-radius: 24px;
    border: 4px solid rgba(22, 72, 99, 1);
}
.form .contact_us {
    /* width: 48%; */
    background: linear-gradient(116.82deg, #164863 0%, #9BBEC8 100%, #86A8B1 100%);
    border-radius: 16px;
    padding: 132px 80px 97px 40px;
    

}
.form .contact_us img {
    /* width: 40px; */
    margin-left: 32px;
}
.form .contact_us div {
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: 600;
    color: #fff;
    margin: 30px auto;
}
.form .contact_us h2 {   
    font-size: 40px;
    font-weight: 700;
    text-align: center;
    color: #fff;
    margin-bottom: 40px;
}
form {
    /* width: 48%; */
}
form label {
    font-size: 24px;
    font-weight: 600;
    color: rgba(22, 72, 99, 1);
}
form .sub {
    height:45px;
    width: 100%;
    border-radius: 8px;
    background-color: rgba(22, 72, 99, 1);
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    
} 
@media (min-width:992px) {
    form {
        width: 48%;
    }
    .form .contact_us {
        width: 48%;
    }
}
@media (max-width:556px) {
   .feature .content h2 {
    font-size: 30px;
   }
   .feature .content h3 {
    font-size: 20px;
   }
   .form .contact_us {
    padding: 50px 20px;
   }
   .form .contact_us h2 {
    font-size: 30px;
   }
   .form .contact_us div {
    font-size: 18px;
   }
   .form .contact_us img {
    width: 35px;
   }
}


/* media  */

@media (min-width: 556px) {
    .landingPage h2,
    .landingPage p {
        color: #164863;
    }
    .landingPage h2 {
        font-size: 40px;
    }
    .landingPage p {
        font-size: 24px;
    }
    .sec3 .content {
        color: #164863;
    }
   .section2 .content p {
    font-size: 40px;
    }
 
   .sec3 .content{
    font-size: 40px;
   }
   
  }
  @media (max-width: 992px) {
    .sec4 img {
        width: 400px;
    }
    .sec4 .content p {
        font-size: 30px;
    }
    .buttons {
        margin: 0 auto;
    }
  } 
  @media (max-width: 556px) {
    .sec4 img,
    .sec3 img {
        width: 300px;
    }
    .sec4 .content p,
    .sec3 .content p {
        font-size: 26px;
    }
    .sec4 .btn {
        margin-top: 50px;
    }
    .landingContent .btn ,
    .section2 .btn ,
    .sec4 .btn {
        width: 170px;
    }
    .buttons {
        width: 100%;
        text-align: center;
        padding-top: 20px;
    }
    /* .buttons .btn {
        padding: 5px;
        font-size: 14px;
    } */
    
  }
@media (max-width:430px) {
    .buttons .btn {
        width: 135px;
    }
    .buttons .reg {
        margin-bottom: 10px;
    }
    .buttons .login {
        margin-right: 0;
    }
}
</style>