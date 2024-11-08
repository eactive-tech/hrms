<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<FormView
				v-if="formFields.data"
				doctype="Attendance Request"
				v-model="attendanceRequest"
				:isSubmittable="true"
				:fields="formFields.data"
				:id="props.id"
				@validateForm="validateForm"
			/>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { IonPage, IonContent } from "@ionic/vue"
import { createResource } from "frappe-ui"
import { ref, watch, inject, computed } from "vue"

import FormView from "@/components/FormView.vue"

import { getCompanyCurrency } from "@/data/currencies"

const employee = inject("$employee")

const props = defineProps({
	id: {
		type: String,
		required: false,
	},
})

// console.log(employee)
// object to store form data
const attendanceRequest = ref({
	employee: employee.data.name,
	employee_name: employee.data.employee_name,
	company: employee.data.company,
	department: employee.data.department,
})



// const companyCurrency = computed(() =>
// 	getCompanyCurrency(attendanceRequest.value.company)
// )

// get form fields
const formFields = createResource({
	url: "hrms.api.get_doctype_fields",
	params: { doctype: "Attendance Request" },
	transform(data) {
		const fields = getFilteredFields(data)
		return fields
		// return applyFilters(fields)
	},
	onSuccess(_) {
		// employeeCurrency.reload()
		// advanceAccount.reload()
	},
})
formFields.reload()

// const employeeCurrency = createResource({
// 	url: "hrms.payroll.doctype.salary_structure_assignment.salary_structure_assignment.get_employee_currency",
// 	params: { employee: employee.data.name },
// 	onSuccess(data) {
// 		attendanceRequest.value.currency = data
// 		setExchangeRate()
// 	},
// })

// const exchangeRate = createResource({
// 	url: "erpnext.setup.utils.get_exchange_rate",
// 	onSuccess(data) {
// 		attendanceRequest.value.exchange_rate = data
// 	},
// })

// const advanceAccount = createResource({
// 	url: "hrms.api.get_advance_account",
// 	params: { company: attendanceRequest.value.company },
// 	onSuccess(data) {
// 		attendanceRequest.value.advance_account = data
// 	},
// })

// form scripts
// watch(
// 	() => attendanceRequest.value.currency,
// 	() => setExchangeRate()
// )

watch(
	() => attendanceRequest.value.from_date,
	(from_date) => {
		if (!attendanceRequest.value.to_date) {
			attendanceRequest.value.to_date = from_date
		}
	}
)

// helper functions
function getFilteredFields(fields) {
	// reduce noise from the form view by excluding unnecessary fields
	// eg: employee and other details can be fetched from the session user
	const excludeFields = ["naming_series"]
	const extraFields = []

	if (!props.id) excludeFields.push(...extraFields)

	return fields.filter((field) => !excludeFields.includes(field.fieldname))
}

// function applyFilters(fields) {
// 	return fields.map((field) => {
// 		if (field.fieldname === "advance_account") {
// 			let currencies = [attendanceRequest.value.currency]
// 			if (attendanceRequest.value.currency != companyCurrency.value)
// 				currencies.push(companyCurrency.value)

// 			field.linkFilters = {
// 				company: attendanceRequest.value.company,
// 				is_group: 0,
// 				root_type: "Asset",
// 				account_currency: ("in", currencies),
// 			}
// 		}

// 		return field
// 	})
// }

// function setExchangeRate() {
// 	if (!attendanceRequest.value.currency) return
// 	const exchange_rate_field = formFields.data?.find(
// 		(field) => field.fieldname === "exchange_rate"
// 	)

// 	if (attendanceRequest.value.currency === companyCurrency.value) {
// 		attendanceRequest.value.exchange_rate = 1
// 		exchange_rate_field.hidden = 1
// 	} else {
// 		exchangeRate.fetch({
// 			from_currency: attendanceRequest.value.currency,
// 			to_currency: companyCurrency.value,
// 		})
// 		exchange_rate_field.hidden = 0
// 	}
// }

function validateForm() {}
</script>
