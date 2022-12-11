import {useUserStore} from "@/store/user/user.store";

const userStore = useUserStore();

export const useSettingsPages = () => {
    const userType = userStore.getUserType
    return [
        {
            id: "s1",
            title: "settings.pages.profileInfos",
            icon: "settings",
            iconPrefix: "feather",
            to: "/settings/profileInfos",
            userTypes: ["shop"]
        },
        {
            id: "s2",
            title: "settings.pages.changePassword",
            icon: "key",
            iconPrefix: "feather",
            to: "/settings/changePassword",
            userTypes: ["shop"]
        },
        {
            id: "s3",
            title: "settings.pages.changeMail",
            icon: "mail",
            iconPrefix: "feather",
            to: "/settings/changeMail",
            userTypes: ["shop"]
        },
        {
            id: "s4",
            title: "settings.pages.changePhone",
            icon: "phone",
            iconPrefix: "feather",
            to: "/settings/changePhoneNumber",
            userTypes: ["shop"]
        },
        {
            id: "s5",
            title: "settings.pages.invoiceInfos",
            icon: "file-text",
            iconPrefix: "feather",
            to: "/settings/invoices",
            userTypes: ["shop"]
        },
        {
            id: "s6",
            title: "settings.pages.accountSecurity",
            icon: "shield",
            iconPrefix: "feather",
            to: "/settings/accountSecurity",
            userTypes: ["shop"]
        },
        {
            id: "s7",
            title: "settings.pages.bankAccounts",
            icon: "bell",
            iconPrefix: "feather",
            to: "/settings/bankAccounts",
            userTypes: ["shop"]
        },
        {
            id: "s8",
            title: "settings.pages.loginLogs",
            icon: "map-pin",
            iconPrefix: "feather",
            to: "/settings/loginLogs",
            userTypes: ["shop"]
        },
        {
            id: "s9",
            title: "settings.pages.balanceMovements",
            icon: "bell",
            iconPrefix: "feather",
            to: "/settings/balanceMoves",
            userTypes: ["shop"]
        },
        {
            id: "s10",
            title: "settings.pages.linkedAccounts",
            icon: "bell",
            iconPrefix: "feather",
            to: "/",
            userTypes: ["shop"]
        },
        {
            id: "s11",
            title: "settings.pages.notificationSettings",
            icon: "bell",
            iconPrefix: "feather",
            to: "/",
            userTypes: ["shop"]
        },
        {
            id: "s12",
            title: "settings.pages.applicationSettings",
            icon: "bell",
            iconPrefix: "feather",
            to: "/",
            userTypes: ["shop"]
        },
        {
            title: "settings.pages.chatSettings",
            icon: "message-square",
            iconPrefix: "feather",
            to: "/",
            userTypes: ["shop"]
        }
    ].filter(p => p.userTypes.includes(userType))
}