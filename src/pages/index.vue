<template lang="pug">
#offcanvasScrolling.offcanvas.offcanvas-start(
  data-bs-scroll="true",
  data-bs-backdrop="false",
  tabindex="-1",
  aria-labelledby="offcanvasScrollingLabel"
)
  .offcanvas-header
    h5#offcanvasScrollingLabel.offcanvas-title Історія запитів
    button.btn-close(
      type="button",
      data-bs-dismiss="offcanvas",
      aria-label="Close"
    )
  sidebar(ref="sidebar")
.bg-white.p-3.rounded-3
  span Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat масса quis enim.
.p-2
pre {{ selectedSoilType }}
.d-flex.flex-column.bg-white.p-5.rounded-3
  h2 Тип ґрунту
  .p-2
  .buttons-group
    label.d-flex.justify-content-between.gap-2.py-2.pe-5(
      v-for="option in soilOptions",
      :key="option.id"
    )
      span(:for="option.id") {{ option.label }}
      input.form-check-input.flex-shrink-0(
        :id="option.id",
        type="radio",
        :value="option.value",
        :name="option.id",
        v-model="selectedSoilType",
        @change="toggleCustomSoilProperties"
      )
  .p-2
  .form-group.row.mb-3.d-flex
    .col-md-6
      .form-label.lead {{ naturalMoisture.label }}
    .col-md-6
      .input-group.w-100
        input.form-control(
          :type="naturalMoisture.type",
          :min="naturalMoisture.min",
          :max="naturalMoisture.max",
          :step="naturalMoisture.step",
          v-model="naturalMoisture.value"
        )
        span.input-group-text(style="width: 100px") {{ naturalMoisture.unit }}
.p-2
pre {{ mapInputs([naturalMoisture]) }}
pre {{ mapInputs(customSoilProperties) }}
#customSoilPropertiesBlock.collapse.bg-white.p-5.rounded-3(
  v-show="selectedSoilType === 'UserType'"
)
  h2.block-header Для власного типу ґрунту введіть властивості:
  .p-2
  .form-group.row.mb-3.d-flex(
    v-for="(field, index) in customSoilProperties",
    :key="index"
  ) 
    |
    |
    |
    |
    |
    .col-md-6
      .form-label.lead(v-html="field.label")
    .col-md-6
      .input-group.w-100
        input.form-control(
          :type="field.type",
          :step="field.step",
          :min="field.min",
          :max="field.max",
          v-model="field.value"
        )
        span.input-group-text(style="width: 100px") {{ field.unit }}
.p-2
pre {{ mapInputs(casingInputs) }}
.bg-white.p-5.rounded-3
  h2.block-header Футляри
  .p-2
  .form-group.row.mb-3.d-flex(
    v-for="(field, index) in casingInputs",
    :key="index"
  ) 
    |
    |
    |
    |
    |
    .col-md-6
      .form-label.lead(v-html="field.label")
    .col-md-6
      .input-group.w-100
        .buttons-group(v-if="field.type === 'radio'")
          label.d-flex.justify-content-between.gap-2.py-2.pe-5(
            v-for="(option, index) in field.options",
            :key="index"
          )
            span(:for="option.id") {{ option.label }}
            input.form-check-input.flex-shrink-0(
              :type="field.type",
              :id="option.id",
              :value="option.value",
              :name="option.id",
              v-model="field.value"
            )
        template(v-if="field.type === 'number'")
          input.form-control(
            :type="field.type",
            :step="field.step",
            :min="field.min",
            :max="field.max",
            v-model="field.value"
          )
          span.input-group-text(style="width: 100px") {{ field.unit }}
.p-2
pre {{ inputData }}
pre {{ mapInputs(installationInputs, inputData) }}
.bg-white.p-5.rounded-3
  h2.block-header Установка
  .p-2
  .form-group.row.mb-3.d-flex(
    v-for="(input, index) in installationInputs",
    :key="input.label"
  ) 
    |
    |
    |
    |
    |
    |
    .col-md-6
      .form-label.lead(v-html="input.label")
    .col-md-6
      .input-group.w-100
        template(v-if="input.type === 'select'")
          .col-12
            select.form-select(
              :name="input.name",
              v-model="inputData[input.name]",
              @change="checkCustomCylinderInput(input.name)"
            )
              option(
                v-for="option in input.options",
                :key="option.value",
                :value="option.value"
              ) {{ option.label }}
          #customCylinderInputCollapse.collapse.col-12.py-2(
            v-show="input.customInputVisible"
          )
            .input-group.w-100
              input.form-control(
                :type="input.customInputType",
                :name="input.customInputName",
                :min="input.min",
                :max="input.max",
                :step="input.step",
                v-model="inputData[input.customInputName]"
              )
              span.input-group-text(style="width: 100px") {{ input.unit }}
        template(v-else)
          input.form-control(
            :type="input.type",
            :name="input.name",
            :min="input.min",
            :max="input.max",
            :step="input.step",
            v-model="input.value"
          )
          span.input-group-text(style="width: 100px") {{ input.unit }}
.p-2
pre {{ mapInputs(workingBodyInputs) }}
.bg-white.p-5.rounded-3
  h2.block-header Робочий орган
  .p-2
  .form-group.row.mb-3.d-flex(
    v-for="(input, index) in workingBodyInputs",
    :key="input.label"
  )
    .col-md-6
      .form-label.lead(v-html="input.label")
    .col-md-6
      .input-group.w-100
        input.form-control(
          :type="input.type",
          :name="input.name",
          :min="input.min",
          :max="input.max",
          :step="input.step",
          v-model="input.value"
        )
        span.input-group-text(style="width: 100px") {{ input.unit }}
.text-center.p-3
  button.btn.btn-lg.btn-primary(@click="calculateResult") Розрахувати
.bg-white.p-5.rounded-3(v-if="result")
  .text-center
    p.mb-0.fs-3 Результат: {{ result }}
      |
      span.ms-1.lead Н
</template>

<script>
import {
  calculateWedgePrismatic,
  calculateConicalCylindrical,
} from "../utils/calculate.js";

import Sidebar from "@/components/Sidebar.vue";

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      selectedSoilType: "",
      inputData: {},
      soilOptions: [
        {
          id: "NapivTverdiySupisok",
          value: "NapivTverdiySupisok",
          label: "Твердий супісок",
        },
        {
          id: "TygoplastychnaGlyna",
          value: "TygoplastychnaGlyna",
          label: "Тугопластична глина",
        },
        {
          id: "NapivTverdiySuglynok",
          value: "NapivTverdiySuglynok",
          label: "Твердий суглинок",
        },
        {
          id: "UserType",
          value: "UserType",
          label: "Свої властивості ґрунта",
        },
      ],
      customSoilProperties: [
        {
          label: "с, Коефіцієнт зчеплення ґрунту",
          name: "soilCohesionCoefficient",
          type: "number",
          min: "0",
          max: "100",
          step: "0.005",
          unit: "(МПа)",
          value: "",
        },
        {
          label: "\u03C6\u2080, Кут внутрішнього тертя",
          name: "internalFrictionAngle",
          type: "number",
          min: "0",
          max: "90",
          step: "0.1",
          unit: "град",
          value: "",
        },
        // {
        //   label: "\u03C6, Кут зовнішнього тертя",
        //   name: "externalFrictionAngle",
        //   type: "number",
        //   min: "0",
        //   max: "90",
        //   step: "0.1",
        //   unit: "град",
        //   value: "",
        // },
        {
          label: "\u03B3, Питома вага у природньому стані ґрунту",
          name: "soilUnitWeight",
          type: "number",
          min: "0",
          max: "100",
          step: "0.1",
          unit: "мН/м\u00B3",
          value: "",
        },
        // {
        //   label: "Еv, Модуль об'ємної деформації ґрунту",
        //   name: "soilVolumeDeformationModule",
        //   type: "number",
        //   min: "0",
        //   max: "100",
        //   step: "1",
        //   unit: "МПа",
        //   value: "",
        // },
        {
          label: "\u03C1<sub>тв</sub>, Щільність твердої фази ґрунту",
          name: "densitySolidPhase",
          type: "number",
          min: "0",
          max: "3",
          step: "0.01",
          unit: "т/м\u00B3",
          value: "",
        },
        {
          label: "\u03C1<sub>пр</sub>, Щільність ґрунту в природному стані",
          name: "densityNaturalState",
          type: "number",
          min: "0",
          max: "3",
          step: "0.01",
          unit: "т/м\u00B3",
          value: "",
        },
      ],
      casingInputs: [
        {
          label: "Форма футлярів",
          type: "radio",
          name: "casingShape",
          options: [
            {
              value: "WedgePrismatic",
              label: "Клиново-призмаичний",
              id: "WedgePrismatic",
            },
            {
              value: "ConicalCylindrical",
              label: "Конічно-циліндричний",
              id: "ConicalCylindrical",
            },
          ],
          value: "",
        },
        {
          label: "Тип футлярів",
          type: "radio",
          name: "casingType",
          options: [
            {
              value: 0.532,
              label: "Сталь",
              id: "Steel",
            },
            {
              value: 0.531, // здесь вспомним
              label: "Гофрована труба",
              id: "CorrugatedPipe",
            },
            {
              value: 0.533, // и здесь
              label: "Пластикова труба",
              id: "PlasticPipe",
            },
          ],
          value: "",
        },
        {
          label: "h, глибина прокладання",
          name: "layingDepth",
          type: "number",
          min: "0",
          max: "100",
          step: "0.5",
          unit: "(м)",
          value: "",
        },
        {
          label: "d, діаметр футлярів",
          name: "casingDiameter",
          type: "number",
          min: "0",
          max: "100",
          step: "0.5",
          unit: "(м)",
          value: "",
        },
        {
          label: "n, кількість футлярів",
          name: "numberOfCasings",
          type: "number",
          min: "0",
          max: "10",
          step: "1",
          unit: "(шт)",
          value: "",
        },
      ],
      installationInputs: [
        {
          label: "d, діаметр циліндра",
          type: "select",
          name: "cylinderDiameter",
          options: [
            { value: "80", label: "80 мм" },
            { value: "90", label: "90 мм" },
            { value: "100", label: "100 мм" },
            { value: "110", label: "110 мм" },
            { value: "customCylinderDiameter", label: "Власне значення" },
          ],
          customInputVisible: false,
          customInputType: "number",
          customInputName: "customCylinderDiameter",
          customValue: "customCylinderDiameter",
          unit: "мм",
          value: "",
        },
        {
          label: "Робочий тиск",
          type: "number",
          name: "operatingPressure",
          min: "10",
          max: "32",
          step: "1",
          unit: "(МПа)",
          value: "",
        },
        {
          label: "n, кількість циліндрів",
          type: "number",
          name: "numberOfCylinders",
          min: "0",
          max: "10",
          step: "1",
          unit: "(шт)",
          value: "",
        },
        {
          label: "Зусилля установки",
          type: "number",
          name: "installationForce",
          min: "0",
          max: "100",
          step: "0.1",
          unit: "одиниць",
          value: "",
        },
      ],
      workingBodyInputs: [
        {
          label: "&beta;, кут загострення при вершині",
          type: "number",
          name: "apexAngle",
          min: "0",
          max: "90",
          step: "0.1",
          unit: "град",
          value: "",
        },
        {
          label: "d<sub>л</sub>, діаметр робочого органу",
          type: "number",
          name: "workingBodyDiameter",
          min: "0",
          max: "100",
          step: "0.01",
          unit: "м",
          value: "",
        },
        {
          label: "B<sub>n</sub>, довжина калібруючої частини",
          type: "number",
          name: "calibrationLength",
          min: "0",
          max: "",
          step: "1",
          unit: "мм",
          value: 150,
        },
      ],
      customSoilPropertiesBlock: null,
      customCylinderInputCollapse: null,
      naturalMoisture: {
        label: "\u03C9, Природна вологість ґрунту",
        name: "soilNaturalMoisture",
        type: "number",
        min: "0",
        max: "100",
        step: "1",
        unit: "%",
        value: "",
      },
      TypGrunty: {
        NapivTverdiySupisok: {
          c: 0.02,
          fi_0: 25.0,
          // fi: 21.0,
          gama: 0.0205,
          // E_v: 640000,
          densitySolidPhase: 2.7,
          densityNaturalState: 2.05,
        },
        NapivTverdiySuglynok: {
          c: 0.04,
          fi_0: 21.0,
          // fi: 25.0,
          gama: 0.021,
          // E_v: 950000,
          densitySolidPhase: 2.7,
          densityNaturalState: 2.1,
        },
        TygoplastychnaGlyna: {
          c: 0.04,
          fi_0: 22.0,
          // fi: 22.0,
          gama: 0.20,
          // E_v: 477000,
          densitySolidPhase: 2.73,
          densityNaturalState: 2,
        },
      },
      result: "",
    };
  },
  beforeUnmount() {
    if (this.customSoilPropertiesBlock) {
      this.customSoilPropertiesBlock.hide();
    }
    if (this.customCylinderInputCollapse) {
      this.customCylinderInputCollapse.hide();
    }
  },
  methods: {
    async toggleCustomSoilProperties() {
      if (this.selectedSoilType === "UserType") {
        this.customSoilPropertiesBlock.show();
      } else {
        const selectedType = this.TypGrunty[this.selectedSoilType];
        this.customSoilProperties.forEach((property) => {
          switch (property.name) {
            case "soilCohesionCoefficient":
              property.value = selectedType.c;
              break;
            case "internalFrictionAngle":
              property.value = selectedType.fi_0;
              break;
            // case "externalFrictionAngle":
            //   property.value = selectedType.fi;
            //   break;
            case "soilUnitWeight":
              property.value = selectedType.gama;
              break;
            // case "soilVolumeDeformationModule":
            //   property.value = selectedType.E_v;
            //   break;
            case "densitySolidPhase":
              property.value = selectedType.densitySolidPhase;
              break;
            case "densityNaturalState":
              property.value = selectedType.densityNaturalState;
              break;
          }
        });
        this.customSoilPropertiesBlock.hide();
      }
    },
    checkCustomCylinderInput(inputName) {
      const input = this.installationInputs.find((i) => i.name === inputName);
      if (input) {
        input.customInputVisible =
          this.inputData.cylinderDiameter === input.customValue;
        this.customCylinderInputCollapse.show();
      }
    },
    mapInputs(inputArray, object) {
      return inputArray.reduce((accumulator, item) => {
        let value;

        if (item.type === "radio") {
          const selectedOption = item.options.find(
            (option) => option.value === item?.value
          );
          value = selectedOption?.value;
        } else if (item.type === "select") {
          if (item.value === item.customValue) {
            value = object[item.customInputName];
          } else {
            value = +object.cylinderDiameter || +object.customCylinderDiameter;
          }
        } else {
          value = item?.value;
        }

        accumulator[item.name] = value;
        return accumulator;
      }, {});
    },
    calculateResult() {
      const allInputs = {
        ...this.mapInputs([this.naturalMoisture]),
        ...this.mapInputs(this.customSoilProperties),
        ...this.mapInputs(this.casingInputs),
        ...this.mapInputs(this.installationInputs, this.inputData),
        ...this.mapInputs(this.workingBodyInputs),
      };

      console.log(allInputs);

      const {
        casingDiameter,
        // soilPressure = 0.532,
        soilCohesionCoefficient,
        apexAngle,
        internalFrictionAngle,
        soilUnitWeight,
        layingDepth,
        numberOfCasings,
        calibrationLength,
        soilNaturalMoisture,
        densitySolidPhase,
        densityNaturalState,
        casingType,
        casingShape,
      } = allInputs;

      // Вызов функций расчета
      const resultWedgePrismatic = calculateWedgePrismatic(
        casingDiameter,
        casingType,
        soilCohesionCoefficient,
        apexAngle,
        internalFrictionAngle,
        soilUnitWeight,
        layingDepth,
        numberOfCasings,
        calibrationLength,
        soilNaturalMoisture,
        densitySolidPhase,
        densityNaturalState
      );

      const resultConicalCylindrical = calculateConicalCylindrical(
        layingDepth,
        soilUnitWeight,
        soilCohesionCoefficient,
        casingDiameter,
        casingType,
        apexAngle,
        numberOfCasings,
        soilNaturalMoisture,
        densitySolidPhase,
        densityNaturalState,
        internalFrictionAngle
      );

      const answer =
        casingShape === "WedgePrismatic"
          ? resultWedgePrismatic
          : resultConicalCylindrical;

      if (isNaN(answer)) {
        alert("Введіть усі дані для розрахунку");
        return;
      }

      this.result = parseFloat(answer, 10).toFixed(2);

      const date = new Date().toLocaleString("uk-UA", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });

      const time = new Date().toLocaleString("uk-UA", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });

      const calculationResult = {
        date,
        time,
        result: this.result,
      };

      let results =
        JSON.parse(localStorage.getItem("calculationResults")) || [];
      results.push(calculationResult);
      localStorage.setItem("calculationResults", JSON.stringify(results));

      console.log(
        "Результат для клиново-призматичного футляра:",
        resultWedgePrismatic
      );
      console.log(
        "Результат для конічно-циліндричного футляра:",
        resultConicalCylindrical
      );

      this.$nextTick(() => {
        console.log(this.$refs);
        if (this.$refs.sidebar) {
          this.$refs.sidebar.updateSidebar();
        }
      });

      this.$refs.sidebar.updateSidebar();
    },
  },
  async mounted() {
    const { Collapse } = await import("bootstrap/dist/js/bootstrap.min");
    this.customSoilPropertiesBlock = new Collapse(
      document.getElementById("customSoilPropertiesBlock")
    );
    this.customCylinderInputCollapse = new Collapse(
      document.getElementById("customCylinderInputCollapse")
    );
  },
};
</script>

<style lang="sass" scoped>
.buttons-group
  width: 100%
  max-width: 460px

.form-check-input[type=radio]
  border-color: #acacac
</style>
