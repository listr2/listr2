<template>
  <Badge type="danger"> <FontAwesomeIcon :icon="faCodePullRequest" /> {{ version }} </Badge>
</template>

<script lang="ts" setup>
  import { faCodePullRequest } from '@fortawesome/free-solid-svg-icons'

  defineProps({
    version: {
      type: String,
      required: true
    }
  })
</script>
