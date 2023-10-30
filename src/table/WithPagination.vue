<script setup lang="ts">
import { computed, reactive } from 'vue'
import { NTable, NPagination } from 'naive-ui'
import { FlexRender, useVueTable, getCoreRowModel, createColumnHelper } from '@tanstack/vue-table'
import users, { type User } from './users'

const columnHelper = createColumnHelper<User>(),
  columns = [
    columnHelper.accessor('firstName', {}),
    columnHelper.accessor('lastName', {}),
    columnHelper.accessor('age', {}),
    columnHelper.accessor('visits', {}),
    columnHelper.accessor('status', {}),
    columnHelper.accessor('progress', {})
  ]

const paginationState = reactive({ page: 1, pageCount: 3, pageSize: 10 })

const tableData = computed(() =>
  users.slice(
    (paginationState.page - 1) * paginationState.pageSize,
    paginationState.page * paginationState.pageSize
  )
)

const table = useVueTable({
  get data() {
    return tableData.value
  },
  columns,
  getCoreRowModel: getCoreRowModel()
})
</script>

<template>
  <NTable>
    <thead>
      <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <th v-for="header in headerGroup.headers" :key="header.id" :colSpan="header.colSpan">
          <FlexRender
            v-if="!header.isPlaceholder"
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in table.getRowModel().rows" :key="row.id">
        <td v-for="cell in row.getVisibleCells()" :key="cell.id">
          <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
        </td>
      </tr>
    </tbody>
  </NTable>
  <NPagination v-model:page="paginationState.page" :pageCount="paginationState.pageCount" />
</template>

<style scoped></style>
