import { createResource } from "frappe-ui"
import { employeeResource } from "./employee"

import dayjs from "@/utils/dayjs"

// const transformLeaveData = (data) => {
// 	return data.map((leave) => {
// 		leave.leave_dates = getAttendanceDates(leave)
// 		leave.doctype = "Leave Application"
// 		return leave
// 	})
// }

export const getAttendanceDates = (attendance) => {
	if (attendance.from_date == attendance.to_date)
		return dayjs(attendance.from_date).format("D MMM")
	else
		return `${dayjs(attendance.from_date).format("D MMM")} - ${dayjs(
			attendance.to_date
		).format("D MMM")}`
}

// export const myLeaves = createResource({
// 	url: "hrms.api.get_leave_applications",
// 	params: {
// 		employee: employeeResource.data.name,
// 		limit: 5,
// 	},
// 	auto: true,
// 	cache: "hrms:my_leaves",
// 	transform(data) {
// 		return transformLeaveData(data)
// 	},
// 	onSuccess() {
// 		leaveBalance.reload()
// 	},
// })

// export const teamLeaves = createResource({
// 	url: "hrms.api.get_leave_applications",
// 	params: {
// 		employee: employeeResource.data.name,
// 		approver_id: employeeResource.data.user_id,
// 		for_approval: 1,
// 		limit: 5,
// 	},
// 	auto: true,
// 	cache: "hrms:team_leaves",
// 	transform(data) {
// 		return transformLeaveData(data)
// 	},
// })

// export const leaveBalance = createResource({
// 	url: "hrms.api.get_leave_balance_map",
// 	params: {
// 		employee: employeeResource.data.name,
// 	},
// 	auto: true,
// 	cache: "hrms:leave_balance",
// 	transform: (data) => {
// 		// Calculate balance percentage for each leave type
// 		return Object.fromEntries(
// 			Object.entries(data).map(([leave_type, allocation]) => {
// 				allocation.balance_percentage =
// 					(allocation.balance_leaves / allocation.allocated_leaves) * 100
// 				return [leave_type, allocation]
// 			})
// 		)
// 	},
// })
