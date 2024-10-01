<template>
	<ion-page>
		<ion-header>
			<div class="w-full sm:w-96">
				<header
					class="flex flex-row bg-white shadow-sm py-4 px-3 items-center justify-between border-b sticky top-0 z-[1000]"
				>	
					<div class="flex flex-row items-center">
						<Button
							variant="ghost"
							class="!pl-0 hover:bg-white"
							@click="router.back()"
						>
							<FeatherIcon name="chevron-left" class="h-5 w-5" />
						</Button>
						<h2 class="text-xl font-semibold text-gray-900">Attendance History</h2>
					</div>
					<div class="flex flex-row gap-2">
						<Button
							id="show-filter-modal"
							icon="filter"
							variant="subtle"
							:class="[
								areFiltersApplied
									? '!border !border-gray-800 !bg-white !text-gray-900 !font-semibold'
									: '',
							]"
						/>
					</div>
				</header>
			</div>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
				<ion-refresher-content></ion-refresher-content>
			</ion-refresher>

			<div v-if="attendance.data.length > 0" class="flex flex-col gap-3 mt-5 px-4 w-full sm:w-96">
				<div class="flex flex-row gap-4 w-full bg-white border-none rounded-lg drop-shadow-md py-2"
					v-for="item in attendance.data">
					<div class="flex flex-col w-12 pl-3 items-center justify-center">
						<div class="flex shrink-0 w-12 h-12 rounded-full bg-gray-100 uppercase text-gray-600 font-medium text-md items-center justify-center"
							:style="{'color': item.status_color}">
							{{item.status}}
						</div>
					</div>
					<div class="flex flex-col pl-3 grow">
						<div class="flex flex-row">
							<div class="flex-col text-sm text-gray-800 pb-2">
								{{item.attendance_date}} | {{item.day}}
							</div>
						</div>
						<div class="flex flex-row">
							<div class="flex-col text-xs text-gray-500 pb-2">
								{{item.in}}
							</div>
						</div>
						<div class="flex flex-row">
							<div class="flex-col text-xs text-gray-500 pb-2"
								:style="[item.late_in == '00:00' ? {'color': '#8898aa'}:{'color': '#F58634'}]">
								{{ item.late_in }}
							</div>
						</div>
					</div>
					<div class="flex flex-col pl-3 grow">
						<div class="flex flex-row">
							<div class="flex-col text-sm text-gray-800 pb-2">
								<div class="flex flex-row">
									<div class="flex flex-col">
										{{item.shift}}
									</div>
									<div class="flex flex-col pl-2">
										<component v-if="item.has_variation=='Yes'" :is="git_compare_icon"
											class="h-4 w-4 text-gray-500" style="color:#F58634" />
									</div>
								</div>
							</div>
						</div>
						<div class="flex flex-row">
							<div class="flex-col text-xs text-gray-500 pb-2">
								{{ item.out }}
							</div>
						</div>
						<div class="flex flex-row">
							<div class="flex-col text-xs text-gray-500 pb-2"
								:style="[item.early_exit == '00:00' ? {'color': '#8898aa'}:{'color': '#F58634'}]">
								{{item.early_exit}}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-else class="flex flex-col gap-3 mt-5 px-4 w-full sm:w-96">
				<div class="text-center text-gray-500 py-4">
					No Records found for the selected month
				</div>
			</div>
			

			<CustomIonModal trigger="show-filter-modal">
				<!-- Filter Action Sheet -->
				<template #actionSheet>
					<ListFiltersActionSheet
						:filterConfig="filterConfig"
						@applyFilters="applyFilters"
						@clearFilters="clearFilters"
						v-model:filters="filterMap"
					/>
				</template>
			</CustomIonModal>
		</ion-content>
	</ion-page>

</template>

<script setup>

// import { markRaw} from 'vue'

import {inject, ref , markRaw, reactive, toRaw, watch} from "vue"



import GitCompareIcon from "@/components/icons/GitCompareIcon.vue";

import ListFiltersActionSheet from "@/components/ListFiltersActionSheet.vue";
import CustomIonModal from "@/components/CustomIonModal.vue";
import { 
	IonPage,
	IonContent,
	IonHeader,
	IonRefresher,
	IonRefresherContent,
	modalController
} from "@ionic/vue"

import { createResource, FeatherIcon } from "frappe-ui";
import { useRouter } from "vue-router"

const git_compare_icon = markRaw(GitCompareIcon)

const router = useRouter()
const employee = inject("$employee")
const filterMap = reactive({})
const areFiltersApplied = ref(false)
const appliedFilters = ref({})
const filters = reactive({ employee: employee.data.name, month: null })


// const month = ref("")


// console.log("One",appliedFilters.value)

// let filters = toRaw(appliedFilters)._rawValue
// console.log('aaaa', filters)

const attendance = createResource({
		url: "pwa_employee_attendance",
		method: 'GET',
		auto: true,
		params: filters,
		onSuccess() {
		},
	})
	
function get_all_emp() {
	if (appliedFilters.value){
		console.log("fsafds",appliedFilters.value)
		filters.month = appliedFilters.value.month || null
	}else{
		filters.month= null
	}

	attendance.reload()
}


const handleRefresh = (event) => {
	setTimeout(() => {
		attendance.reload()
		event.target.complete()
	}, 500)
}

const STATUS_FILTER_OPTIONS = ["Jan", "Feb", "Mar", "Apr","May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const filterConfig = [
	{
		fieldname: "status",
		fieldtype: "Select",
		label: "Month",
		options: STATUS_FILTER_OPTIONS,
	},
]

// helper functions
function initializeFilters() {
	filterConfig.forEach((filter) => {
		filterMap[filter.fieldname] = {
			condition: "=",
			value: null,
		}
	})
	appliedFilters.value = {}
}
initializeFilters()

function prepareFilters() {
	let value = ""
	appliedFilters.value = {}
	let filters = {employee: employee.data.name};
	for (const fieldname in filterMap) {
		value = filterMap[fieldname].value
		if (value){
			// filters[fieldname] = value;
			filters["month"] = value;
		}
	}
	appliedFilters.value.month = filters.month;
}

function applyFilters() {
	prepareFilters()
	modalController.dismiss()
	areFiltersApplied.value = appliedFilters.value.length ? true : false
	get_all_emp()
	attendance.reload()
}

function clearFilters() {
	initializeFilters()
	modalController.dismiss()
	areFiltersApplied.value = false
	get_all_emp()
	attendance.reload()
}

</script>
