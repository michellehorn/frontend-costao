<template>
  <b-row class="text-left mt-5 pt-5 pl-5 pr-5 ml-5 mr-5" align-v="center">
    <b-col>
      <b-form @submit="onSubmit">
        <b-form-group id="input-group-3" label="Empresa:" label-for="input-3">
          <b-form-select
            id="input-3"
            v-model="form.company"
            :options="companies"
            value-field="id"
            text-field="nome"
            required
            @input="getFields"
          ></b-form-select>
        </b-form-group>
        <b-form-group id="input-group-3" label="Área:" label-for="input-3">
          <b-form-select
            id="input-3"
            v-model="form.field"
            :disabled="!hasCompany"
            value-field="id"
            text-field="nome"
            :options="fields"
            @input="getWindows(form.field)"
            required
          >
            <option :value="null" disabled>{{
              !form.company
                ? "Favor informar primeiro a empresa para prosseguir"
                : "Informe a área aqui"
            }}</option></b-form-select
          >
        </b-form-group>
        <b-form-group id="input-group-3" label="Guichê:" label-for="input-3">
          <b-form-select
            id="input-3"
            v-model="form.window"
            :disabled="!hasField"
            :options="windows"
            value-field="id"
            text-field="nome"
            required
          >
            <option :value="null" disabled>{{
              !form.field
                ? "Favor informar primeiro a área para prosseguir"
                : "Informe o guichê aqui"
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
</template>

<script>
import { operador } from "../api/api.js";

export default {
  name: "AttendanceEntry",
  data: () => ({
    token: null,
    idArea: null,
    nmArea: null,
    hasCompany: false,
    hasField: false,
    isFirstAccess: true,
    form: {
      company: 1,
      field: 1,
      window: null
    },
    companies: [
      {
        nome: "Costão",
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
    onSubmit(e) {
      e.preventDefault();
      localStorage.setItem("id_area", this.form.window);
      this.$emit("areaSelected");
    },
    getData() {
      operador.get("company", { headers: this.headers }).then(res => {
        this.companies = res.data;
      });

      if (this.companies.length === 1) {
        this.getFields();
      }
      if (this.fields.length === 1) {
        this.getWindows();
      }
    },
    getFields() {
      this.hasCompany = true;
      operador.get(`area/1`, { headers: this.headers }).then(res => {
        this.fields = res.data;
      });
    },
    getWindows() {
      this.hasField = true;
      operador.get(`station/1`, { headers: this.headers }).then(res => {
        this.windows = res.data;
      });
    }
  },
  mounted() {
    const tokenOp = localStorage.getItem("tokenOperador");
    this.headers = {
      Authorization: `Bearer ${tokenOp}`
    };
    this.getData();
  }
};
</script>

<style></style>
