const routes = [
    {
        name: "AttendanceRequestListView",
        path: "/attendance-request",
        component: () => import("@/views/attendance/List.vue"),
    },
    {
        name: "AttendanceRequestFormView",
        path: "/attendance-request/new",
        component: () => import("@/views/attendance/Form.vue"),
    },
    {
        name: "AttendanceRequestDetailView",
        path: "/attendance-request/:id",
        props: true,
        component: () => import("@/views/attendance/Form.vue"),
    },
    {
        name: "AttendanceHistory",
        path: "/attendance-history",
        props: true,
        component: () => import("@/views/attendance/AttendanceHistory.vue"),
    },
]

export default routes
