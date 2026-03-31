<script setup>
import { cn } from "~/lib/utils";

const props = defineProps({
  class: {
    type: [Boolean, null, String, Object, Array],
    required: false,
    skipCheck: true,
  },
});
</script>

<template>
  <div :class="cn('flex justify-between gap-y-1.5 p-6', props.class)">
    <slot />
  </div>
</template>
