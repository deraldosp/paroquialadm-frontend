<template>
  <div>
    <div class="login-container d-flex justify-content-center align-items-center">
      <div class="row p-5 login-content shadow d-flex">
        <div class="col-lg-8 col-sm-4 col-md-4 login-left d-flex align-items-center">
           
          <lottie-animation
              v-show="currentDeviceDisplay !== 'smartphone'"
              path="../../static/assets/lotties/login.json"
              :width="400"
              :height="400"
          />
                 
        </div>
        <div class="col-lg-4 col-sm-7 col-md-7 login-form h-100 bg-white">
          <form action="">

            <div class="row">
              <div class="col-12 my-5 text-center">
                <h3>
                  {{ $t('WELCOME')}}
                </h3>   
              </div>
              <div class="col-12 m-2 pr-5">
                <b-input-group>
                  <template #prepend>
                    <div class="text-muted d-flex justify-content-center align-items-center mr-1">
                      <span class="material-icons-outlined">alternate_email</span>
                    </div>
                  </template>
                  <b-form-input v-model="loginData.email" placeholder="email"></b-form-input>
                </b-input-group>
              </div>
              <div class="col-12 m-2 pr-5">
                <b-input-group>
                  <template #prepend>
                    <div class="text-muted d-flex justify-content-center align-items-center mr-1">
                      <span class="material-icons-outlined">lock</span>
                    </div>
                  </template>
                  <b-form-input type="password" v-model="loginData.password" placeholder="password"></b-form-input>
                </b-input-group>
              </div>
              <div class="col-12 m-2 text-center">
                <b-button @click="login()">
                  Entrar
                </b-button>
              </div>
            </div>


          </form>
        </div>
      </div>
    </div>
  </div>

</template>
<style lang="scss" scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  background: rgb(255,176,63);
  background: linear-gradient(217deg, rgba(255,176,63,1) 38%, rgba(255,153,8,1) 66%, rgba(255,118,5,1) 70%, rgba(255,129,25,1) 82%);
}

.login-content {
  background-color: #ffb03f;
  height: 80vh;
  width: 90vw;
}

.lottie {
  position: relative;
  bottom: 0;
}
</style>