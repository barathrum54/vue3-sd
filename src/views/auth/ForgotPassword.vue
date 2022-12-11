<template>
	<AuthWrapper>
		<div class="auth-notice top">
			<div>
				<a-modal
					v-model:visible="modalVisible"
					:title="modalTitle"
					ok-text="Onayla"
					cancel-text="İptal"
					@ok="handleOk()"
				>
					<p>{{ modalText }}</p>
					<a-input
						size="large"
						:placeholder="t('forgotPassword.verificationCodePlaceholder')"
						v-is-mask="'######'"
						v-model:value="modalInputData"
						@keydown.enter="handleOk"
					></a-input>
				</a-modal>

				<a-modal
					v-model:visible="changePasswordVisible"
					:title="modalTitle"
					ok-text="Şifreyi Değiştir"
					@ok="passwordChange()"
				>
					<a-alert
						message="Bilgilendirme"
						type="info"
						class="mb-1"
						show-icon
					>
						<template #description>
							Merhaba <b>{{ modalText }}</b> adlı hesabınız için yeni şifre oluşturun,<br>Oluşturacak olduğunuz şifre 6 ila 20 karakter arasında olmalıdır.
						</template>
					</a-alert>
					<a-form
						layout="vertical">
						<a-form-item
							label="Yeni Şifreniz"
						>
							<a-input-password v-model:value="passwordFormState.Password" size="large" />
						</a-form-item>
						<a-form-item
							label="Tekrar Yeni Şifreniz"
						>
							<a-input-password v-model:value="passwordFormState.RetryPassword" size="large" />
						</a-form-item>
					</a-form>
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
					<span class="color-secondary">{{
							t("forgotPassword.forgotPassword")
						}}</span></sdHeading
				>
				<div class="forgot-info">
					<h3>{{ t("forgotPassword.forgotInfoTitle") }}</h3>
					{{ t("forgotPassword.forgotInfoText") }}
				</div>
				<div class="forgotContents">
					<a-form-item
						v-show="formState.selection == 'Mail'"
						name="email"
						:label="t('forgotPassword.emailAddress')"
					>
						<a-input
							size="small"
							v-model:value="formState.email"
							:placeholder="t('forgotPassword.emailAddressPlaceholder')"
						>
							<template #prefix>
								<MailOutlined/>
							</template>
						</a-input>
					</a-form-item>
					<a-form-item
						v-show="formState.selection == 'SMS'"
						name="phone"
						:label="t('forgotPassword.phoneNumber')"
					>
						<a-input
							size="small"
							v-is-mask="'### ### ## ##'"
							v-model:value="formState.phone"
							:placeholder="'532 532 45 67'"
						>
							<template #prefix>
								<PhoneOutlined :rotate="90"/>
							</template>
						</a-input>
					</a-form-item>
					<div>
						<a-radio-group v-model:value="formState.selection">
							<a-radio :value="'Mail'">{{
									t("forgotPassword.selectionEmail")
								}}
							</a-radio>
							<a-radio :value="'SMS'">{{
									t("forgotPassword.selectionPhone")
								}}
							</a-radio>
						</a-radio-group>
					</div>
					<a-form-item>
						<sdButton
							class="btn-reset mt-1"
							htmlType="submit"
							type="primary"
							@click="handleSubmit"
							size="large"
							block
						>
							{{
								isLoading
									? t("forgotPassword.loading")
									: t("forgotPassword.resetPassword")
							}}
						</sdButton>
					</a-form-item>
					<p class="return-text">
						{{ t("forgotPassword.remember") }}
						<router-link to="/auth/signin">{{
								t("forgotPassword.signIn")
							}}
						</router-link>
					</p>
				</div>
			</a-form>
		</div>
	</AuthWrapper>
</template>
<script setup>
import {reactive, ref} from "vue";
import {message, Modal} from "ant-design-vue";
import {AuthWrapper} from "./style";
import {NavAuth} from "@/components/springDash/utilities/auth-info/auth-info-style";
import {useI18n} from "vue-i18n";
import {MailOutlined, PhoneOutlined} from "@ant-design/icons-vue";
import {forgotPasswordSecurityCodeServices, forgotPasswordServices, newPassword} from "@/services/auth/auth.service.js";

const {t, locale, availableLocales} = useI18n({useScope: "global"});
const isLoading = ref(false);
const modalText = ref("");
const modalTitle = ref("Güvenlik Kodu Onayı");
const modalVisible = ref(false);
const changePasswordVisible = ref(false);
const modalInputData = ref("");

const handleSubmit = async () => {
	isLoading.value = true;
	const response = await forgotPasswordServices({formState});
	if (response.data.success) {
		formState.returnToken = response.data.returnToken;
		modalText.value = strippedMessages(response.data.message);
		isLoading.value = false;
		showModal();
	} else
		message.error(response.data.message);
};

const handleOk = () => {
	if (modalInputData.value) {
		formState.securityCode = modalInputData.value;
		forgotPasswordSecurityCodeServices({formState}).then((response) => {
			console.log(response);
			if (response.data.success) {
				hideModal();
				modalInputData.value = null;

				modalText.value = response.data.userName;
				modalTitle.value = 'Yeni Şifre Oluştur';

				changePasswordVisible.value = true;
				passwordFormState.passwordToken = response.data.passwordToken;
				passwordFormState.UserName = response.data.userName;
			} else
			{
				modalInputData.value = "";
				message.error(response.data.message);
			}

		});
	}
};

const passwordChange = () => {
	newPassword({formState: passwordFormState}).then((response) => {
		console.log(response);
		if (response.data.success) {
			hideModal();
			changePasswordVisible.value = false;
			message.success();
		} else
			message.error(strippedMessages(response.data.message));
	});
};

const successReset = (content) => {
	Modal.success({
		title: () => t("forgotPassword.modalTitle"),
		content: () => content,
	});
	formState.email = null;
	formState.phone = null;
	formState.returnToken = "";
	formState.securityCode = "";
};

const strippedMessages = (message) => {
	return message.replace(/(<([^>]+)>)/gi, "");
};
const formState = reactive({
	email: null,
	phone: null,
	selection: "Mail",
	securityCode: null,
	returnToken: "",
});
const passwordFormState = reactive({
	passwordToken: "",
	UserName: "",
	Password: "",
	RetryPassword: "",
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
const succesReset = () => {
	message.success("Şifreniz başarıyla sıfırlandı!");
	isLoading.value = false;
};
const changeLanguage = (lang) => {
	locale.value = lang;
};
const showModal = () => {
	modalVisible.value = true;
};
const hideModal = () => {
	modalVisible.value = false;
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

.forgot-info {
	margin-bottom: 20px;
	background-color: #fbeff8;
	padding: 15px;
	border-radius: 8px;
}

.auth-contents {
	margin-top: 25px;
}

.btn-reset {
	margin-top: 8px;
}
</style>