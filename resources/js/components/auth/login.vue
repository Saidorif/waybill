<template>
  <div class="card lognCard">
    <Loader v-if="laoding"/>
    <Header/>
    <div class="card-body login-card-body">
      <div class="form_content jv_login_block">
        <div class="flagbg">
          <h6>Tender platformasiga kirish.</h6>
          <p> Agar siz ra'yxatdan o'tmagan bo'lsangiz iltimos, ro'yxatdan o'ting.</p>
        </div>
        <div class="jv_form_block">
          <div class="logo_login">
            <img  src="img/logoUz.png" alt="">
          </div>
          <div class="login_alert" v-if="errorMsg">
            <i class="fas fa-exclamation-circle mr-2"></i> Неверный логин или пароль
          </div>
          <form @submit.enter.prevent="onLogin">
            <div  class="input-group input_group_with_label">
              <input  type="email" id="useremail" class="form-control" v-model="form.email" :class="isLoginRequired(form.email) ? 'isRequired' : ''">
              <label  for="useremail">Email</label>
            </div>
            <div  class="input-group input_group_with_label mb-5">
              <input  type="password" id="userpassword" class="form-control" v-model="form.password" :class="isLoginRequired(form.password) ? 'isRequired' : ''">
              <label  for="userpassword">Parol</label>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn_register_block">
                <router-link to="/send-apply" tag="a" class="btn_forgot text-success">Получить доступ!</router-link>
                <router-link to="/register" class="btn_bd_blue">Ro'yxatdan o'tish</router-link>
              </div>
                <button type="submit" class="btn_login">
                  Kirish
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import DatePicker from "vue2-datepicker";
import { TokenService } from "./../../services/storage.service";
import Header from '../pages/Header'
import Loader from '../Loader'
export default {
  components: {
    DatePicker,
    Header,
    Loader
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      signUp: {
        region_id: "",
        area_id: "",
        name: "",
        surname: "",
        middlename: "",
        city: "",
        bank_number: "",
        oked: "",
        mfo: "",
        inn: "",
        phone: "",
        address: "",
        company_name: "",
        license_number: "",
        password: "",
        confirm_password: "",
        email: "",
        license_type: "",
        license_date: "",
        trusted_person: "",
      },
      errorMsg: null,
      errorMsgSign: null,
      requiredLoginInput: false,
      requiredInput: false,
      checkPassword: false,
            laoding: true
    };
  },
  computed: {
    ...mapGetters([
      "authenticationErrorCode",
      "authenticationError",
      "getRegisterError",
    ]),
    ...mapGetters("user", ["getMessage"]),
    ...mapGetters("region", ["getRegionList"]),
    ...mapGetters("area", ["getAreaList"]),
  },
  async mounted() {
    // await this.actionRegionList();
    this.laoding = false
  },
  beforeRouteEnter(to, from, next){
    if (TokenService.getToken()){
      if (TokenService.getCurrentUser() && TokenService.getCurrentUser().role.name == 'admin') {
        next(vm=>{
          vm.$router.push('/crm/dashboard')
        })
      }else{
        next(vm=>{
          vm.$router.push('/crm/profile')
        })
      }
        // next(vm=>{
      //      vm.$router.push('/crm/dashboard')
      //  })
    }
    next()
  },
  methods: {
    ...mapActions("region", ["actionRegionList"]),
    ...mapActions("area", ["actionAreaByRegion"]),
    ...mapActions(["login", "register"]),
    ...mapActions("user", ["ActionRegisterUser"]),
    isRequired(input) {
      return this.requiredInput && input === "";
    },
    isLoginRequired(input) {
      return this.requiredLoginInput && input === "";
    },
    async selectRegion() {
      await this.actionAreaByRegion({ region_id: this.signUp.region_id });
    },
    confirmPassword() {
      if (this.signUp.password && this.signUp.confirm_password) {
        if (this.signUp.password != this.signUp.confirm_password) {
          this.checkPassword = true;
        } else {
          this.checkPassword = false;
        }
      }
    },
    async onLogin() {
      this.$Progress.start();
      if (this.form.email != "" && this.form.password != "") {
        this.laoding = true
        await this.login(this.form);
        await this.authenticationErrorCode;
        if (!this.authenticationErrorCode) {
          toast.fire({
            type: "success",
            icon: "success",
            title: "Вошли в систему!",
          });
          window.location.href = "/crm/dashboard";
          this.$Progress.finish();
          // setTimeout(()=>{
          // 	window.location = '/crm/dashboard';
          // },100)
          //   this.$router.push("/crm/dashboard");
          this.requiredLoginInput = false;
        } else {
          this.errorMsg = this.authenticationError;
          this.$Progress.fail();
        }
        this.laoding = false
      } else {
        this.requiredLoginInput = true;
      }
    },
  },
};
</script>
<style scoped>
.pas_confirm_frame .input-group {
  margin-bottom: 0px;
}
.input-group.register_date .mx-datepicker .mx-input-wrapper .mx-icon-calendar,
.mx-icon-clear {
  color: #acf1c1 !important;
}
</style>
