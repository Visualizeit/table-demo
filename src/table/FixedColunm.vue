<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { NTable } from 'naive-ui'
import {
  FlexRender,
  useVueTable,
  getCoreRowModel,
  createColumnHelper,
  type RowData
} from '@tanstack/vue-table'
import users, { type User } from './users'

interface TableMetaData {
  fixed: 'left' | 'right'
}

declare module '@tanstack/vue-table' {
  interface ColumnMeta<TData extends RowData, TValue> extends Partial<TableMetaData> {}
}

const columnHelper = createColumnHelper<User>(),
  columns = [
    columnHelper.accessor('firstName', {
      meta: { fixed: 'left' }
    }),
    columnHelper.accessor('lastName', {}),
    columnHelper.accessor('age', {}),
    columnHelper.accessor('visits', {}),
    columnHelper.accessor('status', {}),
    columnHelper.accessor('progress', {})
  ]

const fixedStyle = (fixed: TableMetaData['fixed']): CSSProperties => ({
  position: 'sticky',
  [fixed]: 0,
  backgroundColor: 'skyblue',
  zIndex: 1
})

const table = useVueTable({ data: users, columns, getCoreRowModel: getCoreRowModel() })
</script>

<template>
  <div style="max-width: 30vw; overflow: scroll">
    <NTable>
      <thead>
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colSpan="header.colSpan"
            :style="{
              ...(header.column.columnDef.meta?.fixed &&
                fixedStyle(header.column.columnDef.meta.fixed))
            }"
          >
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
          <td
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
            :style="{
              ...(cell.column.columnDef.meta?.fixed && fixedStyle(cell.column.columnDef.meta.fixed))
            }"
          >
            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
          </td>
        </tr>
      </tbody>
    </NTable>
  </div>
</template>

<style scoped>
.n-table {
  overflow: initial;
}
</style>
