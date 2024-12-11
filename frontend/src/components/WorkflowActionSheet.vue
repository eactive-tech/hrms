<template>
	<div
		v-if="actions.length > 0"
		:class="[
			props.view === 'form'
				? 'px-4 pt-4 mt-2 sm:w-96 bg-white sticky bottom-0 w-full drop-shadow-xl z-40 border-t rounded-t-lg pb-10'
				: 'flex w-full flex-row items-center justify-between gap-3 sticky bottom-0 border-t z-[100] p-4',
		]"
	>
		<Button
			v-if="props.view === 'form' || actions.length > 2"
			@click="showTransitions()"
			class="w-full rounded mt-2 py-5 text-base disabled:bg-gray-700 disabled:text-white"
			variant="solid"
		>
			<template #prefix>
				<FeatherIcon name="chevron-up" class="w-4" />
			</template>
			Actions
		</Button>

		<template v-else>
			<Button
				v-for="action in actions"
				class="w-full py-5"
				:variant="action.variant"
				:theme="action.theme"
				@click="applyWorkflow({ workflowAction: action.text })"
			>
				<template #prefix v-if="action.featherIcon">
					<FeatherIcon :name="action.featherIcon" class="w-4" />
				</template>
				{{ action.text }}
			</Button>
		</template>
	</div>

	<ion-action-sheet
		:buttons="actions"
		:is-open="showActionSheet"
		@didDismiss="applyWorkflow({ event: $event })"
	>
	</ion-action-sheet>

	<Dialog v-model="show_reject_reason_dialog">
		<template #body-title>
			<h3>Reason for Rejection</h3>
		</template>
		<template #body-content>
			<Autocomplete
				:options="reject_reason_list.data"
				v-model="custom_reason_for_rejection"
				placeholder="Select reason"
			/>
		</template>
		<template #actions>
			<Button variant="solid" @click="apply_reject_workflow"> 
			Reject
			</Button>
			<Button
			class="ml-2"
			@click="show_reject_reason_dialog = false"
			>
			Close
			</Button>
		</template>
	</Dialog>
</template>

<script setup>
import { IonActionSheet, modalController } from "@ionic/vue"
import { computed, ref, onMounted } from "vue"
import { FeatherIcon, Dialog, Autocomplete, createResource } from "frappe-ui"

const props = defineProps({
	doc: {
		type: Object,
		required: true,
	},
	workflow: {
		type: Object,
		required: false,
	},
	view: {
		type: String,
		default: "form",
		validator: (value) => ["form", "actionSheet"].includes(value),
	},
})

const emit = defineEmits(["workflow-applied"])

let showActionSheet = ref(false)
let actions = ref([])

let show_reject_reason_dialog = ref(false)
let custom_reason_for_rejection = ref('')
// let reject_reason_list = ref([])

const getTransitions = async () => {
	const transitions = await props.workflow.getTransitions(props.doc)
	actions.value = transitions.map((transition) => {
		let role = ""
		let theme = "gray"
		let variant = "subtle"
		let icon = ""
		let actionLabel = transition.toLowerCase()

		if (actionLabel.includes("reject") || actionLabel.includes("cancel")) {
			role = "destructive"
			theme = "red"
			variant = "subtle"
			icon = "x"
		} else if (actionLabel.includes("approve")) {
			theme = "green"
			variant = "solid"
			icon = "check"
		}

		return {
			text: transition,
			role: role,
			theme: theme,
			variant: variant,
			featherIcon: icon,
			data: {
				action: transition,
			},
		}
	})
}

const showTransitions = () => {
	if (actions.value?.length > 0) {
		// always add last action for dismissing the modal
		actions.value.push({
			text: "Dismiss",
			role: "cancel",
		})
	}

	showActionSheet.value = true
}

const applyWorkflow = async ({ event = "", workflowAction = "" }) => {
	const action = workflowAction || event.detail.data?.action
	if (action) {
		if (action == 'Reject'){

			show_reject_reason_dialog.value = true
			props.doc.custom_reason_for_rejection = custom_reason_for_rejection._rawValue.value || ""
			// console.log('props.doc', props.doc)
			// console.log('custom_reason_for_rejection', custom_reason_for_rejection)

			// await props.workflow.applyWorkflow(props.doc, action)
			// modalController.dismiss()
			// emit("workflow-applied")
		} else {
			
			await props.workflow.applyWorkflow(props.doc, action)
			modalController.dismiss()
			emit("workflow-applied")
		}
	}

	showActionSheet.value = false
}

function apply_reject_workflow() {
	props.doc.custom_reason_for_rejection = custom_reason_for_rejection._rawValue.value || ""
	
	const update_reject_reason = createResource({
		url: "hrms.api.update_reject_reason",
		params: {
			doc: props.doc
		},
		onSuccess(data) {
			props.workflow.applyWorkflow(props.doc, 'Reject')
			modalController.dismiss()
			emit("workflow-applied")

		},
	}).fetch()


}

const reject_reason_list = createResource({
	url: "hrms.api.get_reject_reason_list",
	params: {
		doctype: props.doc.doctype,
	},
	auto: true
})



onMounted(() => getTransitions())
</script>

<style scoped>
ion-action-sheet {
	--button-color: var(--text-gray-500);
}
</style>
