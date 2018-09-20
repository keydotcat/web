import toast from 'izitoast'
import i18n from '@/i18n'

const toastSvc = {
  error: (key, title = 'Error') => {
    return toast.error({
      title: title,
      message: i18n.t(key),
      position: 'bottomRight'
    })
  },
  success: (key, title = 'Success') => {
    return toast.success({
      title: title,
      message: i18n.t(key),
      position: 'bottomRight'
    })
  }
}

export default toastSvc
