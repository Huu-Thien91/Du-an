<template>
    <div class="dashboard">
      <aside class="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li><router-link to="/admin/movies">Quản lý phim</router-link></li>
          <li><router-link to="/admin/genremanager">Quản lý thể loại phim</router-link></li>
          <li><router-link to="/admin/finance">Quản lí tài chính</router-link></li>
          <li><router-link to="/admin/transactions">Lịch sử giao dịch</router-link></li>
          <li><router-link to="/admin/account">Tài khoản admin</router-link></li>
          <li><router-link to="/admin/user">Tài khoản người dùng</router-link></li>
          <li><router-link to="/admin/setting">Cài đặt hệ thống</router-link></li>
          <li><router-link to="/login">Đăng xuất</router-link></li>
        </ul>
      </aside>
      <main class="main-content">
        <router-view></router-view>
        <ChartComponent></ChartComponent>
      </main>
    </div>
  </template>
  
  <script setup>
import { RouterLink, RouterView } from 'vue-router';
import ChartComponent from "@/components/admin/ChartComponent.vue";                                                                                             
  </script>
  
<style scoped>
@import "/src/assets/css/admin.css";
</style>
  