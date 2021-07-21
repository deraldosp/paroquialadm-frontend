<template>
  <div class="container-login">
    <div class="login">
      <ValidationObserver ref="observerLogin">
        <form @onSubmit="login">

          <div class="p-3">

            <div class="w-100 d-flex justify-content-center alig-items-center">
              <div style="width: 200px">
                <img class="img-fluid" src="/static/assets/images/brasao-arquidiocese-extended.png" alt="">
              </div>
            </div>
            
            <div class="d-flex w-100 justify-content-center align-items-center " style="height: 120px">
              <div class="h2">
                {{ $t('WELCOME') }}
              </div>
            </div>

            <div class="w-100">
              <div class="dflex w-100 justify-content-center align-items-center">
                  <ValidationProvider name="Email" rules="email|required" v-slot="{ errors }">
                    <b-input-group>
                      <template #prepend>
                        <div class="text-muted d-flex justify-content-center align-items-center mr-1">
                          <span class="material-icons-outlined">alternate_email</span>
                        </div>
                      </template>
                        <b-form-input v-model="loginData.email" placeholder="email"></b-form-input>
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </ValidationProvider>
              </div>

              <div class="dflex w-100 justify-content-center align-items-center mt-3">
                <ValidationProvider name="Password" rules="required" v-slot="{ errors }">
                  <b-input-group>
                    <template #prepend>
                      <div class="text-muted d-flex justify-content-center align-items-center mr-1">
                        <span class="material-icons-outlined">lock</span>
                      </div>
                    </template>
                    <b-form-input @keypress.enter="login()" type="password" v-model="loginData.password" placeholder="password"></b-form-input>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
            </div>

            <div class="d-flex mt-5 justify-content-center align-items-center">
              <b-button variant="primary" class="w-100" @click="login()">
                {{ $t('ENTER')}}
              </b-button>
            </div>

            <div class="d-flex justify-content-center align-items-end mt-auto" style="height: 200px">
              <Localization></Localization>
            </div>

          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
  import AuthService from '../services/auth.service'
  import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue"
  import Localization from 'components/Localization/Localization.vue'                                        

  export default {
    
    components: {
      LottieAnimation,
      Localization
    },

    data() {
      return {
        loginData: {
          email: null,
          password: null
        }
      }
    },

    computed: {
      currentDeviceDisplay() {
        return this.$store.state.currentDeviceDisplay
      }
    },

    methods: {
      async login() {

        await AuthService.login(this.loginData.email, this.loginData.password).then(res => {
          
          this.$store.dispatch('login', res).then(() => {
            this.$router.push({ name: 'HOME' })
          })
        })
        .catch(err => {
          this.$notify({
            msg: 'Acesso negado!<br>verifique os dados digitados',
            type: 'danger'
          })
        })

      }
    }
  }
</script>

<style lang="scss" scoped>
  .container-login {
    width: 100vw;
    height: 100vh;
    background-color: #ebebeb;
  }
  .login {
    top: calc((100vh / 2) - 300px);
    left: calc(100vw / 2 - 200px);
    position: absolute;
    width: 400px;
    min-height: 600px;
    background-color: #fff;
    border-radius: 12px;
    border: solid 1px #d8d8d8;
    box-shadow: 1px 2px 14px 2px rgba(151,151,151,0.31);
-webkit-box-shadow: 1px 2px 14px 2px rgba(151,151,151,0.31);
-moz-box-shadow: 1px 2px 14px 2px rgba(151,151,151,0.31);
  }
</style>