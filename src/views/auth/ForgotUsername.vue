<template>
	<AuthWrapper>
		<div class="auth-notice top">
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
		          t("forgotUsername.forgotUsername")
	          }}</span></sdHeading
				>
				<div class="forgot-info">
					<h3>{{ t("forgotUsername.forgotInfoTitle") }}</h3>
					{{ t("forgotUsername.forgotInfoText") }}
				</div>
				<div class="forgotContents">
					<a-form-item
						v-show="formState.selection == 'Mail'"
						name="email"
						:label="t('forgotUsername.emailAddress')"
					>
						<a-input
							size="small"
							v-model:value="formState.email"
							:placeholder="t('forgotUsername.emailAddressPlaceholder')"
						>
							<template #prefix>
								<MailOutlined/>
							</template>
						</a-input>
					</a-form-item>
					<a-form-item
						v-show="formState.selection == 'SMS'"
						name="phone"
						:label="t('forgotUsername.phoneNumber')"
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
									t("forgotUsername.selectionEmail")
								}}
							</a-radio>
							<a-radio :value="'SMS'">{{
									t("forgotUsername.selectionPhone")
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
									? t("forgotUsername.loading")
									: t("forgotUsername.sendUsername")
							}}
						</sdButton>
					</a-form-item>
					<p class="return-text">
						{{ t("forgotUsername.remember") }}
						<router-link to="/auth/signin">{{
								t("forgotUsername.signIn")
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
import {forgotUsernameServices} from "@/services/auth/auth.service.js";

const {t, locale, availableLocales} = useI18n({useScope: "global"});
const isLoading = ref(false);
const modalContent = ref("");

const handleSubmit = async () => {
	isLoading.value = true;
	if (formState.email || formState.phone) {
		const response = await forgotUsernameServices({formState});
		console.log(response);
		if (response.data.success) {
			modalContent.value = strippedMessages(response.data.message);
			isLoading.value = false;
			succesSendUsername();
		} else {
			formState.email = null;
			formState.phone = null;
			message.error(response.data.message);
			isLoading.value = false;
		}
	} else {
		message.error("Lütfen email veya telefon numarasını giriniz");
		isLoading.value = false;
	}
};

const strippedMessages = (message) => {
	return message.replace(/(<([^>]+)>)/gi, "");
};

const succesSendUsername = () => {
	Modal.success({
		title: () => t("forgotUsername.modalTitle"),
		content: () => modalContent.value,
	});
	formState.email = null;
	formState.phone = null;
};

const formState = reactive({
	email: null,
	phone: null,
	selection: "Mail",
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

.forgot-info {
	margin-bottom: 20px;
	background-color: #fbeff8;
	padding: 15px 25px;
	border-radius: 8px;
}

.auth-contents {
	margin-top: 25px;
}

.btn-reset {
	margin-top: 8px;
}
</style>