<template>
  <div>
    <button @click="goBack" class="back-button">← Quay lại</button>
  <div class="general-settings">
    <h1>Cài đặt chung</h1>

    <div class="tabs">
      <button @click="selectTab('websiteSettings')" :class="{ active: currentTab === 'websiteSettings' }">Cài đặt Website</button>
      <button @click="selectTab('paymentSettings')" :class="{ active: currentTab === 'paymentSettings' }">Cài đặt Thanh toán</button>
    </div>

    <!-- Tab Cài đặt Website -->
    <div v-if="currentTab === 'websiteSettings'" class="tab-content">
      <form @submit.prevent="saveWebsiteSettings">
        <div class="form-group">
          <label for="logo">Logo Website</label>
          <input type="file" id="logo" @change="handleLogoUpload" />
        </div>
        <div class="form-group">
          <label for="themeColor">Màu sắc giao diện</label>
          <input type="color" id="themeColor" v-model="websiteSettings.themeColor" />
        </div>
        <div class="form-group">
          <label for="layout">Giao diện</label>
          <select id="layout" v-model="websiteSettings.layout">
            <option value="light">Sáng</option>
            <option value="dark">Tối</option>
          </select>
        </div>
        <button type="submit" class="save-button">Lưu Cài đặt</button>
      </form>
    </div>

    <!-- Tab Cài đặt Thanh toán -->
    <div v-if="currentTab === 'paymentSettings'" class="tab-content">
      <h2>Cài đặt Thanh toán</h2>
      <form @submit.prevent="savePaymentSettings">
        <div class="form-group">
          <label for="vipPackage">Gói VIP</label>
          <input type="text" id="vipPackage" v-model="paymentSettings.vipPackage" />
        </div>
        <div class="form-group">
          <label for="paymentMethods">Phương thức thanh toán</label>
          <input type="text" id="paymentMethods" v-model="paymentSettings.paymentMethods" />
        </div>
        <button type="submit" class="save-button">Lưu Cài đặt</button>
      </form>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Tab hiện tại
const currentTab = ref('websiteSettings');

// Dữ liệu cài đặt website
const websiteSettings = ref({
  themeColor: '#3498DB',
  layout: 'light',
});

// Dữ liệu cài đặt thanh toán
const paymentSettings = ref({
  vipPackage: '',
  paymentMethods: '',
});

// Xử lý upload logo
const handleLogoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    alert(`Đã tải lên logo: ${file.name}`);
  }
};

// Lưu cài đặt website
const saveWebsiteSettings = () => {
  alert('Cài đặt website đã được lưu');
  // Thêm logic lưu cài đặt
};

// Lưu cài đặt thanh toán
const savePaymentSettings = () => {
  alert('Cài đặt thanh toán đã được lưu');
  // Thêm logic lưu cài đặt
};

// Hàm chuyển tab
const selectTab = (tab) => {
  currentTab.value = tab;
};

// Hàm quay lại
const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
}

.general-settings {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  animation: fadeIn 1s ease-in-out;
}

h1 {
  text-align: center;
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.tabs button:hover {
  background-color: #2980b9;
}

.tabs button.active {
  background-color: #1abc9c;
}

.tab-content {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 20px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

input:focus, select:focus {
  border-color: #4caf50;
  outline: none;
}

.save-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.save-button:hover {
  background-color: #45a049;
}

.back-button {
  margin: 20px;
  background-color: #3498DB;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #2980B9;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
