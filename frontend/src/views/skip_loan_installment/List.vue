<template>
	<ion-page>
		<ListView
			doctype="Skip Loan Installment"
			pageTitle="Skip Loan Installments"
			:tabButtons="TAB_BUTTONS"
			:fields="SKIP_LOAN_FIELDS"
			:filterConfig="FILTER_CONFIG"
		/>
	</ion-page>
</template>

<script setup>
import { IonPage } from "@ionic/vue"
import ListView from "@/components/ListView.vue"

const TAB_BUTTONS = ["Skip Loan's", "Team Loan's"]
const SKIP_LOAN_FIELDS = [
	"name",
	"employee",
	"employee_name",
	"status",
	"active_loans",
	"loan_installment",
	"sanctioned_amount",
	"due_amount",
	"posting_date"
]

const STATUS_FILTER_OPTIONS = ["Open", "Pending at HOD", "Pending at HR", "Rejected by HOD", "Rejected by HR", "Cancelled"]
const FILTER_CONFIG = [
	{
		fieldname: "status",
		fieldtype: "Select",
		label: "Status",
		options: STATUS_FILTER_OPTIONS,
	},
	{ fieldname: "posting_date", fieldtype: "Date", label: "Posting Date" },
]
</script>
