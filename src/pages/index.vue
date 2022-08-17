<script setup lang="ts">
import Card from "~/components/Card.vue";
import { useRouter } from "vue-router";
import { useCommonStore } from "~/store/common";
const router = useRouter();
const store = useCommonStore();

const charts = [
  {
    title: "Bar Chart",
    component: "BarChart",
  },
  { title: "Horizon Bar Chart" },
  { title: "Grouped Bar Chart" },
  { title: "Box Plot Chart" },
  { title: "Horizon Box Plot Chart" },
  { title: "Donut Chart" },
  { title: "Pie Chart" },
  { title: "Lollipop Chart" },
];

const viewChart = (componentName: string | undefined) => {
  if (!componentName) return;
  const { changeChartComponent } = store;
  changeChartComponent(componentName);
  router.push({
    name: "Chart",
  });
};
</script>
<template>
  <div class="main">
    <template v-for="chart in charts" :key="chart.title">
      <card
        :title="chart.title"
        :component="chart.component"
        @click="viewChart(chart.component)"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.main {
  @apply col-span-12;
  @apply grid grid-cols-12 gap-x-8 gap-y-5;
}
</style>
