<template>
  <Badge type="info">
    <a :href="'https://github.com/listr2/listr2/issues/' + issue" target="_blank"><FontAwesomeIcon :icon="faGithub" /> #{{ issue }} </a>
  </Badge>
</template>

<script lang="ts" setup>
import { faGithub } from '@fortawesome/free-brands-svg-icons'

defineProps({
  issue: {
    type: Number,
    required: true
  }
})
</script>
