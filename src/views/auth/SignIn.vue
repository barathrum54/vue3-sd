<template>
	<AuthWrapper>
		<div class="auth-notice top">
			<div>
				<a-modal
					v-model:visible="visible"
					:title="modalTitle"
					ok-text="Onayla"
					cancel-text="İptal"
					@ok="handleOk()"
					@cancel="handleCancel()"
				>
					<p>{{ modalText }}</p>
					<a-input
						v-model:value="inputData"
						@keydown.enter="handleOk"
					></a-input>
				</a-modal>
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
						<img :src="languages[locale].image" alt=""/>
					</a>
				</sdDropdown>
			</div>
		</div>
		<div class="auth-contents">
			<a-form :model="formState" layout="vertical">
				<sdHeading as="h3">
					<span class="">{{
							t("signIn.signIn")
						}}</span></sdHeading
				>
				<a-form-item name="username" :label="t('signIn.username')">
					<router-link
						class="forgot-link forgot-position"
						to="/auth/forgotUsername"
					>
						{{ t("signIn.forgotUsername") }}
					</router-link>
					<a-input
						v-model:value="formState.username"
						size="small"
						:placeholder="t('signIn.usernamePlaceholder')"
					>
						<template #prefix>
							<UserOutlined/>
						</template>
					</a-input>
				</a-form-item>
				<a-form-item name="password" :label="t('signIn.password')">
					<a-input-password
						size="small"
						v-model:value="formState.password"
						:placeholder="t('signIn.passwordPlaceholder')"
					>
						<template #prefix>
							<LockOutlined/>
						</template>
					</a-input-password>
				</a-form-item>
				<div class="auth-form-action">
					<a-checkbox @change="onChange">{{
							t("signIn.rememberMe")
						}}
					</a-checkbox>
					<router-link class="forgot-link" to="/auth/forgotPassword">
						{{ t("signIn.forgotPassword") }}
					</router-link>
				</div>
				<a-form-item>
					<sdButton
						class="btn-signin btn-block"
						type="primary"
						htmlType="submit"
						@click="handleSubmit"
						size="large"
						block
					>
						{{ isLoading ? t("signIn.loading") : t("signIn.signIn") }}
					</sdButton>
				</a-form-item>
				<ul class="social-login">
					<li>
						<a class="google-signup" href="#">
							<img :src="require('@/static/img/google.png')" alt=""/>
							<span>{{ t("signIn.signInWithGoogle") }}</span>
						</a>
					</li>
				</ul>
				<p class="form-divider">
					<span>{{ t("signIn.or") }}</span>
				</p>
				<p>Henüz bir hesabınız yok mu?</p>

				<sdButton
					class="btn-signin btn-block"
					type="white"
					htmlType="submit"
					@click="$router.push('/auth/signup')"
					size="large"
					block
				>
					{{ isLoading ? t("signIn.loading") : t("signIn.createAccoutNow") }}
				</sdButton>
			</a-form>
		</div>
	</AuthWrapper>
</template>
<script setup>
import {LockOutlined, UserOutlined,} from "@ant-design/icons-vue";
import {reactive, ref} from "vue";
import {NavAuth} from "@/components/springDash/utilities/auth-info/auth-info-style";
import {useRouter} from "vue-router";
import {message, Modal} from "ant-design-vue";
import {AuthWrapper} from "./style";
import {storeToRefs} from "pinia";
import {useAuthStore} from "@/store/auth/auth.store.js";
import {useUserStore} from "@/store/user/user.store.js";
import {useI18n} from "vue-i18n";
import {sendVerificationCodeServices, signinServices,} from "@/services/auth/auth.service.js";


const {t, locale, availableLocales} = useI18n({useScope: "global"});
const isLoading = ref(false);

const checked = ref(null);
const visible = ref(false);
const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();
const {isAuthenticated} = storeToRefs(authStore);
const modalText = ref("");
const inputData = ref("");
const tryCount = ref(0);
const falseCount = ref(0);
const modalTitle = ref("");
const authToken = ref("");

const handleSubmit = async () => {

	grecaptcha.ready(async () => {
		formState.token = await grecaptcha.execute("6LfIfZEdAAAAANcxbLH8izj18olFscf20nu_zOju", {action: 'user_login'});
		isLoading.value = true;
		if (formState.username == "") {
			message.error("Kullanıcı adı boş bırakılamaz !");
			isLoading.value = false;
			return;
		} else if (formState.password == "") {
			message.error("Şifre boş bırakılamaz !");
			isLoading.value = false;
			return;
		} else {

			const response = await signinServices({formState});
			tryCount.value = response.data.TryIp;

			if (response.data.success) {
				if (response.data.result.PhoneVerify == "0") {
					errorSms();
					isLoading.value = false;
					clearForm();
				} else if (response.data.result.MailVerify == false) {
					errorMail();
					isLoading.value = false;
					clearForm();
				} else if (response.data.result.IdentityVerify == false) {
					errorIdentity();
					isLoading.value = false;
					clearForm();
				} else successLogin(response);
			} else if (!response.data.success) {
				authToken.value = response.data.authToken;
				if (response.data.smsonay) {
					modalTitle.value = "SMS Doğrulaması";
					modalText.value = `Lütfen ${
						response.data.phone1 + response.data.phone2
					}**** nolu telefonunuza gelen onay kodunu giriniz.`;
					showModal();
				} else if (response.data.mailonay) {
					modalTitle.value = "Mail Doğrulaması";
					modalText.value = `Lütfen ${
						response.data.mail1 + response.data.mail2
					} mail adresinize gelen onay kodunu giriniz.`;
					showModal();
				} else errorLogin();
			}
		}
	});

};

const successLogin = (response) => {
	if (response.data.result.PhoneVerify == "0") {
		errorSms();
		isLoading.value = false;
		clearForm();
	} else if (response.data.result.MailVerify == false) {
		errorMail();
		isLoading.value = false;
		clearForm();
	} else if (response.data.result.IdentityVerify == false) {
		errorIdentity();
		isLoading.value = false;
		clearForm();
	} else {
		message.success("Giriş başarılı, kontrol paneline yönlendiriliyorsunuz...");
		userStore.setUser(response.data.result);
		const token = response.data.token;
		const SocketToken = response.data.SocketToken;
		authStore.setTokens({token, SocketToken});
		router.push("/shop").then();
	}
};

const onChange = (checked) => {
	checked.value = checked;
};
const handleOk = () => { //TODO- Yorum satırı olan kısım tryIp düzeldiğinde eklenecek.(response tryIp=0 geliyor) 
	if (inputData.value) {//&& tryCount.value > 0
		sendVerificationCodeServices(inputData.value,authToken.value).then((response) => {
			if (response.data.success) {
				hideModal();
				successLogin(response);
			} else {
				tryCount.value--;
				falseCount.value++;
				message.info("Onay kodu yanlış, tekrar deneyiniz.");
				inputData.value = "";
			}
		});
	}
	// else if (inputData.value && tryCount.value == 0) {
	//   message.error(
	//     `Onay kodunu ${falseCount.value} kez hatalı girdiniz, lütfen yeni onay kodu ile deneyiniz.`
	//   );
	//   falseCount.value = 0;
	//   hideModal();
	// }
};
const handleCancel = () => {
	hideModal();
	clearForm();
};
const clearForm = () => {
	isLoading.value = false;
	formState.username = "";
	formState.password = "";
	formState.token = "";
};
const errorLogin = () => {
	message.error("Hatalı kullanıcı adı veya şifre !");
	isLoading.value = false;
	clearForm();
};
const errorSms = () => {
	Modal.error({
		title: () => "SMS Doğrulama Hatası",
		content: () => "Lütfen SMS Doğrulamanızı gerçekleştirip tekrar deneyiniz.",
	});
	clearForm();
};
const errorMail = () => {
	Modal.error({
		title: () => "Mail Doğrulama Hatası",
		content: () => "Lütfen Mail Doğrulamanızı gerçekleştirip tekrar deneyiniz.",
	});
	clearForm();
};
const errorIdentity = () => {
	Modal.error({
		title: () => "Kimlik Doğrulama Hatası",
		content: () =>
			"Lütfen Kimlik Doğrulamanızı gerçekleştirip tekrar deneyiniz.",
	});
	clearForm();
};

const showModal = () => {
	visible.value = true;
};
const hideModal = () => {
	visible.value = false;
};

const formState = reactive({
	username: "",
	password: "",
	token: "",
});

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
</script>

<style scoped>
.top {
	display: flex;
	justify-content: flex-end;
}

.space {
	margin-left: 10px;
}

.auth-contents {
	margin-top: 25px;
}

.forgot-position {
	display: inline-block;
	right: 0 !important;
	top: -25px;
	position: absolute;
}

.forgot-link {
	font-size: 13px
}
</style>
