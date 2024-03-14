<template>
<div class="container">
    <div class="question landing-question" v-show="!testStarted" v-if="patient == null">
        <h1>الأختبار</h1>
        <p>يستغرق الأختبار خمس دقائق لإكماله</p>
        <button class="btn" @click="startTest">ابدأ الأختبار  <i class="bi bi-arrow-down"></i> </button>
    </div>
    <div class="questions" v-show="testStarted" v-if="patient == null">
            <div class="question" v-for="(q, index) in questions.one" :key="index" v-show="currentQuestionNumber == 'one' && index == currentQuestion">
                <h3>{{q.question}}</h3>
                <div class="answer">
                    <button @click="answerYes(q)" class="btn btn-success">نعم</button>
                    <button @click="answerNo(q)" class="btn btn-danger">لا</button>
                </div>
                <!--<div class="back-button" v-if="currentQuestion != 0">
                    <button @click="back()" class="btn btn-primary">السابق</button>
                </div>-->
            </div>

            <div class="question" v-for="(q, index) in questions.two" :key="index" v-show="currentQuestionNumber == 'two' && index == currentQuestion">
                <h3>{{q.question}}</h3>
                <div class="answer">
                    <button @click="answerYes(q)" class="btn btn-success">نعم</button>
                    <button @click="answerNo(q)" class="btn btn-danger">لا</button>
                </div>
                <!--<div class="back-button" v-if="currentQuestion != 0">
                    <button @click="back()" class="btn btn-primary">السابق</button>
                </div>-->
            </div>
            <div class="question" v-for="(q, index) in questions.four" :key="index" v-show="currentQuestionNumber == 'four' && index == currentQuestion">
                <h3>{{q.question}}</h3>
                <div class="answer">
                    <button @click="answerYes(q)" class="btn btn-success">نعم</button>
                    <button @click="answerNo(q)" class="btn btn-danger">لا</button>
                </div>
                <!--<div class="back-button" v-if="currentQuestion != 0">
                    <button @click="back()" class="btn btn-primary">السابق</button>
                </div>-->
            </div>
            <div class="question" v-for="(q, index) in questions.five" :key="index" v-show="currentQuestionNumber == 'five' && index == currentQuestion">
                <h3>{{q.question}}</h3>
                <div class="answer">
                    <button @click="answerYes(q)" class="btn btn-success">نعم</button>
                    <button @click="answerNo(q)" class="btn btn-danger">لا</button>
                </div>
                <!--<div class="back-button" v-if="currentQuestion != 0">
                    <button @click="back()" class="btn btn-primary">السابق</button>
                </div>-->
            </div>
            <div class="question" v-for="(q, index) in questions.three" :key="index" v-show="currentQuestionNumber == 'three' && index == currentQuestion">
                <h3>{{q.question}}</h3>
                <div class="answer">
                    <button @click="thirdQuestionAnswer(q, 'no')" class="btn btn-success">لا مشكلة</button>
                    <button @click="thirdQuestionAnswer(q, 'small')" class="btn btn-danger">مشكلة طفيفه</button>
                    <button @click="thirdQuestionAnswer(q, 'moderate')" class="btn btn-danger">مشكلة متوسطة</button>
                    <button @click="thirdQuestionAnswer(q, 'serious')" class="btn btn-danger">مشكله خطيره</button>
                </div>
                <!--<div class="back-button" v-if="currentQuestion != 0">
                    <button @click="back()" class="btn btn-primary">السابق</button>
                </div>-->
            </div>
        </div>
        <div class="is-patient-page" v-if="testEnded == true && score == true">
            <img src="@/assets/images/testImage.png" alt="" class="animate-logo">
            <div class="content">
                <h2>مرحبا يا صديقي ,لذلك انت تعاني من اضطراب ثنائي القطب وانا هنا لمساعدتك حمل التطبيق الان لنبدأ رحلتنا معاً</h2>
                <p>لقد قمت باجابة 7 اسئلة او اكثر “بنعم” في السؤال الاول و اجابة السؤال الثاني بنعم و السؤال الثالث بمتوسطه او خطيره</p>
                <div class="btn">حمل الان</div>
            </div>
        </div>
        <div class="isnot-patient-page" v-if="testEnded == true && score == false">
             <img src="@/assets/images/testImage.png" alt="" class="animate-logo">
            <div class="content">
                <h2>مرحبا يا صديقي , قد تعاني من نوبات قلق او هوس ولكنك لست مصاب باضطراب ثنائي القطب</h2>
                <p>يمكنني مساعدتك في تقليل النوبات و السيطره عليها من خلال تحمل التطبيق</p>
                <div class="btn">حمل الان</div>
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
export default {
    data() {
        return {
            currentQuestionNumber: 'one',
            currentQuestion: 0,
            questionOneAnswers: 0,
            questionTwoAnswers: 0,
            questionThreeAnswers: '',
            questionFourAnswers: 0,
            questionFiveAnswers: 0,
            testStarted: false,
            token: localStorage.getItem('token'),
            testEnded: false,
            score: null,
            questions: {
                one: [
                    {
                        question: 'شعرت انك بحاله جيده جدا او ثائر جدا حتي ظن الناس انك لست علي طبيعتك او كنت متهورا جدا لدرجة انك وقعت في مشاكل؟',
                        answer: null
                    },
                    {
                        question: 'كنت متجهمًا لدرجة أنك صرخت على الناس أو بدأت مشاجرات أو جدال؟',
                        answer: null
                    },
                    {
                        question: 'شعرت بالثقة بالنفس بشكل أكبر بكثير من المعتاد؟',
                        answer: null
                    },
                    {
                        question:'كنت تنام أقل بكثير من المعتاد واكتشفت أنك لست بحاجة حقًا إليها؟',
                        answer: null
                    },
                    {
                        question: 'تمر الأفكار بسرعة في رأسك أو لا تستطيع تباطؤ عقلك؟',
                        answer: null
                    },
                    {
                        question: 'تشتتت انتباهك بسهولة بسبب الأشياء من حولك وواجهت صعوبة في التركيز أو البقاء على المسار الصحيح؟',
                        answer: null
                    },
                    {
                        question: 'كان لديك طاقة أكثر بكثير من المعتاد؟',
                        answer: null
                    },
                    {
                        question: 'كنت أكثر نشاطًا أو فعلت الكثير من الأشياء أكثر من المعتاد؟',
                        answer: null
                    },
                    {
                        question: 'كنت أكثر اجتماعيًا أو خارجًا عن المألوف، على سبيل المثال، اتصلت بأصدقائك في منتصف الليل؟',
                        answer: null
                    },
                    {
                        question: 'قمت بأشياء غير معتادة بالنسبة لك أو قد اعتبرها الآخرون مبالغ فيها أو سخيفة أو محفوفة بالمخاطر؟',
                        answer: null
                    },
                ],
                two: [
                    {
                        question: 'إذا قمت باختيار "نعم" لعدة اسألة سابقة ، حدثت عدة من هذه الأمور في نفس الفترة الزمنية؟',
                        answer: null
                    }
                ],
                three : [
                    {
                        question: 'ما حجم المشكلة التي سببتها لك أي من هذه الأمور بالنسبة لك - مثل القدرة على العمل؛ وجود مشاكل عائلية أو مشاكل مالية أو قانونية؛ الوقوع في جدالات أو مشاجرات؟',
                        answer: null
                    }
                ],
                four: [
                    {
                        question: 'هل لدى أي من أقاربك البيولوجيين (مثل الأبناء والأشقاء والآباء والأجداد والعمات والأعمام) مرض الاضطراب الثنائي القطبي؟',
                        answer: null
                    }
                ],
                five: [
                    {
                        question: 'هل أخبرك أحد المتخصصين الصحيين أنك تعاني من مرض الاضطراب الثنائي القطبي؟',
                        answer: null
                    }
                ]
            }
        };
    },
    mounted() {
        if(!this.token){
            this.$router.push({ name: 'login' });
        }
    },
    methods: {
        answerYes(q) {
            q.answer = true;
            this.currentQuestion++;
            if (this.currentQuestionNumber=='one' && this.currentQuestion == 10) {
                this.currentQuestionNumber = 'two';
                this.currentQuestion = 0;
            }else if (this.currentQuestionNumber=='two' && this.currentQuestion == this.questions.two.length) {
                this.currentQuestionNumber = 'three';
                this.currentQuestion = 0;
            }else if (this.currentQuestionNumber=='three' && this.currentQuestion == this.questions.three.length) {
                this.currentQuestionNumber = 'four';
                this.currentQuestion = 0;
            }else if (this.currentQuestionNumber=='four' && this.currentQuestion == this.questions.four.length) {
                this.currentQuestionNumber = 'five';
                this.currentQuestion = 0;
            }else if (this.currentQuestionNumber=='five' && this.currentQuestion == this.questions.five.length) {
                this.getResults();
            }
        },
        answerNo(q) {
            q.answer = false;
            this.currentQuestion++;
            if (this.currentQuestionNumber=='one' && this.currentQuestion == 10) {
                this.currentQuestionNumber = 'two';
                this.currentQuestion = 0;
            }else if (this.currentQuestionNumber=='two' && this.currentQuestion == this.questions.two.length) {
                this.currentQuestionNumber = 'three';
                this.currentQuestion = 0;
            }else if (this.currentQuestionNumber=='three' && this.currentQuestion == this.questions.three.length) {
                this.currentQuestionNumber = 'four';
                this.currentQuestion = 0;
            }else if (this.currentQuestionNumber=='four' && this.currentQuestion == this.questions.four.length) {
                this.currentQuestionNumber = 'five';
                this.currentQuestion = 0;
            }else if (this.currentQuestionNumber=='five' && this.currentQuestion == this.questions.five.length) {
                this.getResults();
            }
        },
        thirdQuestionAnswer (q, answer) {
            q.answer = answer;
            this.currentQuestion++;
            this.currentQuestionNumber = 'four';
            this.currentQuestion = 0;
        },
        back() {
            if(this.currentQuestion == 0 && this.currentQuestionNumber == 'two') {
                this.currentQuestionNumber = 'one';
                this.currentQuestion = this.questions.one.length - 1;
            }else if(this.currentQuestion == 0 && this.currentQuestionNumber == 'three') {
                this.currentQuestionNumber = 'two';
                this.currentQuestion = this.questions.two.length - 1;
            }else if(this.currentQuestion == 0 && this.currentQuestionNumber == 'four') {
                this.currentQuestionNumber = 'three';
                this.currentQuestion = this.questions.three.length - 1;
            }else if(this.currentQuestion == 0 && this.currentQuestionNumber == 'five') {
                this.currentQuestionNumber = 'four';
                this.currentQuestion = this.questions.four.length - 1;
            }else{
                this.currentQuestion--;
            }
        },
        getResults() {
            this.testEnded = true;
            console.log('here result');
            this.questionOneAnswers = this.questions.one.filter(q => q.answer == true).length;
            this.questionTwoAnswers = this.questions.two.filter(q => q.answer == true).length;
            this.questionThreeAnswers = this.questions.three[0].answer;
            if(this.questionOneAnswers > 6 && this.questionTwoAnswers == 1 && (this.questionThreeAnswers == 'moderate' || this.questionThreeAnswers== 'serious')){
                this.score= true
                if(this.token){
                    axios.post('http://127.0.0.1:8000/api/test',{
                        score: this.score
                    },{
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }else{
                    this.$router.push({name: 'login'});
                
                }
            }else{
                this.score= false
                axios.post('http://127.0.0.1:8000/api/test',{
                        score: false
                    },{
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        startTest() {
            this.testStarted = true;
        }
    }
}
</script>

<style scoped>
.question-container {
  animation: slide-down 0.5s ease;
}
.question h3{
    color: #164863;
    font-size: 24px;
    line-height: 2.5;
    margin-bottom: 50px;
}
.question .answer .btn{
    color: #164863;
    font-size: 28px;
    background-color: transparent !important;
    border: none !important;
    position: relative;
    margin-right: 70px;
}
.btn:hover {
    transition: unset;
    transform: unset;
    box-shadow: unset;
}
.question .answer .btn::before{
    content: '';
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #D9D9D9;
    position: absolute;
    right: -20px;
    top: 20px;
}
.container{
    height: calc(100vh - 79px);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.landing-question h1{
    color: #164863;
    font-size: 56px;
    margin-bottom: 30px;
}
.landing-question p{
    color: #164863;
    font-size: 40px;
    margin-bottom: 50px;
}
.landing-question button.btn{
    background-color: #164863 !important;
    padding: 5px 35px;
    border-radius: 40px;
    color: white;
    font-size: 25px;
    margin-bottom: 30px;
}
@keyframes slide-down {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.question {
  opacity: 0;
  transform: translateY(-20px);
  animation: fade-in 1s ease forwards;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.is-patient-page .btn:hover , .isnot-patient-page .btn:hover{
    box-shadow: 0 0 20px #0ebac5;
    /* box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px; */
    transform: translateY(-2px);
    transition: .3s;
 }
</style>