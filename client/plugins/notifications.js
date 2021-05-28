import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import VueNativeNotification from 'vue-native-notification'
import notificationToast from './notification.vue'

const notifications = {
  install (Vue, options) {

    Vue.use(Toast, {
      transition: 'Vue-Toastification__fade',
      maxToasts: 20,
      newestOnTop: false,
      pauseOnFocusLoss: false
    })

    Vue.use(VueNativeNotification, {
      requestOnNotify: true
    })

    Vue.prototype.$notify = function (options, browserPusher=false) {
      
      var notification, message, position
      var timeout = 3000
      var type = ''
      var channel = 'toast'

      if (options) {
        if (undefined !== options.msg && options.msg !== '') {
          message = options.msg
        }

        if (undefined !== options.type && options.type !== '') {
          type = options.type
        }

        if (undefined !== options.timeout && options.timeout !== '') {
          timeout = options.timeout
        }

        if (undefined !== options.channel && options.channel === 'browser') {
          channel = options.channel
        }
      }

      switch (type) {
        case 'error':
          notification = this.$toast.error
          break;
        case 'danger':
          notification = this.$toast.error
          break;
        case 'success':
          notification = this.$toast.success
          break;
        case 'info':
          notification = this.$toast.info
          break;
        case 'warn':
          notification = this.$toast.warning
          break;
        case 'warning':
          notification = this.$toast.warning
          break;
        default:
          notification = this.$toast
          break;
      }

      if (channel === 'browser') {
        this.$notification.show(type, 
          {
            body: message,
            icon: 'https://s3-sa-east-1.amazonaws.com/docsystem-internal-bucket/domains/interfy/minilogo.png'
          },
          {}
        )
      } else {

        console.log(document.visibilityState)
        if (document.visibilityState === 'visible') {

          var content = {
            component: notificationToast,
            props: {
              msg: message
            }
          }


          notification(content, {
            options: { type: 'success' },
            position: 'top-right',
            timeout: timeout,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            hideCloseButton: false,
            hideProgressBar: false,
            icon: true
          })
        } else {
          if (browserPusher) {
            this.$notification.show(type, 
              {
                body: message,
                // icon: ''
              },
              {}
            )
          }
        }
      }
    }
  }
}

export default notifications
