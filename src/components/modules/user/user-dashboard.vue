<template>
  <div class="grid grid-cols-4 gap-4">
    <el-card
      header="Total Users"
      shadow="hover"
    >
      {{ statistics.total_users }}
    </el-card>
    <el-card
      header="Users By Department"
      shadow="hover"
      class="col-span-4"
    >
      <bar-chart v-bind="barChartProps"></bar-chart>
    </el-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { Chart, ChartData, registerables } from 'chart.js'
import { useBarChart } from 'vue-chart-3'
import { BarChart } from 'vue-chart-3'
import useUser from '@/hooks/useUser'
import { ElMessage } from 'element-plus/es'

Chart.register(...registerables)

export default defineComponent({
  name: 'user-dashboard',
  components: { BarChart },
  setup: () => {
    const statistics = reactive({
      total_users: 0,
      users_by_department: {
        labels: [] as string[],
        data: [] as number[]
      }
    })

    const chartData = computed<ChartData<'bar'>>(() => ({
      labels: statistics.users_by_department.labels,
      datasets: [
        {
          label: 'Users',
          backgroundColor: '#66b1ff',
          data: statistics.users_by_department.data
        }
      ]
    }))

    const { barChartProps, barChartRef } = useBarChart({ chartData })

    const { getUserStatistics } = useUser()

    getUserStatistics()
      .then((data) => {
        const { totalUsers, usersByDepartment } = data

        statistics.total_users = totalUsers

        if (usersByDepartment as object) {
          statistics.users_by_department.labels = Object.keys(usersByDepartment)
          statistics.users_by_department.data = Object.values(usersByDepartment)
        }
      })
      .catch(() => {
        ElMessage({
          type: 'error',
          message: 'Failed to load user statistic data.'
        })
      })

    return { statistics, barChartProps, barChartRef }
  }
})
</script>

<style scoped></style>
