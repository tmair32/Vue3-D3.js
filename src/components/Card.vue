<script setup lang="ts">
import { defineAsyncComponent, markRaw, onMounted, ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
    required: true,
  },
  component: {
    type: String,
    default: "",
  },
});

const cardImageRef = ref();
const cardImageWidth = ref(0);
const cardImageHeight = ref(0);
onMounted(() => {
  cardImageWidth.value = cardImageRef.value.clientWidth;
  cardImageHeight.value = cardImageRef.value.clientHeight;
});

const comp = markRaw(
  defineAsyncComponent(
    () => import(/* @vite-ignore */ `./Charts/${props.component}.vue`)
  )
);
</script>
<template>
  <div class="card">
    <div
      ref="cardImageRef"
      class="card__image"
      :class="component !== '' && 'active'"
    >
      <template v-if="component !== ''">
        <component
          :is="comp"
          :simple="true"
          :width="cardImageWidth"
          :height="cardImageHeight"
        />
      </template>
    </div>
    <div class="card__title">{{ title }}</div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  @apply min-h-40 col-span-12 md:col-span-6 lg:col-span-4;
  @apply bg-white rounded-xl cursor-pointer;
  @apply grid grid-rows-[auto,20%];

  &__image {
    @apply bg-gray-500/50 rounded-t-xl filter blur-2 cursor-default;

    &.active {
      @apply blur-0 cursor-pointer bg-fuchsia-200/50;
    }
  }

  &__title {
    @apply justify-self-center self-center text-2xl;
  }
}
</style>
