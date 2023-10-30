<script setup lang="tsx">
import { NButton, NTable, useDialog } from 'naive-ui'
import { FlexRender, useVueTable, getCoreRowModel, createColumnHelper } from '@tanstack/vue-table'
import users, { type User } from './users'

const dialog = useDialog()

const columnHelper = createColumnHelper<User>(),
  columns = [
    columnHelper.accessor('firstName', {}),
    columnHelper.accessor('lastName', {}),
    columnHelper.accessor('age', {}),
    columnHelper.accessor('visits', {}),
    columnHelper.accessor('status', {}),
    columnHelper.accessor('progress', {}),
    columnHelper.display({
      id: 'edit',
      cell: (info) => {
        const openEditDialog = () => {
          dialog.create({
            showIcon: false,
            title: info.row.original.status,
            content: () => (
              <NButton>{info.row.original.firstName + info.row.original.lastName}</NButton>
            )
          })
        }

        return <NButton onClick={openEditDialog}>Edit</NButton>
      }
    })
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
