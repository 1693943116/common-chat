<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to as string" target="_blank">
    <slot />
  </a>
  <router-link
    v-else
    :to="to"
    :replace="replace"
    :aria-current-value="ariaCurrentValue"
    custom
    v-slot="{ isActive, href, navigate }"
  >
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="isActive ? activeClass : inactiveClass"
    >
      <slot />
    </a>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

defineOptions({
  inheritAttrs: false,
  name: 'LinkPro',
})

interface Props {
  to: RouteLocationRaw
  activeClass?: string
  inactiveClass?: string
  replace?: boolean
  ariaCurrentValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  activeClass: '',
  inactiveClass: '',
  replace: false,
  ariaCurrentValue: 'page',
})

const isExternalLink = computed(() => {
  return typeof props.to === 'string' && props.to.startsWith('http')
})
</script>
