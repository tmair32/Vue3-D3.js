<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
  markRaw,
  onMounted,
  ref,
  watch,
} from "vue";

const piniaState = JSON.parse(localStorage.getItem("piniaState"));
const commonState = piniaState.common;
const { chartComponent: componentName } = commonState;

const comp = markRaw(
  defineAsyncComponent(
    () =>
      import(/* @vite-ignore */ `../../components/Charts/${componentName}.vue`)
  )
);

const chartRef = ref();

const chartWidth = computed(() => {
  if (!chartRef.value) return 0;
  return chartRef.value.clientWidth;
});
const chartHeight = computed(() => {
  if (!chartRef.value) return 0;
  return chartRef.value.clientHeight;
});
const chartRatio = ref(0);
onMounted(() => {
  watch(
    chartRef.value,
    (chartRef) => {
      console.log(chartRef);
    },
    { deep: true }
  );

  chartRatio.value = (chartWidth.value / chartHeight.value).toFixed(2);
});
</script>
<template>
  <div class="col-span-12 grid grid-rows-2">
    <section class="section1">
      <div ref="chartRef" class="chart-box" :class="`pb-[${chartRatio}%]`">
        <component
          :is="comp"
          :simple="true"
          :width="chartWidth"
          :height="chartHeight"
        />
      </div>
      <div class="option-box">
        <ul>
          <li>width: {{ chartWidth }}</li>
          <li>height: {{ chartHeight }}</li>
        </ul>
      </div>
    </section>
    <section class="section2"></section>
  </div>
</template>

<style lang="scss" scoped>
.section1,
.section2 {
  @apply col-span-12;
}

.section1 {
  @apply grid grid-cols-[67%,33%];
}

.section2 {
  @apply grid grid-cols-[75%,25%];
}

.chart-box {
  @apply inline-block relative w-full align-top overflow-hidden;
  @apply shadow-inner shadow-gray-200;
}

.option-box {
  @apply shadow-inner shadow-gray-200 flex flex-col items-center justify-center;
}
</style>
