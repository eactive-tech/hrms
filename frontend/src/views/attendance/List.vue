<template>
	<ion-page>
		<ListView
			doctype="Attendance Request"
			pageTitle="Attendance Requests"
			:tabButtons="TAB_BUTTONS"
			:fields="ATTENDANCE_REQUEST_FIELDS"
			:filterConfig="FILTER_CONFIG"
		/>
	</ion-page>
</template>

<script setup>
import { IonPage } from "@ionic/vue"
import ListView from "@/components/ListView.vue"

const TAB_BUTTONS = ["My Attendance", "Team Attendance"]
const ATTENDANCE_REQUEST_FIELDS = [
	"name",
	"employee",
	"employee_name",
	"status",
	"shift",
	"reason",
	"from_date",
	"to_date",
	"custom_from_time",
	"custom_to_time"
]

// const STATUS_FILTER_OPTIONS = [
// 	"Draft",
// 	"Submitted",
// 	"Cancelled",
// ]

const STATUS_FILTER_OPTIONS = ["Open", "Approved", "Rejected"]
const FILTER_CONFIG = [
	{
		fieldname: "status",
		fieldtype: "Select",
		label: "Status",
		options: STATUS_FILTER_OPTIONS,
	},
	{ 
		fieldname: "posting_date", 
		fieldtype: "Date", 
		label: "Posting Date" },
]
</script>
