<template>
	<Sidebar>
		<sdCards>
			<template #title>
        <span>
          <sdFeatherIcons type="sliders" :size="14"/>
          {{ t('orders.filterTitles.filterOrder') }}
        </span>
			</template>
			<div class="filterRow">
				<h4>{{ t('orders.filterTitles.state') }}</h4>
				<a-select
					style="width: 100%"
					v-model:value="_filterData.State"
					mode="multiple"
					placeholder=""
				>
					<a-select-option v-for="i in 9" :value="i">{{
							orderStates[i]
						}}
					</a-select-option>
				</a-select>
			</div>
			<div class="filterRow">
				<h4>{{ t('orders.filterTitles.purchaseId') }}</h4>
				<is-input :errorText="t('orders.filterTitles.purchaseIdErrorText')" :error=orderIdLengthCheck>
					<template #input>
						<a-input onkeypress="return /[0-9]/i.test(event.key)" maxLength="6"
						         v-model:value="_filterData.purchaseId"/>
					</template>
				</is-input>
			</div>
			<div class="filterRow">
				<h4>{{ t('orders.filterTitles.customerName') }}</h4>
				<is-input :errorText="t('orders.filterTitles.customerNameErrorText')" :error=orderNameLengthCheck>
					<template #input>
						<a-input v-model:value="_filterData.userName"/>

					</template>
				</is-input>
			</div>
			<div class="filterRow">
				<h4> {{ t('orders.filterTitles.titleAdvert') }}</h4>
				<is-input :errorText="t('orders.filterTitles.titleAdvertErrorText')" :error=orderTitleLengthCheck>

					<template #input>
						<a-input v-model:value="_filterData.Title"/>

					</template>
				</is-input>
			</div>
			<div class="filterRow">
				<h4>{{ t('orders.filterTitles.dateRange') }}</h4>
				<a-range-picker @change="getDate" v-model:value="tarihAraligi"/>
			</div>

			<a-button style="width: 100%" type="primary" @click="filter" size="large">{{ t('orders.filterTitles.filterOrders') }}</a-button>
			<a-button style="width: 100%" class="mt-half" danger size="large" @click="clearFilters" v-if="_isFiltering">{{ t('orders.orderList.clearOrderFilters') }}</a-button>
		</sdCards>
	</Sidebar>
</template>
<script setup>
import {Sidebar} from "../Style";
import {computed, ref} from "vue";
import {message} from "ant-design-vue";
import {useI18n} from "vue-i18n";
const {t, d} = useI18n({useScope: "global"});

const orderIdLengthCheck = ref(false)
const orderNameLengthCheck = ref(false)
const orderTitleLengthCheck = ref(false)
const emit = defineEmits(["filter"]);
const tarihAraligi = ref([]);
const getDate = (date, dateString) => {
	console.log(dateString);
	tarihAraligi.value = dateString;
};

const orderStates = computed(() => ({
	0: "Belirsiz",
	1: "Teslim Edildi",
	2: "Satıcının Teslim Etmesi Bekleniyor",
	3: "Alıcının Onayı Bekleniyor",
	4: "Satıcının Kanıtı Bekleniyor",
	5: "Satıcı Kanıtı Değerlendiriliyor",
	6: "Alıcı Tarafından Reddedildi",
	7: "Satıcı Tarafından Reddedildi",
	8: "Sistem Tarafından Reddedildi",
}));
const _filterData = ref({
	Search: "",
	purchaseId: "",
	userName: "",
	Title: "",
	StartDate: "",
	FinishDate: "",
	State: [],
});
const filter = () => {
	console.log("filter");
	let date = Object.values(tarihAraligi.value);
	_filterData.value.StartDate = date[0] ? date[0] : "";
	_filterData.value.FinishDate = date[1] ? date[1] : "";
	if ((_filterData.value.State && _filterData.value.State.length > 0) || _filterData.value.purchaseId.length > 2 || _filterData.value.Title.length > 2 || _filterData.value.userName.length > 2 || _filterData.value.StartDate != "") {
		emit("filter", _filterData.value);
		orderIdLengthCheck.value = false
		orderTitleLengthCheck.value = false
		orderNameLengthCheck.value = false
	} else if (_filterData.value.purchaseId.length > 0) {
		orderIdLengthCheck.value = true
	} else if (_filterData.value.Title.length > 0) {
		orderTitleLengthCheck.value = true
		orderIdLengthCheck.value = false
	} else if (_filterData.value.userName.length > 0) {
		orderNameLengthCheck.value = true
		orderIdLengthCheck.value = false
		orderTitleLengthCheck.value = false
	} else {
		message.error('Herhangi bir filtreleme yapmadınız.')
	}
};

const _isFiltering = computed(() => {
	let ___filterData = Object.values(_filterData.value);

	let isFiltering = false;
	___filterData.map((value, key) => {
		if (value != "") {
			isFiltering = true;
		}
	});
	return isFiltering;
});

const clearFilters = () => {
	_filterData.value = {
		Search: "",
		purchaseId: "",
		userName: "",
		Title: "",
		StartDate: "",
		FinishDate: "",
	};
	tarihAraligi.value = [null, null];
	let date = Object.values(tarihAraligi.value);

	_filterData.value.StartDate = date[0] ? date[0] : "";
	_filterData.value.FinishDate = date[1] ? date[1] : "";
	emit("filter", _filterData.value);
};
defineExpose({
	clearFilters,
});

</script>
<style lang="scss">
.filterRow {
	margin-bottom: 20px;
}
</style>
