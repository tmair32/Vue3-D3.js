<script setup lang="ts">
import { defineAsyncComponent, markRaw, onMounted, ref, watch } from "vue";

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
const chartWidth = ref(0);
const chartHeight = ref(0);
onMounted(() => {
  chartWidth.value = chartRef.value.clientWidth;
  chartHeight.value = chartRef.value.clientHeight;
});
</script>
<template>
  <div class="col-span-12">
    <section class="section1">
      <div ref="chartRef" class="chart-box">
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
  @apply inline-block relative w-full pb-[100%] align-top overflow-hidden;
  @apply shadow-inner shadow-gray-200;
}

.option-box {
  @apply shadow-inner shadow-gray-200 flex flex-col items-center justify-center;
}
</style>
