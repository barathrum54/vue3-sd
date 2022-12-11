<template>
  <AuthWrapper>
    <div class="auth-notice top">
      <div class="noAccount">
        {{ t("signUp.haveAccount") }}
      </div>
      <div class="space">
        <router-link to="/auth/signin">{{ t("signUp.signIn") }}</router-link>
      </div>
      <div class="nav-author space">
        <sdDropdown placement="bottomRight" :action="['click']">
          <template v-slot:overlay>
            <NavAuth>
              <a
                v-for="(lang, index) in availableLocales"
                :key="lang + '_' + index"
                @click="() => changeLanguage(lang)"
                to="#"
              >
                <img
                  :src="languages[lang].image"
                  :alt="t(`${languages[lang].key}`)"
                />
                <span>{{ t(`${languages[lang].key}`) }}</span>
              </a>
            </NavAuth>
          </template>
          <a to="#" class="head-example">
            <img :src="languages[locale].image" alt="" />
          </a>
        </sdDropdown>
      </div>
    </div>
    <div class="auth-contents">
      <a-form name="register" :model="formState" layout="vertical">
        <sdHeading as="h3">
          Merchant Panel |
          <span class="color-secondary">{{ t("signUp.signUp") }}</span>
        </sdHeading>
        <a-form-item :label="t('signUp.username')" name="name">
          <a-input
            size="small"
            v-model:value="formState.username"
            :placeholder="t('signUp.usernamePlaceholder')"
          >
            <template #prefix><UserOutlined /></template>
          </a-input>
        </a-form-item>
        <div class="group">
          <a-form-item
            name="email"
            :label="t('signUp.emailAddress')"
            class="group-item"
          >
            <a-input
              size="small"
              v-model:value="formState.email"
              :placeholder="t('signUp.emailAddressPlaceholder')"
            >
              <template #prefix><MailOutlined /></template>
            </a-input>
          </a-form-item>
          <a-form-item
            name="email"
            :label="t('signUp.emailAddressAgain')"
            class="group-item"
          >
            <a-input
              size="small"
              v-model:value="formState.emailAgain"
              :placeholder="t('signUp.emailAddressAgainPlaceholder')"
            >
              <template #prefix><MailOutlined /></template>
            </a-input>
          </a-form-item>
        </div>
        <div class="group">
          <a-form-item
            :label="t('signUp.password')"
            name="password"
            class="group-item"
          >
            <a-input-password
              size="small"
              type="password"
              v-model:value="formState.password"
              :placeholder="t('signUp.passwordPlaceholder')"
            >
              <template #prefix><LockOutlined /></template>
            </a-input-password>
          </a-form-item>
          <a-form-item
            :label="t('signUp.passwordAgain')"
            name="passwordAgain"
            class="group-item"
          >
            <a-input-password
              size="small"
              v-model:value="formState.passwordAgain"
              :placeholder="t('signUp.passwordAgainPlaceholder')"
            >
              <template #prefix><LockOutlined /></template>
            </a-input-password>
          </a-form-item>
        </div>
        <a-form-item :label="t('signUp.fullname')" name="fullname">
          <a-input
            size="small"
            v-model:value="formState.fullname"
            :placeholder="t('signUp.fullnamePlaceholder')"
          >
            <template #prefix><IdcardOutlined /> </template>
          </a-input>
        </a-form-item>
        <div class="group">
          <a-form-item
            :label="t('signUp.phoneNumber')"
            name="phoneNumber"
            class="group-item"
          >
            <a-input
              size="small"
              v-is-mask="'### ### ## ##'"
              v-model:value="formState.phoneNumber"
              :placeholder="'532 532 45 67'"
            >
              <template #prefix><PhoneOutlined :rotate="90" /> </template>
            </a-input>
          </a-form-item>
          <a-form-item
            :label="t('signUp.birthday')"
            name="birthday"
            class="group-item"
          >
            <a-space direction="vertical">
              <a-date-picker
                v-model:value="formState.birthday"
                :format="dateFormatList"
                size="small"
                :placeholder="t('signUp.birthdayPlaceholder')"
              >
                <template #prefix><GiftOutlined /> </template>
              </a-date-picker>
            </a-space>
          </a-form-item>
        </div>
        <div class="auth-form-action">
          <a-checkbox @change="onChangeChecked">
            <a
              href="https://www.itemsatis.com/sozlesme/uyelik-sozlesmesi.html"
              target="_blank"
            >
              {{ t("signUp.aggrement") }}
            </a>
          </a-checkbox>
        </div>
        <a-form-item>
          <sdButton
            class="btn-create btn-block"
            htmlType="submit"
            type="primary"
            size="large"
            @click="handleSubmit"
            block
          >
            {{ isLoading ? t("signUp.loading") : t("signUp.signUp") }}
          </sdButton>
        </a-form-item>
        <p class="form-divider">
          <span>{{ t("signUp.or") }}</span>
        </p>
        <ul class="social-login signin-social">
          <li>
            <a class="google-signup" href="#">
              <img :src="require('@/static/img/google.png')" alt="" />
              <span>{{ t("signUp.signInWithGoogle") }}</span>
            </a>
          </li>
          <li>
            <a class="facebook-sign" href="#">
              <FacebookOutlined />
            </a>
          </li>
          <li>
            <a class="twitter-sign" href="#">
              <TwitterOutlined />
            </a>
          </li>
        </ul>
      </a-form>
    </div>
  </AuthWrapper>
</template>
<script setup >
import {
  FacebookOutlined,
  TwitterOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined,
  IdcardOutlined,
  PhoneOutlined,
  GiftOutlined,
} from "@ant-design/icons-vue";
import { AuthWrapper } from "./style";
import moment from "moment";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { signupServices } from "@/services/auth/auth.service.js";
import { NavAuth } from "@/components/springDash/utilities/auth-info/auth-info-style";

const checked = ref(null);
const router = useRouter();
const isLoading = ref(false);
const { t, locale, availableLocales } = useI18n({ useScope: "global" });
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const handleSubmit = async () => {
  isLoading.value = true;
  //console.log(formState.birthday);
  if(formState.birthday==null){
    message.error(t("signUp.birthdayError"));
    isLoading.value = false;
    return;
  }
  formatBirthday(formState.birthday);
  //console.log(formState.birthday._d);
  const response = await signupServices({ formState });
  if (response.data.success) {
    isLoading.value = false;
    message.success(strippedMessages(response.data.message));
    router.push("/auth/signin").then();
  } else if (!response.data.success) {
    isLoading.value = false;
    message.error(strippedMessages(response.data.message));
  }
};

const strippedMessages = (message) => {
  return message.replace(/(<([^>]+)>)/gi, "");
};

const formatBirthday = (date) => {
  const logDate = moment(new Date(Date.parse(date)), "YYYY-MM-DD hh:mm:ss");
  const log_date = logDate.format("YYYY-MM-DD");
  const now = moment();
  console.log(log_date)
  return `${log_date}`;
};

const languages = {
  tr: {
    image: process.env.BASE_URL + "images/flags/turkey.png",
    key: "turkish",
  },
  en: {
    image: process.env.BASE_URL + "images/flags/english.png",
    key: "english",
  },
};

const changeLanguage = (lang) => {
  locale.value = lang;
};

const onChangeChecked = (check) => {
  {
    {
      check.target.checked
        ? (formState.agreement = "on")
        : (formState.agreement = "off");
    }
  }
};

const formState = reactive({
  fullname: "akin baba yaşar",
  username: "akinbaba",
  email: "akintesting@gmail.com",
  emailAgain: "akintesting@gmail.com",
  password: "123456",
  passwordAgain: "123456",
  phoneNumber: "538 558 98 89",
  birthday: "2000-04-02",
  agreement: null,
});
</script>

<style scoped>
.top {
  display: flex;
  justify-content: flex-end;
}
.space {
  margin-left: 10px;
}

.auth-contents form {
  width: 100%;
  max-width: 600px;
  min-width: 300px;
}
.auth-contents{
  margin-top:25px
}
.group {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
}
.group-item {
  display: flex;
  flex-direction: column;
  width: 47%;
}
.ant-calendar-picker {
  width: 100% !important;
}
.ant-space {
  width: 100% !important;
}
</style>

