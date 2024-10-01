const routes = [
	{
		name: "SkipLoanInstallmentListView",
		path: "/skip-loan-installment",
		component: () => import("@/views/skip_loan_installment/List.vue"),
	},
	{
		name: "SkipLoanInstallmentFormView",
		path: "/skip-loan-installment/new",
		component: () => import("@/views/skip_loan_installment/Form.vue"),
	},
	{
		name: "SkipLoanInstallmentDetailView",
		path: "/skip-loan-installment/:id",
		props: true,
		component: () => import("@/views/skip_loan_installment/Form.vue"),
	},
]

export default routes
