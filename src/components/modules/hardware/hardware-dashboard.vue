<template>
  <div class="grid grid-cols-4 gap-4">
    <el-card
      header="Total"
      shadow="hover"
    >
      2000
    </el-card>
    <el-card
      header="Hardware By Type & Department"
      shadow="hover"
      class="col-span-4"
    >
      <bar-chart v-bind="barChartProps"></bar-chart>
    </el-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js'
import { useBarChart } from 'vue-chart-3'
import { BarChart } from 'vue-chart-3'
import useHardware from '@/hooks/useHardware'
import { ElMessage } from 'element-plus/es'

Chart.register(...registerables)

export default defineComponent({
  name: 'hardware-dashboard',
  components: { BarChart },
  setup: () => {
    const statistics = reactive({
      total_hardware: 0,
      hardware_by_type_and_department: {
        labels: [] as string[],
        dataset: [] as { label: string; backgroundColor: string; data: number[] }[]
      }
    })

    const chartData = computed<ChartData<'bar'>>(() => ({
      labels: statistics.hardware_by_type_and_department.labels,
      datasets: [...statistics.hardware_by_type_and_department.dataset]
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

    const { getHardwareStatistics } = useHardware()

    const constructHardwareByTypeAndDepartmentChartDatasets = (data: any) => {
      if (data.hardwareByTypeAndDepartment as Object) {
        statistics.hardware_by_type_and_department.labels = Object.keys(data.hardwareByTypeAndDepartment)

        // Get hardware types
        let datasetLabels = [] as string[]
        for (const types of Object.values(data.hardwareByTypeAndDepartment)) {
          for (const department of Object.keys(types as object)) {
            if (!datasetLabels.includes(department)) {
              datasetLabels.push(department)
            }
          }
        }

        // Construct chart dataset
        const backgroundColors = [
          '#66b1ff',
          '#85ce61',
          '#ebb563',
          '#f78989',
          '#3375b9',
          '#4e8e2f',
          '#a77730',
          '#b25252',
          '#2a598a',
          '#3e6b27',
          '#7d5b28',
          '#854040',
          '#213d5b',
          '#2d481f',
          '#533f20',
          '#582e2e'
        ]

        datasetLabels.map((label, index) => {
          let set = {
            label: label,
            backgroundColor: backgroundColors[index],
            data: [] as number[]
          }

          for (const types of Object.values(data.hardwareByTypeAndDepartment)) {
            set.data.push(
              (
                types as {
                  [key: string]: number
                }
              )[label] || 0
            )
          }

          statistics.hardware_by_type_and_department.dataset.push(set)
        })
      }
    }

    getHardwareStatistics()
      .then((data) => {
        statistics.total_hardware = data.totalHardware

        constructHardwareByTypeAndDepartmentChartDatasets(data)
      })
      .catch(() => {
        ElMessage({
          type: 'error',
          message: 'Failed to load hardware statistic data.'
        })
      })

    return { statistics, barChartProps, barChartRef }
  }
})
</script>

<style scoped></style>
