<template>
	<Wrapper>
		<FaqWrapper>
			<sdCards :title="t(`faq.faqList.${selectedItem}`)">
				<a-collapse accordion expandIconPosition="right" :bordered="false">
					<template #expandIcon="props">
						<sdFeatherIcons
							:type="props.isActive ? 'minus' : 'plus'"
							size="14"
						/>
					</template>

					<a-collapse-panel
						v-for="(helpDetail, index) in helpDetails" accordion="false"
						:key="index"
						:header=helpDetail.Title
						:style="customStyle">
						<div class="helpDetailContent" v-html="helpDetail.Content"></div>
						<div class="helpDetailDidHelpContent">
							<div class="helpDetailDidHelpText"> Bu makale size yardımcı oldu mu?</div>
							<div class="helpDetailDidHelpButtons display-flex">
								<div>
									<button @click="voteContent(helpDetail.Id,'up')" id="smileButton">
										<sdFeatherIcons
											type="smile"
											size="16"
										/>
										<span> Evet </span>

									</button>
								</div>
								<div>
									<button @click="voteContent(helpDetail.Id,'down')" id="sadButton">
										<sdFeatherIcons
											type="frown"
											size="16"
										/>
										<span> Hayır</span>
									</button>
								</div>
							</div>
						</div>
						<br/>
					</a-collapse-panel>
				</a-collapse>
			</sdCards>
		</FaqWrapper>
	</Wrapper>
</template>

<script setup>
import {inject, onMounted} from "vue"
import {FaqWrapper, Wrapper} from "./style";
import {useI18n} from "vue-i18n";
import {setSupportVote} from "@/services/faq/faq.services"
import {message} from "ant-design-vue";

const {t, d} = useI18n({useScope: "global"});
const selectedItem = inject('selectedItem')
const customStyle = 'background: #f7f7f7;border-radius: 4px;margin-bottom: 12px;border: 0;overflow: hidden; ';
const props = defineProps({
	helpDetails: {
		type: Array,
		default: []
	},
})
const voteContent = async (id, vote) => {
	let voteLocal = localStorage.getItem('voteId')
	if (voteLocal && voteLocal.includes(id)) {
		message.error('Daha önce oylama yaptınız.')
	} else {
		const response = await setSupportVote(id, vote);
		if (response.data.success) {
			message.success(response.data.message)
			localStorage.setItem('voteId', [localStorage.getItem('voteId') || [], id])
		} else message.error(response.data.message)
	}
}

onMounted(() => {
})
</script>

<style lang="scss" scoped>
.isFaqCreate-container {
	display: flex;
	justify-content: center;
	align-items: center;
}

.isFaqCreate-img {
	margin-top: 10px;
}

.isFaqCreate-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 20px;
}

.helpDetailContent {
	img {
		max-width: 100% !important;
	}
}

.helpDetailDidHelpContent {
	margin-top: 2rem;

	.helpDetailDidHelpText {
		margin-block: 1rem;
	}

	.helpDetailDidHelpButtons {
		div {
			margin-right: 1rem;

			#smileButton {
				border: 2px solid #20C997;
				color: #20C997;

				span {
					margin-left: 5px
				}

				&:hover {
					background-color: #20C997;
					color: white
				}
			}

			#sadButton {
				border: 2px solid #FA8B0C;
				color: #FA8B0C;

				span {
					margin-left: 5px
				}

				&:hover {
					background-color: #FA8B0C;
					color: white
				}
			}

			button {
				padding: 5px 15px;
				border-radius: 5px;
				display: flex;
				align-items: center;
			}
		}
	}
}

.noContent {

}

.ant-card-body {
	padding: 25px !important;
}

.ant-collapse {
	margin-top: 0;
	margin-bottom: 25px;
}

.ant-collapse-item {
	margin-bottom: -1px !important;
}
</style>
