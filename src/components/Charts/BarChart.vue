<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";
import {
  max,
  min,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  schemeCategory10,
  select,
} from "d3";

const props = defineProps({
  animation: {
    type: Boolean,
    default: false,
  },
  axis: {
    type: Boolean,
    default: false,
  },
  customColor: {
    type: Boolean,
    default: false,
  },
  hover: {
    type: Boolean,
    default: false,
  },
  label: {
    type: Boolean,
    default: false,
  },
  legend: {
    type: Boolean,
    default: false,
  },
  simple: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },
});

import jsonChartData from "~/data/ChartData.json";
// ChartData.json
// [
//     {
//     "letter": "A",
//     "frequency": 0.08167
//   },
//   {
//     "letter": "B",
//     "frequency": 0.01492
//   },
//   {
//     "letter": "C",
//     "frequency": 0.02782
//   },
// ]
const chartData = ref();

const chartRef = ref();
const xKey: string = "letter";
const yKey: string = "frequency";
const margin = {
  top: 20,
  right: 0,
  bottom: 30,
  left: 40,
};

const chartTransform = props.simple
  ? `translate(${-margin.left / 4}, ${margin.top})`
  : "";

const viewBox = computed(() => `0 0 ${props.width} ${props.height}`);
const dataMax = computed(() => max(chartData.value, (d) => d[yKey]));
const dataMin = computed(() => min(chartData.value, (d) => d[yKey]));
const xScale = computed(() =>
  scaleBand()
    .rangeRound([margin.left, props.width - margin.right])
    .padding(0.1)
    .domain(
      chartData.value.reduce((arr, cur) => {
        arr.push(cur[xKey]);
        return arr;
      }, [])
    )
);
const yScale = computed(() =>
  scaleLinear()
    .range([props.height - margin.bottom, margin.top])
    .domain([dataMin.value, dataMax.value])
);
const colorScale = computed(() =>
  scaleOrdinal(schemeCategory10).domain(
    chartData.value.reduce((arr, cur) => {
      arr.push(cur[xKey]);
      return arr;
    }, [])
  )
);

onBeforeMount(() => {
  // if (!chartRef.value) return;
  chartData.value = jsonChartData;
});

const onBeforeEnter = (el) => {
  const bar = select(el);
  const index = el.dataset.index;
  const data = chartData.value[index];
  bar
    .join("rect")
    .transition()
    .duration(750)
    .delay((_, i) => i * 150)
    .attr("y", () => yScale.value(data[yKey]))
    .attr("height", () => props.height - yScale.value(data[yKey]) - bottom);
};
</script>
<template>
  <svg
    ref="chartRef"
    class="chart"
    preserveAspectRatio="xMinYMin meet"
    :viewBox="viewBox"
  >
    <g>
      <transition-group
        tag="g"
        :transform="chartTransform"
        @before-enter="onBeforeEnter"
      >
        <rect
          v-for="(item, idx) in chartData"
          :key="`item-${idx}`"
          class="rect"
          :data-index="idx"
          :x="xScale(item[xKey]) + xScale.bandwidth() / 4"
          :y="yScale(item[yKey])"
          :width="xScale.bandwidth() / 2"
          :height="height - yScale(item[yKey]) - margin.bottom"
          :fill="colorScale(item[xKey])"
        />
      </transition-group>
    </g>
  </svg>
</template>

<style lang="scss" scoped>
.chart {
  @apply inline-block absolute bottom-0 left-0;
}
</style>
