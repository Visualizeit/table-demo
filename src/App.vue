<script setup lang="ts">
import { NDialogProvider } from 'naive-ui'
import BasicTable from './table/BasicTable.vue'
import FixedColunm from './table/FixedColunm.vue'
import WithPagination from './table/WithPagination.vue'
import InputCell from './table/InputCell.vue'
import DialogTable from './table/DialogTable.vue'
</script>

<template>
  <NDialogProvider>
    <BasicTable />
    <FixedColunm />
    <WithPagination />
    <InputCell />
    <DialogTable />
    <VirtualTable />
  </NDialogProvider>
</template>

<style scoped></style>
