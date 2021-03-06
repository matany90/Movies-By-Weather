import Vue from "vue"
import iziToast from "izitoast"
import "izitoast/dist/css/iziToast.min.css"
import VueNotifications from "vue-notifications"

function toast({ title, message, type, timeout }) {
  if (type === VueNotifications.types.warn) type = "warning"
  return iziToast[type]({ title, message, timeout })
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

Vue.use(VueNotifications, options)
