<template>
	<div class="is-last-orders-wrapper">
		<sdCards :title="t('shop.dashboard.lastOrders.title')" class="is-home-last-orders-table">
			<template #button>
				<router-link to="/">{{ t('shop.dashboard.lastOrders.showAllOrders') }}</router-link>
			</template>
			<UserTableStyleWrapper>
				<TableWrapper class="table-bordered table-responsive">
					<a-table
						:columns="orderColumns"
						:dataSource="orderData"
						:pagination="false"
					/>
				</TableWrapper>
			</UserTableStyleWrapper>
		</sdCards>
	</div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {UserTableStyleWrapper,} from "@/views/shop/style";
import {TableWrapper} from "@/features/tableWrapper";
import {useHttps} from "@/config/http/http.js";
import {useI18n} from "vue-i18n";

const https = useHttps();
const {t} = useI18n({useScope: "global"});

const orderColumns = computed(() => [
	{
		title: t('shop.dashboard.lastOrders.columns.customer'),
		dataIndex: "customer",
		key: "customer",
	},
	{
		title: t('shop.dashboard.lastOrders.columns.advert'),
		dataIndex: "soldAd",
		key: "soldAd",
	},
	{
		title: t('shop.dashboard.lastOrders.columns.price'),
		dataIndex: "price",
		key: "price",
	},
	{
		title: t('shop.dashboard.lastOrders.columns.state'),
		dataIndex: "state",
		key: "state",
	},
])

const orderStates = computed(() => ({
	0: {
		class: "",
		text: t('orderStates.uncertain')
	},
	1: {
		class: "active",
		text: t('orderStates.delivered')
	},
	2: {
		class: "deactivate",
		text: t('orderStates.waitingSellerDelivery')
	},
	3: {
		class: "blocked",
		text: t('orderStates.waitingBuyerVerify')
	},
	4: {
		class: "blocked",
		text: t('orderStates.waitingSellerEvidence')
	},
	5: {
		class: "blocked",
		text: t('orderStates.evaluatedSellerEvidence')
	},
	6: {
		class: "blocked",
		text: t('orderStates.cancelByBuyer')
	},
	7: {
		class: "blocked",
		text: t('orderStates.cancelBySeller')
	},
	8: {
		class: "blocked",
		text: t('orderStates.cancelBySystem')
	},
}))

const currency = computed(() => t('currency'))

const lastOrders = ref([]);

const orderData = computed(() =>
	lastOrders.value.map((order) => {
		if (!!!order) return;
		const {
			Avatar,
			UserName,
			AdvertId,
			AdvertImage,
			Title,
			Price,
			State,
      UserId
		} = order;
		return {
			key: AdvertId,
			customer: (
          <router-link to={`/profile/${UserId}`}>

          <div className="user-info">
					<span class="user-info-box">
					<figure>

            	<is-image
                  style={{width: "30px"}}
                  radius="50%"
                  source={Avatar}
                  alt=""
                  fit="cover"
                  classes="is-circle"
              />
					</figure>
					<figcaption>
						<span className="user-designation">{UserName}</span>
					</figcaption>
					</span>
				</div>
          </router-link>

      ),
			soldAd: (
				<div className="user-info">
					<figure>
						<is-image
							width={40}
							source={AdvertImage}
							alt=""
							classes="is-table-img"
						/>
					</figure>
					<figcaption>
						<span className="user-designation">{Title}</span>
					</figcaption>
				</div>
			),
			price: (
				<span class="font-weight-normal">
              {Price} {currency.value}
            </span>
			),
			state: (
				<span class={`status-text ${orderStates.value[State].class} cursor-help`}>
              {orderStates.value[State].text}
            </span>
			),
		};
	})
);
const getMyLastOrders = async () => {
	const response = await https.post("/merchant/v1/getMyLastOrders");
	lastOrders.value = response.data.datas;
};

onMounted(() => {
	getMyLastOrders()
});
</script>

<style scoped lang="scss">
.is-last-orders-wrapper {
	height: 100%;

	> div {
		height: 100%;
	}

	.user-designation {
		font-size: 14px !important;
	}
}

.kozyMj.icon-single.icon-single {
	padding: 5px 5px;
}

.is-home-last-orders-table .ant-card-body .ftAUSF {
	padding: 0;
}

span.user-info-box {
	display: flex !important;
	flex-direction: row;
	align-items: center;
	padding-right: 15px;
	border-radius: 4px;
	padding-top: 5px;
	padding-bottom: 5px;
	cursor:pointer;

	&:hover{
		background: #f3f3f3;
	}
}
</style>
