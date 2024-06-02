<template lang="pug">
.d-flex.flex-column.align-items-stretch.flex-shrink-0.bg-body-tertiary
  .list-group.list-group-flush.border-bottom
    li.list-group-item(
      v-for="result in calculationResults",
      :key="result.time"
    )
      .d-flex.w-100.align-items-center.justify-content-between
        strong.mb-1.fs-5 {{ result.result }}
          |
          span.ms-1.lead Н
        small {{ result.time }}
      .col-10.mb-1.small
        span {{ result.date }}
</template>

<script>
export default {
  data() {
    return {
      calculationResults: [],
    };
  },
  methods: {
    updateSidebar() {
      this.calculationResults =
        JSON.parse(localStorage.getItem("calculationResults")) || [];

      this.calculationResults.sort((a, b) => {
        const dateTimeA = a.date.split(".").reverse().join("-") + " " + a.time;
        const dateTimeB = b.date.split(".").reverse().join("-") + " " + b.time;
        return new Date(dateTimeB) - new Date(dateTimeA);
      });

      console.log("Sidebar Updated Results:", this.calculationResults);
    },
  },
  mounted() {
    this.updateSidebar();
  },
};
</script>

