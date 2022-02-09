<template>
    <BaseView>
      <template #header>
        <div class="px-3 w-100 h-100 d-flex align-items-center justify-content-between">
          <div class="d-flex">
            <i class="material-icons mr-2">settings</i><h5>{{ $t('Settings') }}</h5>
          </div>
          <!-- <div>
            <b-button @click="createDizimista()" variant="primary"><i class="fas fa-plus mr-2"></i>{{ $t('NEW')}}</b-button>
          </div> -->
        </div>
      </template>

      <b-container fluid>
        <div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><router-link :to="'/sistema/dbIntegrations'">Integração com Banco de Dados externo</router-link></li>
            <li class="list-group-item">A second item</li>
            <li class="list-group-item">A third item</li>
            <li class="list-group-item">A fourth item</li>
            <li class="list-group-item">And a fifth one</li>
            </ul>
        </div>
      </b-container>
    </BaseView>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>