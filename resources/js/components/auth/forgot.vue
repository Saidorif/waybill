<template>
  <div class="card lognCard registerCard">
    <header class="main_header">
      <div class="container">
        <a href="/" class="logo"><img src="img/logoUz.png" alt="" /></a>
        <ul class="menu_list">
          <li><a href="/">Bosh sahifa</a></li>
          <li><a href="/about">Tender haqida</a></li>
          <li><a href="/list-tender">O'tkazilgan tenderlar</a></li>
          <li><a href="/contact">Biz bilan aloqa</a></li>
        </ul>
        <a href="/login" class="btn_login"
          ><i class="fas fa-sign-in-alt"></i>Tizimga kirish</a
        >
      </div>
    </header>
    <div class="card-body login-card-body">
        <div class="form_content auth_request">
              <div class="login_alert" v-if="errorMsgSign">
                <i class="fas fa-exclamation-circle mr-2"></i>
                {{ errorMsgSign.message }}
              </div>
              <form @submit.enter.prevent="onSignUp">
                <div class="col-md-6">
                  <div class="input-group">
                    <select
                      class="form-control input_style"
                      v-model="signUp.region_id"
                      :class="isRequired(signUp.region_id) ? 'isRequired' : ''"
                      @change="selectRegion()"
                    >
                      <option value selected disabled>Выберите область!</option>
                      <option
                        :value="item.id"
                        v-for="(item, index) in getRegionList"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="signUp.inn"
                      :class="isRequired(signUp.inn) ? 'isRequired' : ''"
                      v-mask="'999999999'"
                      placeholder="ИНН"
                    />
                    <div class="input-group-append">
                      <div
                        class="input-group-text"
                        :class="isRequired(signUp.inn) ? 'isRequired' : ''"
                      >
                        <img src="/img/doc.png" alt />
                      </div>
                    </div>
                  </div>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="signUp.surname"
                      placeholder="Фамилия"
                      :class="isRequired(signUp.surname) ? 'isRequired' : ''"
                    />
                    <div class="input-group-append">
                      <div
                        class="input-group-text"
                        :class="isRequired(signUp.surname) ? 'isRequired' : ''"
                      >
                        <img src="/img/user.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="signUp.name"
                      placeholder="Имя"
                      :class="isRequired(signUp.name) ? 'isRequired' : ''"
                    />
                    <div class="input-group-append">
                      <div
                        class="input-group-text"
                        :class="isRequired(signUp.name) ? 'isRequired' : ''"
                      >
                        <img src="/img/user.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="signUp.middlename"
                      placeholder="Отчество"
                      :class="isRequired(signUp.middlename) ? 'isRequired' : ''"
                    />
                    <div class="input-group-append">
                      <div
                        class="input-group-text"
                        :class="
                          isRequired(signUp.middlename) ? 'isRequired' : ''
                        "
                      >
                        <img src="/img/user.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="signUp.trusted_person"
                      placeholder="Уполномоченное лицо"
                      :class="
                        isRequired(signUp.trusted_person) ? 'isRequired' : ''
                      "
                    />
                    <div class="input-group-append">
                      <div
                        class="input-group-text"
                        :class="
                          isRequired(signUp.trusted_person) ? 'isRequired' : ''
                        "
                      >
                        <img src="/img/user.png" alt />
                      </div>
                    </div>
                  </div>
                  <div class="input-group">
                    <input
                      type="email"
                      class="form-control"
                      v-model="signUp.email"
                      :class="isRequired(signUp.email) ? 'isRequired' : ''"
                      placeholder="Email"
                    />
                    <div class="input-group-append">
                      <div
                        class="input-group-text"
                        :class="isRequired(signUp.email) ? 'isRequired' : ''"
                      >
                        <img src="/img/email.png" alt />
                      </div>
                    </div>
                  </div>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="signUp.address"
                      :class="isRequired(signUp.address) ? 'isRequired' : ''"
                      placeholder="Адрес"
                    />
                    <div class="input-group-append">
                      <div
                        class="input-group-text"
                        :class="isRequired(signUp.address) ? 'isRequired' : ''"
                      >
                        <img src="/img/pin.png" alt />
                      </div>
                    </div>
                  </div>
                  <div class="input-group">
                    <input
                      type="text"
                      v-mask="'(99)999-99-99'"
                      class="form-control"
                      v-model="signUp.phone"
                      placeholder="Телефон"
                      :class="isRequired(signUp.phone) ? 'isRequired' : ''"
                    />
                    <div class="input-group-append">
                      <div
                        class="input-group-text"
                        :class="isRequired(signUp.phone) ? 'isRequired' : ''"
                      >
                        <img src="/img/phone.png" alt />
                      </div>
                    </div>
                  </div>
                  <div class="input-group">
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Пароль"
                      :class="isRequired(signUp.password) ? 'isRequired' : ''"
                      v-model="signUp.password"
                    />
                    <div class="input-group-append">
                      <div
                        class="input-group-text"
                        :class="isRequired(signUp.password) ? 'isRequired' : ''"
                      >
                        <img src="/img/key.png" alt />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-group">
                    <select
                      class="form-control input_style"
                      v-model="signUp.area_id"
                      :class="isRequired(signUp.area_id) ? 'isRequired' : ''"
                    >
                      <option value selected disabled>
                        Выберите регин или город!
                      </option>
                      <option
                        :value="item.id"
                        v-for="(item, index) in getAreaList"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="signUp.company_name"
                      :class="
                        isRequired(signUp.company_name) ? 'isRequired' : ''
                      "
                      placeholder="Название компании"
                    />
                    <div class="input-group-append">
                      <div
                        class="input-group-text"
                        :class="
                          isRequired(signUp.company_name) ? 'isRequired' : ''
                        "
                      >
                        <img src="/img/company.png" alt />
                      </div>
                    </div>
                  </div>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="signUp.city"
                      placeholder="Адрес банка"
                      :class="isRequired(signUp.city) ? 'isRequired' : ''"
                    />
                    <div class="input-group-append">
                      <div
                        class="input-group-text"
                        :class="isRequired(signUp.city) ? 'isRequired' : ''"
                      >
                        <img src="/img/mfo.png" alt />
                      </div>
                    </div>
                  </div>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="signUp.bank_number"
                      :class="
                        isRequired(signUp.bank_number) ? 'isRequired' : ''
                      "
                      v-mask="'99999999999999999999'"
                      placeholder="Р/счет"
                    />
                    <div class="input-group-append">
                      <div
                        class="input-group-text"
                        :class="
                          isRequired(signUp.bank_number) ? 'isRequired' : ''
                        "
                      >
                        <img src="/img/stir.png" alt />
                      </div>
                    </div>
                  </div>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="signUp.mfo"
                      :class="isRequired(signUp.mfo) ? 'isRequired' : ''"
                      v-mask="'99999'"
                      placeholder="МФО"
                    />
                    <div class="input-group-append">
                      <div
                        class="input-group-text"
                        :class="isRequired(signUp.mfo) ? 'isRequired' : ''"
                      >
                        <img src="/img/oknx.png" alt />
                      </div>
                    </div>
                  </div>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="signUp.oked"
                      :class="isRequired(signUp.oked) ? 'isRequired' : ''"
                      v-mask="'99999'"
                      placeholder="ОКЕД"
                    />
                    <div class="input-group-append">
                      <div
                        class="input-group-text"
                        :class="isRequired(signUp.oked) ? 'isRequired' : ''"
                      >
                        <img src="/img/docs.png" alt />
                      </div>
                    </div>
                  </div>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="signUp.license_number"
                      :class="
                        isRequired(signUp.license_number) ? 'isRequired' : ''
                      "
                      v-mask="'99999'"
                      placeholder="Номер лицензии"
                    />
                    <div class="input-group-append">
                      <div
                        class="input-group-text"
                        :class="
                          isRequired(signUp.license_number) ? 'isRequired' : ''
                        "
                      >
                        <img src="/img/docs.png" alt />
                      </div>
                    </div>
                  </div>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="signUp.license_type"
                      :class="
                        isRequired(signUp.license_type) ? 'isRequired' : ''
                      "
                      placeholder="Тип лицензии"
                    />
                    <div class="input-group-append">
                      <div
                        class="input-group-text"
                        :class="
                          isRequired(signUp.license_type) ? 'isRequired' : ''
                        "
                      >
                        <img src="/img/docs.png" alt />
                      </div>
                    </div>
                  </div>
                  <div class="input-group register_date">
                    <date-picker
                      lang="ru"
                      type="date"
                      v-model="signUp.license_date"
                      valueType="format"
                      :class="
                        isRequired(signUp.license_date) ? 'isRequired' : ''
                      "
                      placeholder="Дата лицензии"
                    ></date-picker>
                  </div>
                  <div class="pas_confirm_frame">
                    <div class="input-group">
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Пароль подтверждения"
                        v-model="signUp.confirm_password"
                        :class="
                          isRequired(signUp.confirm_password)
                            ? 'isRequired'
                            : ''
                        "
                        @input="confirmPassword()"
                      />
                      <div class="input-group-append">
                        <div
                          class="input-group-text"
                          :class="
                            isRequired(signUp.confirm_password)
                              ? 'isRequired'
                              : ''
                          "
                        >
                          <img src="/img/key.png" alt />
                        </div>
                      </div>
                    </div>
                    <small class="redText" v-if="checkPassword">
                      <b>Пароль не совпадает</b>
                    </small>
                  </div>
                  <div class="input-group mt-4">
                    <button type="submit" class="btn btn-primary btn-block">
                      Зарегистрироваться
                    </button>
                  </div>
                </div>
              </form>
        </div>

    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import DatePicker from "vue2-datepicker";
import { TokenService } from "./../../services/storage.service";
export default {
  components: {
    DatePicker,
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
    await this.actionRegionList();
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
        await this.login(this.form);
        await this.authenticationErrorCode;
        if (!this.authenticationErrorCode) {
          toast.fire({
            type: "success",
            icon: "success",
            title: "Вошли в систему!",
          });
          this.$Progress.finish();
          // setTimeout(()=>{
          // 	window.location = '/crm/dashboard';
          // },100)
          //   this.$router.push("/crm/dashboard");
          this.requiredLoginInput = false;
          window.location.href = "/crm/dashboard";
        } else {
          this.errorMsg = this.authenticationError;
          this.$Progress.fail();
        }
      } else {
        this.requiredLoginInput = true;
      }
    },
    async onSignUp() {
      if (
        this.signUp.name != "" &&
        this.signUp.city != "" &&
        this.signUp.bank_number != "" &&
        this.signUp.oked != "" &&
        this.signUp.mfo != "" &&
        this.signUp.inn != "" &&
        this.signUp.phone != "" &&
        this.signUp.address != "" &&
        this.signUp.company_name != "" &&
        this.signUp.license_number != "" &&
        this.signUp.password != "" &&
        this.signUp.confirm_password != "" &&
        this.signUp.region_id != "" &&
        this.signUp.area_id != "" &&
        this.signUp.email != "" &&
        this.signUp.surname != "" &&
        this.signUp.middlename != "" &&
        this.signUp.email != "" &&
        this.checkPassword == false
      ) {
        await this.register(this.signUp);
        if (this.getRegisterError.success) {
          toast.fire({
            type: "success",
            icon: "success",
            title:
              "Ваш пароль отправлен на ваш e-mail. проверьте пожалуйста свою электронную почту!",
          });
          this.signUp.region_id = "";
          this.signUp.area_id = "";
          this.signUp.name = "";
          this.signUp.city = "";
          this.signUp.bank_number = "";
          this.signUp.oked = "";
          this.signUp.mfo = "";
          this.signUp.inn = "";
          this.signUp.phone = "";
          this.signUp.address = "";
          this.signUp.company_name = "";
          this.signUp.license_number = "";
          this.signUp.password = "";
          this.signUp.confirm_password = "";
          this.signUp.email = "";
          this.signUp.license_type = "";
          this.signUp.license_date = "";
          this.signUp.trusted_person = "";
          this.signUp.surname = "";
          this.signUp.middlename = "";
        } else {
          this.errorMsgSign = this.getRegisterError.message;
        }
      } else {
        this.requiredInput = true;
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