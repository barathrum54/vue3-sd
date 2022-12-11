<template>
	<MailDetailsWrapper>
		<sdCards>
			<template #button>
				<MailRightAction>
					<!-- <span>1 - 50 of 235</span> -->
				</MailRightAction>
			</template>
			<template #title>
				<MessageAction>
					<router-link @click="() => back()" to="#">
						<sdFeatherIcons type="arrow-left" size="14"/>
					</router-link>
					<a-tooltip placement="bottom" title="Arşiv">
						<router-link to="#">
							<sdFeatherIcons type="archive" size="18"/>
						</router-link>
					</a-tooltip>
					<a-tooltip placement="bottom" title="Silinmiş">
						<router-link to="#">
							<sdFeatherIcons type="trash" size="18"/>
						</router-link>
					</a-tooltip>
				</MessageAction>
			</template>
			<a-row v-if="PreInfoContent != ''">
				<a-col :xl="24">
					<PreInfo :textContent='PreInfoContent'/>
				</a-col>
			</a-row>
			<a-row :gutter="15">
				<a-col :xl="24">
					<MessageDetails>
						<div class="">
							<div class="message-subject">
								<sdHeading as="h2">
									{{ detailData.Title }}
								</sdHeading>
							</div>
						</div>
						<div class="message-box">
							<div class="message-author">
								<img
									:style="{ width: '50px', borderRadius: '50%' }"
									:src="detailData.Image"
									alt=""
								/>
								<div>
									<sdHeading as="h4">{{ detailData.Name }}</sdHeading>
									<span style="color: #868EAE;">{{ detailData.Datetime }}</span>
								</div>
							</div>
						</div>
						<div class="message-body">
							<div v-html="detailData.Message"></div>
						</div>
						<hr v-if="extraHrTypes.includes(detailType)"/>
					</MessageDetails>
				</a-col>
			</a-row>
			<a-row
				style="padding-left: 89.5px !important; width: 100%"
				justify="center"
				:gutter="15"
			>
				<a-col
					style="
            width: 100%;
            padding-inline: 50px;
            display: flex;
            justify-content: center;
          "
				>
					<IslemTamam v-if="detailType == 'IslemTamam'"></IslemTamam>
					<AliciOnay v-if="detailType == 'AliciOnay'"></AliciOnay>
					<AliciRed v-if="detailType == 'AliciRed'"></AliciRed>
					<TeslimatTamam v-if="detailType == 'TeslimatTamam'"></TeslimatTamam>
					<Satici v-if="detailType == 'Satici'"></Satici>
					<OtomatikAlici v-if="detailType == 'OtomatikAlici'"></OtomatikAlici>
					<SaticiDegerlendirme v-if="detailType == 'SaticiDegerlendirme'"></SaticiDegerlendirme>
				</a-col>
			</a-row>
		</sdCards>
	</MailDetailsWrapper>
</template>
<script setup>
import {computed, onMounted, provide, ref} from "vue";
import {useStore} from "vuex";

import {MailDetailsWrapper, MailRightAction, MessageAction, MessageDetails,} from "./style";
// const MailComposer = lazy(() => import('./MailComposer'));
import {useRoute, useRouter} from "vue-router";
import {getNotificationDetail} from "@/services/notifications/shopsNotifications.service";
import IslemTamam from "./IslemTamam";
import AliciOnay from "./AliciOnay.vue";
import AliciRed from "./AliciRed.vue";
import TeslimatTamam from "./TeslimatTamam.vue";
import OtomatikAlici from "./OtomatikAlici.vue";
import Satici from "./Satici.vue";
import SaticiDegerlendirme from "./SaticiDegerlendirme.vue";
import PreInfo from "./PreInfo.vue";

const {state, dispatch} = useStore();
const detailData = ref({});
const {back} = useRouter();
const {params, matched} = useRoute();
const email = computed(() => state.email.data[0]);
const replyMessage = ref(0);
const detailType = ref("");
const isLoading = ref(true);
const baseUrlToOpen = ref("https://itemsatis.com");
const getDetail = async (Id = route.params.id) => {
	const response = await getNotificationDetail({Id});

	console.log(response);
	setType(response.data.detail.Type);
	detailData.value = response.data.detail;
	isLoading.value = false;
};
const setType = (type) => {
	detailType.value = type;
	setPreInfoContent(type);
};

let extraHrTypes = ["IslemTamam","AliciOnay","AliciRed","TeslimatTamam","Satici","OtomatikAlici","SaticiDegerlendirme"];

const PreInfoContent = ref('');

onMounted(() => {
	dispatch("filterSinglePage", parseInt(params.id));
	getDetail();
});

const route = useRoute();

const replyMail = (message) => {
	replyMessage.value = message;
	console.log(message);
};

const onStaredChange = (id) => {
	dispatch("onStarUpdate", id);
};
const openWindow = (path) => {
	window.open(baseUrlToOpen.value + path);
};
const setPreInfoContent = (type) => {
	switch (type) {
		case 'Satici':
			PreInfoContent.value = 'En kötü durumda bile zarara uğramamanız için lütfen, teslimatı yaparken video kaydetmeyi unutmayın.<br>Müşteri teslim almadığını iddaa ettiğinde ilk işlem olarak sizden teslimat videosunu isteyeceğiz.';

			break;
		case 'AliciOnay':
			PreInfoContent.value = 'Satıcının onayından sonra 24 saat içerisinde, teslim aldığınıza dair işlem yapmazsanız sistem otomatik olarak teslim aldığınızı varsayacaktır.'
			break;
		default:
			break;
	}
}
provide("openWindow", openWindow);
provide("detailData", detailData);
</script>
<style>
.postStockCode {
	background: grey !important;
	width: fit-content;
	padding: 10px;
	color: white;
	border-radius: 5px;
	margin-top: 5px;
}

.message-body {
	margin-top: 15px !important;
	padding-left: 70px !important;
}
</style>
