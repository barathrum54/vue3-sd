export default [
	{
		id: "h0",
		icon: "home",
		key: "Home",
		title: "menu.routes.summary",
		path: "/shop",
	},
	{
		id: "h1",
		icon: "shopping-bag",
		key: "Adverts",
		title: "menu.routes.advertProcess",
		subRoutes: [
			{
				id: "h10",
				path: "/shop/adverts",
				key: "myAdverts",
				text: "menu.routes.myAdverts",
			},
			{
				id: "h10",
				path: "/changesLog",
				key: "myAdverts",
				text: "menu.routes.changesLog",
			},
		],
	},
	{
		id: "snt0",
		icon: "bell",
		key: "notification",
		title: "menu.routes.notifications",
		subRoutes: [
			{
				id: "snt1",
				path: "/notifications",
				key: "allNotifications",
				text: "menu.routes.allNotifications",
			},

			{
				id: "snt2",
				path: "/notifications/unRead",
				key: "unreadNotifications",
				text: "menu.routes.unreadNotifications",
			},

			{
				id: "snt3",
				path: "/notifications/awaitingAction",
				key: "actionAwaitingNotifications",
				text: "menu.routes.requiringActionNotifications",
			},

			{
				id: "snt4",
				path: "/notifications/systemNotifications",
				key: "systemNotifications",
				text: "menu.routes.systemNotifications",
			},
		],
	},
	{
		id: "so1",
		icon: "shopping-cart",
		key: "orders",
		title: "menu.routes.orders",
		subRoutes: [
			
			{
				id: "soc2",
				path: "/orders/bought",
				key: "boughtOrders",
				text: "menu.routes.purchasedOrder",
			},
			{
				id: "soc3",
				path: "/orders/sold",
				key: "soldOrders",
				text: "menu.routes.thoseOldOrder",
			},
		],
	}
];
