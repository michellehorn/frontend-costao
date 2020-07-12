<template>
  <div>
    <b-navbar-nav
      class="p-3 font-family-secondary text-center bg-navy text-white"
    >
      <h3>Atendimento</h3>
    </b-navbar-nav>
    <b-container class="pt-3">
      <b-row class="text-left mt-5 pt-5 pl-5 pr-5 ml-5 mr-5" align-v="center">
        <b-col>
          <b-form @submit="onSubmit">
            <b-form-group
              id="input-group-3"
              label="Empresa:"
              label-for="input-3"
            >
              <b-form-select
                id="input-3"
                v-model="form.company"
                :options="companies"
                required
                @input="hasCompany = true"
              ></b-form-select>
            </b-form-group>
            <b-form-group id="input-group-3" label="Área:" label-for="input-3">
              <b-form-select
                id="input-3"
                v-model="form.field"
                :disabled="!hasCompany"
                :options="fields"
                @input="hasField = true"
                required
              >
                <option :value="null" disabled>{{
                  !form.company
                    ? "Favor informar primeiro a empresa para prosseguir"
                    : "Informe a área aqui"
                }}</option></b-form-select
              >
            </b-form-group>
            <b-form-group
              id="input-group-3"
              label="Guichê:"
              label-for="input-3"
            >
              <b-form-select
                id="input-3"
                v-model="form.window"
                :disabled="!hasField"
                :options="windows"
                required
              >
                <option :value="null" disabled>{{
                  !form.field
                    ? "Favor informar primeiro a área para prosseguir"
                    : "Informe a área aqui"
                }}</option></b-form-select
              >
            </b-form-group>
            <div fluid class="text-light text-center">
              <b-button style="width: 200px" type="submit" variant="primary"
                >Entrar</b-button
              >
            </div>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Attendance",
  data: () => ({
    hasCompany: false,
    hasField: false,
    isFirstAccess: true,
    form: {
      company: null,
      field: null,
      window: null
    },
    companies: [
      {
        text: "Costão",
        value: 1
      }
    ],
    fields: [
      {
        text: "Saguão do Hotel",
        value: 1
      }
    ],
    windows: [
      {
        text: "G1",
        value: 1
      },
      {
        text: "G2",
        value: 2
      },
      {
        text: "G3",
        value: 3
      },
      {
        text: "G4",
        value: 4
      }
    ]
  }),
  methods: {
    onSubmit() {
      alert(this.hasCompany);
    }
  }
};
</script>

<style></style>
