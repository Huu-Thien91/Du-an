<template>
    <div class="chart-container">
      <h1>Biểu đồ Thống kê Lượt Xem Phim</h1>
      <LineChart :chart-data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { Chart as ChartJS, registerables } from 'chart.js';
  import { Line } from 'vue-chartjs';
  
  // Đăng ký tất cả các thành phần của ChartJS
  ChartJS.register(...registerables);
  
  // Dữ liệu và các tùy chọn biểu đồ
  const chartData = ref({
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    datasets: [
      {
        label: 'Lượt xem phim',
        backgroundColor: '#f87979',
        borderColor: '#f87979',
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 70, 30, 90]
      }
    ]
  });
  
  const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  });
  
  onMounted(() => {
    console.log('Biểu đồ đã được tải');
  });
  </script>
  
  <style scoped>
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .chart-container {
    position: relative;
    height: 40vh;
    width: 80vw;
    margin: 0 auto;
  }
  </style>
  