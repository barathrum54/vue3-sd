<template>
	<SessionChartWrapper>
		<sdCards :title="t('shop.dashboard.lastNotifications.title')" class="is-home-notification-card">
			<template #button>
				<router-link to="/">{{ t('shop.dashboard.lastNotifications.showAllNotifications') }}</router-link>
			</template>

			<div v-if="loading" class="sd-spin">
				<a-spin/>
			</div>

			<TableWrapper v-else class="table-responsive">
				<div class="table-bordered">
					<a-table
						:dataSource="notificationTableDate"
						:columns="columns"
						:pagination="false"
					/>
				</div>
			</TableWrapper>
		</sdCards>
	</SessionChartWrapper>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {SessionChartWrapper} from "@/views/shop/style";
import {TableWrapper} from "@/features/tableWrapper";
import {useHttps} from "@/config/http/http.js";
import {useI18n} from "vue-i18n";

const https = useHttps();

const {t} = useI18n({useScope: "global"});

const columns = computed(() => [
	{
		title: t('shop.dashboard.lastNotifications.columns.notification'),
		dataIndex: "notification",
		key: "notification",
	},
	{
		title: t('shop.dashboard.lastNotifications.columns.process'),
		dataIndex: "process",
		key: "process",
	},
])

const loading = ref(true);
const lastNotifications = ref([]);

const notificationTableDate = computed(() =>
	lastNotifications.value.map((lastNotification) => {
		if (!!!lastNotification) return;
		const {sender, image, title, message, id, seen, dateOfSend, datetime} =
			lastNotification;
		return {
			key: id,
			notification: (
				<div className="user-info">
					<figure class={(seen == "0" ? 'unseen-badge' : '')}>
						<is-image width={40} radius="50%" class={'notificationIcon'} source={image} alt=""/>
					</figure>
					<figcaption>
						<>
							<span>{sender}</span>
							<span
								className="user-designation is-notification-message notification-mini-text"
								v-html={message}
							></span>
						</>
					</figcaption>
				</div>
			),
			process: (
				<div className="table-actions text-right-action">
					<span class="action-datetime">{datetime}</span>
					<sdButton className="btn-icon" type="default" shape="circle">
						<sdFeatherIcons type="eye" size="16"/>
					</sdButton>
				</div>
			),
		};
	})
);

const getMyNotifications = async () => {
	const response = await https.post("https://www.itemsatis.com/api/MyNotifications", {Limit: 10});
	lastNotifications.value = response.data.notifications;
	loading.value = false;
};

onMounted(() => {
	getMyNotifications();
});
</script>

<style scoped lang='scss'>
.table-actions {
	display: flex;
}

.is-home-notification-card {
	//	margin-top: 25px;
}

.kozyMj.icon-single.icon-single {
	padding: 5px 5px;
}

.is-notification-message {
	max-width: 200px;
	overflow: hidden;
}

.fgVmcw span {
	margin: 0 !important;
	padding: 0 !important;
}

.is-home-notification-card .ant-card-body {
	padding: 0 !important;
}

.ant-card-body {
	padding: 0 !important;
}

button {
	border-radius: 50px;
}

.notificationIcon {
	margin-right: 10px;
}

.notification-mini-text {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.table-actions.text-right-action {
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;

	span.action-datetime {
		padding-right: 15px;
		color: #9f9f9f;
		font-weight: normal;
		font-size: 12px;
		opacity: 0;
	}
}

.is-home-notification-card {
	table {
		tr:hover {
			span.action-datetime {
				opacity: 1;
			}
		}
	}
}

figure.unseen-badge {
	position: relative;

	&:after {
		content: "YENİ";
		position: absolute;
		left: 0;
		bottom: -5px;
		background: #f25f5f;
		text-align: center;
		font-size: 10px;
		padding: 0 8px;
		color: white;
		border-radius: 10px;
	}
}

</style>