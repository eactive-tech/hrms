<template>
	<BaseLayout>
		<template #body>
			<div class="flex flex-col items-center my-7 p-4 gap-7">
				<CheckInPanel />
				<div v-if="salary_details.data.length > 0" class="flex flex-row justify-center gap-4 overflow-x-auto py-1 ">
					<div v-for="item in salary_details.data" class="flex flex-col bg-white border-none rounded-lg drop-shadow-md gap-2 p-4 items-start first:ml-4" >
						<div class="text-gray-800 font-bold text-base">
							{{item.month}}
						</div>
						<div class="text-gray-800 font-bold text-base">
							<span class="text-h4">{{item.payment_days}}</span> ({{item.total_working_days}})
						</div>
						<div class="text-gray-600 font-normal text-sm w-24 leading-4">
							Days Paid
						</div>
					</div>
				</div>
				<EmptyState message="You have no Salary Slip" v-else/>
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
	{
		icon: markRaw(ExpenseIcon),
		title: "Claim an Expense",
		route: "ExpenseClaimFormView",
	},
	{
		icon: markRaw(EmployeeAdvanceIcon),
		title: "Request an Advance",
		route: "EmployeeAdvanceFormView",
	},
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
