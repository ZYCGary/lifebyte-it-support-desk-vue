<template>
  <div class="grid grid-cols-3 gap-4 mb-4">
    <el-card
      header="Total"
      shadow="hover"
    >
      123
    </el-card>
    <el-card
      header="Departments"
      shadow="hover"
    >
      15
    </el-card>
  </div>
  <div class="grid gap-4">
    <el-card
      header="Users By Department"
      shadow="hover"
    >
      <bar-chart v-bind="barChartProps"></bar-chart>
    </el-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js'
import { useBarChart } from 'vue-chart-3'
import { BarChart } from 'vue-chart-3'

Chart.register(...registerables)

export default defineComponent({
  name: 'user-dashboard',
  components: { BarChart },
  setup: () => {
    const chartData = computed<ChartData<'bar'>>(() => ({
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        },
        {
          label: '2',
          backgroundColor: '#127111',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        },
        {
          label: '3',
          backgroundColor: '#976435',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        },
        {
          label: '4',
          backgroundColor: '#f82343',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        },
        {
          label: '5',
          backgroundColor: '#345463',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        },
        {
          label: '6',
          backgroundColor: '#134564',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        },
        {
          label: '7',
          backgroundColor: '#896753',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
      ]
    }))

    const options = computed<ChartOptions<'bar'>>(() => ({
      scales: {
        x: {
          stacked: true
        },
        y: {
          stacked: true
        }
      }
    }))

    const { barChartProps, barChartRef } = useBarChart({ chartData, options })

    return { barChartProps, barChartRef }
  }
})
</script>

<style scoped></style>
