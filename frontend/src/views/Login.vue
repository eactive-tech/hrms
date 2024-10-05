<template>
	<ion-page>
		<ion-content class="ion-padding">
			<div class="flex h-screen w-screen flex-col justify-center bg-white">
				<div class="flex flex-col mx-auto gap-3 items-center">
					<ion-img class="h-8 w-8" src="https://nghrms.realgroup.org/files/clear%20logo.png"
						alt="Real Group Logo"></ion-img>
					<!-- <FrappeHRLogo class="h-8 w-8" /> -->
					<div class="text-2xl font-semibold text-gray-900 text-center">
						REAL Group HRMS
					</div>
				</div>
				<div class="rounded-lg border-2 ml-4 mr-4 mt-2 pb-4">
					<div class="mx-auto mt-10 w-full px-4 sm:w-96">
						<form class="flex flex-col space-y-4" @submit.prevent="submit" v-if="is_login_with_link == false && is_reset_password == false">
							<Input placeholder="UID/Email" v-model="email" />
							<Input type="password" placeholder="••••••" v-model="password" />
							<ErrorMessage :message="session.login.error" />
							<div @click="set_reset_password" class="w-full text-right text-sm no-underline hover:underline" variant="ghost">Forgot Password ?</div>
							<Button :loading="session.login.loading" variant="solid"
								class="disabled:bg-gray-700 disabled:text-white !mt-6" style="background: #1f497d">
								Login
							</Button>
						</form>
						<div class="flex flex-col space-y-4" v-if="is_login_with_link == true && is_reset_password == false">
							<Input placeholder="UID" v-model="uid" />
							<ErrorMessage :message="session.login.error" />
							<Button @click="send_link" variant="solid"
								class="disabled:bg-gray-700 disabled:text-white !mt-6" style="background: #1f497d">
								Send Login Link
							</Button>
						</div>

						<Button v-if="is_reset_password == false" variant="solid" @click="set_login_with_link"
								class="text-gray-700 !mt-6 w-full" style="background: #f3f3f3; color: #525252">
								{{ login_with_link_button_title}}
						</Button>

						<div class="flex flex-col space-y-4" v-if="is_reset_password == true && is_login_with_link == false">
							<Input placeholder="UID" v-model="uid" />
							<ErrorMessage :message="session.login.error" />
							<Button @click="reset_password" variant="solid"
								class="disabled:bg-gray-700 disabled:text-white !mt-6" style="background: #1f497d;">
								Reset Password
							</Button>
							
						</div>


						<Button v-if="is_reset_password==true" @click="set_reset_password" variant="solid"
							class="text-gray-700 !mt-6 w-full" style="background: #f3f3f3; color: #525252">
								Back
						</Button>
						
					</div>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonImg } from "@ionic/vue"
import { inject, reactive, ref } from "vue"
import { Input, Button, ErrorMessage, createResource } from "frappe-ui"

import FrappeHRLogo from "@/components/icons/FrappeHRLogo.vue"

const email = ref(null)
const uid = ref('')
const password = ref(null)
const is_login_with_link = ref(false)
const login_with_link_button_title = ref('Login with Email Link')
const is_reset_password = ref(false)

function set_login_with_link() {
	is_login_with_link.value ? is_login_with_link.value = false : is_login_with_link.value = true
	is_login_with_link.value ? login_with_link_button_title.value = 'Back to Login' : 'Login with Email Link'
	session.login.error = ''
}
function set_reset_password() {
	is_reset_password.value ? is_reset_password.value = false : is_reset_password.value = true
	session.login.error = ''
}

const session = inject("$session")
function submit(e) {
	session.login.submit({
		email: email.value,
		password: password.value,
	})
}

const send_link = () => {
	if (!uid.value) {
		session.login.error = "UID is required"
		return;
	}

	createResource({
		url: "frappe.www.login.send_login_link",
		params: {
			email: uid.value
		},
		onSuccess(data) {
			session.login.error = 'Link Sent, Check Email'
		},
		onError(error) {
			session.login.error = error
		},

	}).fetch()
} 
const reset_password = () => {
	if (!uid.value) {
		session.login.error = "UID is required"
		return;
	}

	createResource({
		url: "frappe.core.doctype.user.user.reset_password",
		params: {
			user: uid.value
		},
		onSuccess(data) {
			session.login.error = 'Instruction Sent, Check Email'
		},
		onError(error) {
			session.login.error = error
		},

	}).fetch()
} 



</script>
