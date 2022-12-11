<template>
	<sdCards headless>
		<div class="note-sidebar-bottom">
			<NoteNav>
				<div class="nav-labels">
					<ul>
						<div v-for="(menu,index) in menuListNames" :key="index">
							<li :style="selectItemColor(menu.key,selectColor[index])">
								<a class="display-flex justify-content-between" @click="selectItem(menu.key)">
									<div class="d-flex">
										<Bullet :style="{backgroundColor:selectColor[index]}">
										</Bullet>
										<Bullet style="transform: translateY(-5px);"> {{ t(`faq.faqList.${menu.key}`) }}</Bullet>
									</div>
									<div>
										<a-badge v-if="menu.count>0" :count=menu.count show-zero :number-style="{
                        color: 'white',backgroundColor:selectColor[index], }"/>
										<a-badge v-else count="0" show-zero/>

									</div>
								</a>
							</li>
						</div>

					</ul>
				</div>
			</NoteNav>
		</div>
	</sdCards>
</template>

<script setup>
import {inject, ref} from "vue";
import {Bullet, NoteNav} from "./style";
import {useI18n} from "vue-i18n";

const {t, d} = useI18n({useScope: "global"});
const searchingHelp = inject('searchingHelp')
const searchHelpDetailKey = inject('searchHelpDetailKey')
const selectedItem = inject('selectedItem')
const selectColor = ref(["#2C99FF", "#FA8B0C", "#20C997", "#FF69A5", "#5F63F2", "#8C99FF", "#2C99FF", "#FA8B0C", "#20C997", "#FF69A5", "#5F63F2", "#8C99FF"])
const props = defineProps({
	menuListNames: {
		type: Array,
		required: true
	},
})

const selectItem = (key) => {
	selectedItem.value = key;
}

const selectItemColor = (key, bordercolor) => {
	if (selectedItem.value == key) {
		return `border-left:2px solid ${bordercolor} !important;`
	}
}

</script>
<style lang="scss" scoped>
.search {
	padding: 12px !important;
	width: 100%;
	border-radius: 16px;
	border: none;
	background-color: #F8F9FB;
}

.note-sidebar-bottom {
	padding: 0 !important;
	padding-bottom: 30px !important;
}

.ant-card-body {
	padding: 25px !important;
}
</style>