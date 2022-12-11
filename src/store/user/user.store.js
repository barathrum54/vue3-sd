import { defineStore } from "pinia";
const initialUser = {
  Approved: null,
  Avatar: null,
  Balance: null,
  Birthday: null,
  Cover: null,
  Id: null,
  IdentityVerify: false,
  MailAddress: null,
  MailVerify: false,
  Name: null,
  Password: null,
  Phone: null,
  PhoneVerify: null,
  PositiveRep: null,
  RegisterDate: null,
  SurName: null,
  UserName: null,
  UserType: null,
};
export const useUserStore = defineStore("userStore", {
  state: () => ({
    userType: "shop",
    user: JSON.parse(
      localStorage.getItem("user") || JSON.stringify(initialUser)
    ),
  }),
  getters: {
    getUserType() {
      return this.userType;
    },
    getApproved() {
      return this.user.Approved;
    },
    getAvatar() {
      return this.user.Avatar;
    },
    getBalance() {
      return this.user.Balance;
    },
    getBirthday() {
      return this.user.Birthday;
    },
    getCover() {
      return this.user.Cover;
    },
    getId() {
      return this.user.Id;
    },
    getIdentityVerify() {
      return this.user.IdentityVerify;
    },
    getMailAddress() {
      return this.user.MailAddress;
    },
    getMailVerify() {
      return this.user.MailVerify;
    },
    getName() {
      return this.user.Name;
    },
    getPhone() {
      return this.user.Phone;
    },
    getPhoneVerify() {
      return this.user.PhoneVerify;
    },
    getPositiveRep() {
      return this.user.PositiveRep;
    },
    getRegisterDate() {
      return this.user.RegisterDate;
    },
    getSurname() {
      return this.user.SurName;
    },
    getUsername() {
      return this.user.UserName;
    },
    getFullname() {
      return this.user.Name + " " + this.user.SurName;
    },
  },
  actions: {
    setUserType(userType) {
      this.userType = userType;
    },
    setUser(user) {
        this.user = user;
        localStorage.setItem("user", JSON.stringify(user));
    },
    setMailAddress(value){
      this.user.MailAddress = value;
      this.setUser(this.user);
    },
    setPhone(value){
      this.user.Phone = value;
      this.setUser(this.user);
    },
    clearUser() {
       localStorage.removeItem("user");
        this.$reset();
    }
  },
});
