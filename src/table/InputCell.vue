<script setup lang="tsx">
import { NTable, NInput } from 'naive-ui'
import { FlexRender, useVueTable, getCoreRowModel, createColumnHelper } from '@tanstack/vue-table'
import users, { type User } from './users'

const columnHelper = createColumnHelper<User>(),
  columns = [
    columnHelper.accessor('firstName', {}),
    columnHelper.accessor('lastName', {}),
    columnHelper.accessor('age', {}),
    columnHelper.accessor('visits', {
      cell: (info) => (
        <NInput
          type="text"
          placeholder="Type Something..."
          defaultValue={info.getValue().toString()}
          onBlur={(event) => {
            alert((event.target as HTMLInputElement).value)
          }}
        />
      )
    }),
    columnHelper.accessor('status', {}),
    columnHelper.accessor('progress', {})
  ]

const table = useVueTable({ data: users, columns, getCoreRowModel: getCoreRowModel() })
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
</template>

<style scoped></style>
