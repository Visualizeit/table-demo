<script setup lang="tsx">
import { ref, computed, defineComponent } from 'vue'
import { NButton, NInput, NTable } from 'naive-ui'
import { FlexRender, useVueTable, getCoreRowModel, createColumnHelper } from '@tanstack/vue-table'
import { useVirtualizer } from '@tanstack/vue-virtual'
import users, { type User } from './users'

const Input = defineComponent({
  props: {
    initialText: { type: String, required: true }
  },
  setup(props) {
    const text = ref(props.initialText)
    const isEdit = ref(false)

    return () =>
      isEdit.value ? (
        <NInput
          type="text"
          style="max-width : 127px"
          value={text.value}
          onUpdate:value={(value) => {
            text.value = value
          }}
          onBlur={() => {
            isEdit.value = false
          }}
        />
      ) : (
        <NButton
          onClick={() => {
            isEdit.value = true
          }}
        >
          {text.value}
        </NButton>
      )
  }
})

const columnHelper = createColumnHelper<User>(),
  columns = [
    columnHelper.accessor('firstName', {}),
    columnHelper.accessor('lastName', {}),
    columnHelper.accessor('age', {}),
    columnHelper.accessor('visits', {}),
    columnHelper.accessor('status', {
      cell: (info) => <Input initialText={info.getValue()} />
    }),
    columnHelper.accessor('progress', {})
  ]

const data = ref(users)

const table = useVueTable({
  get data() {
    return data.value
  },
  columns,
  getCoreRowModel: getCoreRowModel()
})

const parentRef = ref<HTMLElement | null>(null)

const rows = computed(() => table.getRowModel().rows)

const rowVirtualizer = useVirtualizer(
  computed(() => ({
    count: rows.value.length,
    getScrollElement: () => parentRef.value,
    estimateSize: () => 47.39
  }))
)

const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())

const totalSize = computed(() => rowVirtualizer.value.getTotalSize())

const handleResize = () => {
  data.value = Array.from(data.value).reverse()
}
</script>

<template>
  <NButton @click="handleResize()">Click</NButton>
  <div ref="parentRef" :style="{ height: '600px', overflow: 'auto' }">
    <div :style="{ height: `${totalSize}px` }">
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
          <tr
            v-for="(virtualRow, index) in virtualRows"
            :key="virtualRow.key"
            :style="{
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`
            }"
          >
            <td v-for="cell in rows[virtualRow.index].getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
        </tbody>
      </NTable>
    </div>
  </div>
</template>

<style scoped>
.n-table {
  overflow: initial;
}
</style>
