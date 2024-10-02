<template>
	<BaseLayout>
		<template #body>
			<div class="flex flex-col items-center my-7 p-4 gap-7">
				<CheckInPanel />
				<div v-if="salary_details.data.length > 0" class="flex flex-row justify-center gap-4 py-1 w-full">
					<div v-for="item in salary_details.data" class="flex flex-col bg-white border-none rounded-lg drop-shadow-md gap-2 p-4 w-full" >
						<div class="text-gray-800 font-bold text-base text-center">
							{{item.month}}
						</div>
						<div class="text-gray-800 font-bold text-base text-center">
							<p class="text-2xl font-bold">{{item.payment_days}}<span class="text-sm"> ({{item.total_working_days}})</span></p>
						</div>
						<div class="text-gray-600 font-normal text-sm leading-4 text-center">Days Paid</div>
					</div>

					<div v-for="i in (3 - salary_details.data.length)" class="flex flex-col bg-gray-50 border-none rounded-lg drop-shadow-sm gap-2 p-4 w-full" >
						<div class="text-gray-800 font-bold text-base text-center">&nbsp;</div>
						<div class="text-gray-800 font-bold text-base"><p class="text-4xl"><span class="text-sm"></span></p></div>
						<div class="text-gray-600 font-normal text-sm leading-4 text-center"></div>
					</div>
				</div>
				<QuickLinks :items="quickLinks" title="Quick Links" />
				<RequestPanel />
			</div>
		</template>
	</BaseLayout>
</template>

<script setup>
import { markRaw, inject, reactive } from "vue"

import CheckInPanel from "@/components/CheckInPanel.vue"
import QuickLinks from "@/components/QuickLinks.vue"
import BaseLayout from "@/components/BaseLayout.vue"
import RequestPanel from "@/components/RequestPanel.vue"
import LeaveIcon from "@/components/icons/LeaveIcon.vue"
import ExpenseIcon from "@/components/icons/ExpenseIcon.vue"
import EmployeeAdvanceIcon from "@/components/icons/EmployeeAdvanceIcon.vue"
import SalaryIcon from "@/components/icons/SalaryIcon.vue"

import { createResource } from "frappe-ui";

const quickLinks = [
	{
		icon: markRaw(LeaveIcon),
		title: "Request Leave",
		route: "LeaveApplicationFormView",
	},
	// {
	// 	icon: markRaw(ExpenseIcon),
	// 	title: "Claim an Expense",
	// 	route: "ExpenseClaimFormView",
	// },
	{
		icon: markRaw(SalaryIcon),
		title: "View Salary Slips",
		route: "SalarySlipsDashboard",
	},
	{
		icon: markRaw(LeaveIcon),
		title: "Attendance Request",
		route: "AttendanceRequestFormView",
	},
	{
		icon: markRaw(LeaveIcon),
		title: "View Attendance Request",
		route: "AttendanceRequestListView",
	},
	{
		icon: markRaw(EmployeeAdvanceIcon),
		title: "Request an Advance",
		route: "EmployeeAdvanceFormView",
	},
	{
		icon: markRaw(ExpenseIcon),
		title: "Skip Loan Installment",
		route: "SkipLoanInstallmentListView"
	},
]

const employee = inject("$employee")
const filters = reactive({ employee: employee.data.name})

const salary_details = createResource({
	url: "pwa_get_salary_details",
	method: "GET",
	auto: true,
	params: filters,
	onSuccess() {
		console.log(salary_details)
	},
})

console.log(salary_details.data)

</script>
