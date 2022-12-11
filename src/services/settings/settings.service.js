import { useHttps } from "@/config/http/http.js";

const https = useHttps();

export const changePassword = async (current, new_password, new_password_r) => {
  const response = await https.post(
    "/changePassword",
    `SuankiPw=${current}&YeniPw=${new_password}&YeniPwTekrar=${new_password_r}`
  );
  return response;
};

export const changeMail = async (current, new_mail, new_mail_r) => {
  const response = await https.post(
    "/changeMail",
    `SuankiMail=${current}&YeniMail=${new_mail}&YeniMailTekrar=${new_mail_r}`
  );
  return response;
};
export const verifyMail = async (verifyCode, changeToken, verifyToken) => {
  let query_str = '';
  console.log('verifyCode', verifyCode)
  console.log('changeToken', changeToken)
  console.log('verifyToken', verifyToken)
  if (changeToken) {
    query_str = `MailChange=${verifyCode}&changeToken=${changeToken}`
  }else if(verifyToken){
    query_str = `MailVerify=${verifyCode}&verifyToken=${verifyToken}`
  }
  const response = await https.post(
    "/changeMail",
    `${query_str}`
  );
  return response;
};

export const changePhoneNumber = async (current, new_mail, new_mail_r) => {
  
  const response = await https.post(
    "/changePhone",
    `SuankiTelefon=${current}&YeniTelefon=${new_mail}&YeniTelefonTekrar=${new_mail_r}`
  );
  return response;
};
export const verifyPhone = async (verifyCode, changeToken, verifyToken) => {
  let query_str = '';
  console.log('verifyCode', verifyCode)
  console.log('changeToken', changeToken)
  console.log('verifyToken', verifyToken)
  if (changeToken) {
    query_str = `phoneChange=${verifyCode}&changeToken=${changeToken}`

  }else if(verifyToken){
    query_str = `phoneVerify=${verifyCode}&verifyToken=${verifyToken}`
  }
  const response = await https.post(
    "/changePhone",
    `${query_str}`
  );
  return response;
};
export const addBankAccount = async (data) => {
  let response;
  console.log(data.bankName);
  switch (data.type) {
    case "Banka":
      response = await https.post(
        "/newUserBank",
        `BankName=${data.value.bankName}&IBAN=${data.iban}&Owner=${data.owner}&sorumluluk=kabul&Type=${data.type}`
      );
      break;
    case "Ininal":
      response = await https.post(
        "/newUserBank",
        `IninalBarkod=${data.ininal_barkod}&Owner=${data.owner}&sorumluluk=kabul&Type=${data.type}`
      );
      break;
    case "Papara":
      response = await https.post(
        "/newUserBank",
        `PaparaHesap=${data.papara_hesap}&Owner=${data.owner}&sorumluluk=kabul&Type=${data.type}`
      );
      break;

    default:
      break;
  }

  return response;
};
export const updateAccountSecurity = async (type, data) => {
  let query_str = "";
  console.log(type);
  switch (type) {
    case "MailSecurity":
      query_str = `MailSecurity=${data.mail_guvenligi}`;
      break;
    case "AboardSecurity":
      query_str = `AboardSecurity=${data.yurtdisi_koruma}`;
      break;
    case "SMSSecurity":
      query_str = `SMSSecurity=${data.sms_guvenligi}`;
      break;
    default:
  }
  const response = await https.post(
    "/merchant/v1/accountSecurity",
    `${query_str}`
  );
  return response;
};
export const verifyAccountSecurity = async (code, token) => {
  const response = await https.post(
    "/merchant/v1/accountSecurityVerify",
    `SecurityCode=${code}&VerifyToken=${token}`
  );
  return response;
};

export const getLoginLogs = async (page = 1) => {
  const response = await https.post("/getLoginLogs", `Page=${page}`);
  return response;
};
export const getBalanceMovements = async (page = 1) => {
  const response = await https.post("/getBalanceMovements", `Page=${page}`);
  return response;
};

export const getAccountSecurity = async () => {
  const response = await https.post("/getAccountSecurity");
  return response;
};

export const getBankList = async () => {
  const response = await https.post("/getBankList");
  return response;
};
export const userBankDelete = async (bankId) => {
  const response = await https.post("/userBankDelete", `BankId=${bankId}`);
  return response;
};
export const getCities = async () => {};
export const getDistricts = async (cityCode) => {
	const response = await https.post("/getDistricts", `cityID=${cityCode}`)
	return response;
};
export const getInvoiceData = async() => {
	const response = await https.post("/getMyInvoices")
	return response;
};
export const mailInvoiceData = async(i) => {
  const response = await https.post("/getUserInvoiceMail",`faturaID=${i}`)
	return response;
}
export const getInvoiceLink = async(i) => {
  const response = await https.post("/getUserInvoice", `faturaID=${i}`)
	return response;
}
export const getBillingData = async() => {
  const response = await https.post("/getBillingInformation")
	return response;

}
export const changeBillingDatas = async (data) => {
  const response = await https.post(
    "/changeBillingDatas",
    `faturaTipi=${data.faturaTipi}&Name=${data.Name}&SurName=${data.SurName}&TcKimlik=${data.TcKimlik}&Phone=${data.Phone}&CompanyName=${data.CompanyName}&TaxAdministration)=${data.TaxAdministration}&TaxNumber=${data.TaxNumber}&Address=${data.Address}&Sehir=${data.Sehir}&Ilce=${data.Ilce}`
  );
  return response;
};
export const changeProfileDatas = async (postData) => {
	const response = await https.post("/changeProfileDatas", `Hakkinda=${postData.Hakkinda}&Sehir=${postData.Sehir}`)
	return response;
};
export const getUserProfileData = async () => {
	const response = await https.post("/getUserProfileDatas")
	return response;
};
export const checkLogin = async() => {
	const response = await https.post("/checkLogin")
	return response;
}