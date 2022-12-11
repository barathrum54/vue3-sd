import {useHttps} from "@/config/http/http.js";

const sendVerificationCodeServices = async (verifyCode,authToken) => {
	const https = useHttps();
	const response = await https.post("/Login", `OnayKodu=${verifyCode}&authToken=${authToken}`);
	return response;
};
const signinServices = async ({formState}) => {
	const https = useHttps();
	const response = await https.post(
		"/Login",
		`UserName=${formState.username}&Password=${formState.password}&g-recaptcha-response=${formState.token}`
	);
	return response;
};
const signupServices = async ({formState}) => {
	const https = useHttps();
	const response = await https.post(
		"/Register",
		`uyelikSozlesmesi=${formState.agreement}&kullaniciAdi=${formState.username}&mailAdresiniz=${formState.email}&tekrarMailAdresiniz=${formState.emailAgain}&parolaniz=${formState.password}&tekrarParolaniz=${formState.passwordAgain}&adinizSoyadiniz=${formState.fullname}&telefonNumaraniz=${formState.phoneNumber}&dogumTarihiniz=${formState.birthday}`
	);
	return response;
};
const forgotPasswordServices = async ({formState}) => {
	const https = useHttps();
	if (formState.selection === "Mail") {
		const response = await https.post(
			"/ForgetPasswordNew",
			`Yontem=${formState.selection}&UserName=${formState.email}`
		);
		return response;
	} else if (formState.selection === "SMS") {
		const response = await https.post(
			"/ForgetPasswordNew",
			`Yontem=${formState.selection}&UserName=${formState.phone}`
		);
		return response;
	}
};
const forgotPasswordSecurityCodeServices = async ({formState}) => {
	const https = useHttps();
	const response = await https.post(
		"/ForgetPasswordNew",
		`securityCode=${formState.securityCode}&returnToken=${encodeURIComponent(formState.returnToken)}`
	);
	return response;
};

const forgotUsernameServices = async ({formState}) => {
	const https = useHttps();
	if (formState.selection === "Mail") {
		const response = await https.post(
			"/ForgetUserName",
			`Yontem=${formState.selection}&UserName=${formState.email}`
		);
		return response;
	} else if (formState.selection === "SMS") {
		const response = await https.post(
			"/ForgetUserName",
			`Yontem=${formState.selection}&UserName=${formState.phone}`
		);
		return response;
	}
};

const newPassword = async ({formState}) => {
	const https = useHttps();
	const response = await https.post(
		"/newPassword",
		`Password=${formState.Password}&RetryPassword=${formState.RetryPassword}&passwordToken=${encodeURIComponent(formState.passwordToken)}`
	);
	return response;
};

export {
	sendVerificationCodeServices,
	signinServices,
	signupServices,
	forgotPasswordServices,
	forgotPasswordSecurityCodeServices,
	forgotUsernameServices,
	newPassword
};
