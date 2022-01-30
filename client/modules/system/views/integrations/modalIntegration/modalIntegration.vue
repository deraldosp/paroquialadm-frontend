<template>
  <div>
    <b-modal 
			id="modalDbIntegration" 
			no-close-on-backdrop 
			:title="$t('DB_INTEGRATION')"
			@ok="emit('saveDbIntegration', formIntegration)"
			size="lg"
    >

			<template #modal-footer="{ cancel }">
				<div class="d-flex w-100 justify-content-between">
					<div>
						<b-button size="sm" variant="info" @click="cancel()">
							{{ $t('TEST_CONNECTION') }}
						</b-button>
					</div>
					<div>
						<!-- Button with custom close trigger value -->
						<b-button size="sm" variant="secondary" @click="cancel()">
							{{ $t('CANCEL') }}
						</b-button>
						<b-button size="sm" variant="primary" @click="save()">
							{{ $t('SAVE') }}
						</b-button>
					</div>
				</div>
			</template>



			<ValidationObserver ref="observer">
				<form action="">
					<div class="row">
						<div class="col-12">
							<label for="">{{ $t("NAME") }}</label>
							<ValidationProvider :name="$t('NAME')" rules="required" v-slot="{ errors }">
								<b-form-input v-model="formIntegration.name"></b-form-input>
								<small class="text-danger">{{ errors[0] }}</small>
							</ValidationProvider>
						</div>
						
						<div class="col-12">
							<label>{{ $t("DRIVER") }}</label>
							<ValidationProvider :name="$t('DRIVER')" rules="required" v-slot="{ errors }">
								<v-select :options="drivers" :reduce="item => item.driver" v-model="formIntegration.driver"></v-select>
								<small class="text-danger">{{ errors[0] }}</small>
							</ValidationProvider>
						</div>

						<div class="col-9">
							<label>{{ $t("HOST") }}</label>
							<ValidationProvider :name="$t('HOST')" rules="required" v-slot="{ errors }">
								<b-form-input v-model="formIntegration.server"></b-form-input>
								<small class="text-danger">{{ errors[0] }}</small>
							</ValidationProvider>
						</div>

						<div class="col-3">
							<label>{{ $t("PORT") }}</label>
							<ValidationProvider :name="$t('PORT')" rules="required" v-slot="{ errors }">
								<b-form-input type="number" v-model="formIntegration.port"></b-form-input>
								<small class="text-danger">{{ errors[0] }}</small>
							</ValidationProvider>
						</div>

						<div class="col-6">
							<label>{{ $t("USERNAME") }}</label>
							<ValidationProvider :name="$t('USERNAME')" rules="required" v-slot="{ errors }">
								<b-form-input v-model="formIntegration.db_user"></b-form-input>
								<small class="text-danger">{{ errors[0] }}</small>
							</ValidationProvider>
						</div>

						<div class="col-6">
							<label>{{ $t("PASSWORD") }}</label>
							<ValidationProvider :name="$t('PASSWORD')" rules="required" v-slot="{ errors }">
								<b-form-input type="password" v-model="formIntegration.db_password"></b-form-input>
								<small class="text-danger">{{ errors[0] }}</small>
							</ValidationProvider>
						</div>
					</div>
				</form>
			</ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
export default {
	computed: {
		
	},

	data() {
		return {
			invalidFeedback: 'O Campo está invalido',
			formIntegration: {
				id: null,
				name: '',
				driver: '',
				server: '',
				port: '',
				db_user: '',
				db_password: ''
			},

			drivers: [
				{
					label: 'MySql',
					driver: 'mysql'
				},
				{
					label: 'Oracle',
					driver: 'oracle'
				},
				{
					label: 'Postgree Sql',
					driver: 'pgsql'
				},
				{
					label: 'SQL Server',
					driver: 'sqlsrv'
				}
			]
		}
	},

	methods: {
		save() {
			this.$refs.observer.validate().then(success => {
				if (!success) return

				alert(JSON.stringify(this.formIntegration))

			})
			

		}
	}

};
</script>

<style lang="scss" scoped></style>
