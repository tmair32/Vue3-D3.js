import { defineStore } from "pinia";

interface State {
  chartComponent: string;
}

export const useCommonStore = defineStore("common", {
  state: (): State => {
    return {
      chartComponent: "",
    };
  },
  actions: {
    changeChartComponent(chart: string) {
      this.chartComponent = chart;
    },
  },
});
