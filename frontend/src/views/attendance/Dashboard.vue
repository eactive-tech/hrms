<template>
	<BaseLayout pageTitle="Attendance">
		<template #body>
			<ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
				<ion-refresher-content></ion-refresher-content>
			</ion-refresher>
			<div class="flex flex-col gap-3 mt-5 px-4 w-full">
				<div class="flex flex-row justify-between items-center px-4">
					<div class="text-lg text-gray-800 font-bold">&nbsp;</div>
					<router-link :to="{ name: 'AttendanceHistory' }" v-slot="{ navigate }"
						v-if="attendance.data">
						<div @click="navigate"
							class="text-sm text-gray-800 font-semibold cursor-pointer underline underline-offset-2">
							View Attendance History
						</div>
					</router-link>
				</div>
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

				<div class="flex flex-col gap-7 mt-5 px-4 w-full">
					<router-link :to="{ name: 'AttendanceRequestFormView' }" v-slot="{ navigate }">
						<Button @click="navigate" variant="solid" class="py-5 text-base w-full">
							Request for Attendance
						</Button>
					</router-link>
				</div>
				<div class="flex flex-col gap-7 mt-5 px-4 w-full">
					<router-link :to="{ name: 'AttendanceRequestListView' }" v-slot="{ navigate }">
						<Button @click="navigate" variant="solid" class="py-5 text-base w-full">
							View Attendance Requests
						</Button>
					</router-link>
				</div>
			</div>
		</template>
	</BaseLayout>
</template>

<script setup>

import { markRaw, inject, reactive} from 'vue'
import GitCompareIcon from "@/components/icons/GitCompareIcon.vue";

import { createResource } from "frappe-ui";
import BaseLayout from "@/components/BaseLayout.vue"

import {
	IonRefresher,
	IonRefresherContent,
} from "@ionic/vue"
import { employees } from '../../data/employees';


const employee = inject("$employee")
const filters = reactive({ employee: employee.data.name, month: null })
// console.log(filters)
const git_compare_icon = markRaw(GitCompareIcon)

const attendance = createResource({
	url: "pwa_employee_attendance",
	method: "GET",
	auto: true,
	params: filters,
	onSuccess() {
	},
	transform(data) {
		let two_records = data.splice(0,2)
      	return two_records
	}
})

const handleRefresh = (event) => {
	setTimeout(() => {
		attendance.reload()
		event.target.complete()
	}, 500)
}


</script>
