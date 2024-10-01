<template>
	<ion-page>
		<ion-content class="ion-padding">
			<div class="flex h-screen w-screen flex-col justify-center bg-white">
				<div class="flex flex-col mx-auto gap-3 items-center">
					<ion-img class="h-8 w-8" src="https://nghrms.realgroup.org/files/clear%20logo.png"
						alt="Real Group Logo"></ion-img>
					<!-- <FrappeHRLogo class="h-8 w-8" /> -->
					<div class="text-3xl font-semibold text-gray-900 text-center">
						Login to REAL Group HRMS
					</div>
				</div>

				<div class="mx-auto mt-10 w-full px-8 sm:w-96">
					<form class="flex flex-col space-y-4" @submit.prevent="submit">
						<Input placeholder="UID/Email" v-model="email" />
						<Input type="password" placeholder="••••••" v-model="password" />
						<ErrorMessage :message="session.login.error" />
						<Button :loading="session.login.loading" variant="solid"
							class="disabled:bg-gray-700 disabled:text-white !mt-6" style="background: #1f497d">
							Login
						</Button>
					</form>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonImg } from "@ionic/vue"
import { inject, ref } from "vue"
import { Input, Button, ErrorMessage } from "frappe-ui"

import FrappeHRLogo from "@/components/icons/FrappeHRLogo.vue"

const email = ref(null)
const password = ref(null)

const session = inject("$session")
function submit(e) {
	session.login.submit({
		email: email.value,
		password: password.value,
	})
}
</script>
