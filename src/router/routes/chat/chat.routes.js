export default [
    {
        name: "chat-admin-layout",
        path: "/chat",
        components: {
            default: () => import("@/layout/admin/adminLayout.vue"),
        },
        children: [
            {
                name: "chat-main-view",
                path: "",
                components: {
                    default: () => import("@/views/chat/chat.vue")
                },
                meta: {
                    name: "layout",
                    requiredAuth: true
                },
                children: [
                    {
                        name: "archive-chats",
                        path: "archive/:chatId",
                        components: {
                            default: () => import("@/features/chat/list/IsArchiveChatList.vue"),
                            child: () => import("@/features/chat/detail/IsChatDetail.vue")
                        },
                        meta: {
                            requiredAuth: true
                        }
                    },
                    {
                        name: "unarchive-chats",
                        path: "unarchive/:chatId",
                        components: {
                            default: () => import("@/features/chat/list/IsUnarchiveChatList.vue"),
                            child: () => import("@/features/chat/detail/IsChatDetail.vue")
                        },
                        meta: {
                            requiredAuth: true
                        }
                    }
                ]
            }
        ]
    }
]