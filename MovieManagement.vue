<template>
  <div>
    <button @click="goBack" class="back-button">← Quay lại</button>
    <div class="movie-management">
      <h1>🎥 Quản lý Phim</h1>

      <!-- Tabs -->
      <div class="tabs">
        <button @click="selectTab('movies')" :class="{ active: currentTab === 'movies' }">Phim Lẻ</button>
        <button @click="selectTab('series')" :class="{ active: currentTab === 'series' }">Phim Bộ</button>
        <button @click="selectTab('episodes')" :class="{ active: currentTab === 'episodes' }">Tập Phim</button>
      </div>

      <!-- Quản lý phim lẻ -->
      <div v-if="currentTab === 'movies'" class="tab-content">
        <h2>Quản lý Phim Lẻ</h2>
        <form @submit.prevent="submitMovie" class="movie-form">
          <div class="form-group">
            <label>Tiêu đề:</label>
            <input type="text" v-model="movieForm.title" placeholder="Nhập tiêu đề..." required />
          </div>
          <div class="form-group">
            <label>Đạo diễn:</label>
            <input type="text" v-model="movieForm.director" placeholder="Nhập đạo diễn..." required />
          </div>
          <div class="form-group">
            <label>Thể loại:</label>
            <input type="text" v-model="movieForm.genre" placeholder="Nhập thể loại..." required />
          </div>
          <div class="form-group">
            <label>Rating:</label>
            <input type="number" v-model="movieForm.rating" placeholder="Nhập rating..." min="0" max="10" step="0.1"
              required />
          </div>
          <div class="form-group">
            <label>Trạng thái:</label>
            <select v-model="movieForm.status" required>
              <option value="Công chiếu">Công chiếu</option>
              <option value="Sắp ra mắt">Sắp ra mắt</option>
            </select>
          </div>
          <button type="submit" class="submit-button">{{ movieForm.editing ? 'Cập nhật' : 'Thêm Phim' }}</button>
        </form>
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tiêu đề</th>
              <th>Đạo diễn</th>
              <th>Thể loại</th>
              <th>Rating</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(movie, index) in movies" :key="movie.id">
              <td>{{ movie.id }}</td>
              <td>{{ movie.title }}</td>
              <td>{{ movie.director }}</td>
              <td>{{ movie.genre }}</td>
              <td>{{ movie.rating }}</td>
              <td>{{ movie.status }}</td>
              <td>
                <button @click="editMovie(index)" class="edit-button">Sửa</button>
                <button @click="deleteMovie(index)" class="delete-button">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const goBack = () => {
  router.go(-1);
};

const currentTab = ref('movies');
const movies = ref([
  { id: 1, title: 'Phim 1', director: 'Đạo Diễn A', genre: 'Hành Động', rating: 8.0, status: 'Công chiếu' },
  { id: 2, title: 'Phim 2', director: 'Đạo Diễn B', genre: 'Tình Cảm', rating: 7.5, status: 'Sắp ra mắt' },
]);
const movieForm = ref({
  id: null,
  title: '',
  director: '',
  genre: '',
  rating: '',
  status: '',
  editing: false,
});

const selectTab = (tab) => {
  currentTab.value = tab;
};

const submitMovie = () => {
  if (movieForm.value.editing) {
    const index = movies.value.findIndex((movie) => movie.id === movieForm.value.id);
    if (index !== -1) {
      movies.value[index] = { ...movieForm.value };
    }
  } else {
    movieForm.value.id = Date.now();
    movies.value.push({ ...movieForm.value });
  }
  resetForm();
};

const editMovie = (index) => {
  Object.assign(movieForm.value, movies.value[index], { editing: true });
};

const deleteMovie = (index) => {
  movies.value.splice(index, 1);
};

const resetForm = () => {
  Object.assign(movieForm.value, { id: null, title: '', director: '', genre: '', rating: '', status: '', editing: false });
};
</script>

<style scoped>
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

body {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #74ebd5, #acb6e5);
  margin: 0;
  padding: 0;
}

.movie-management {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h1 {
  text-align: center;
  color: #34495e;
  font-size: 24px;
  margin-bottom: 20px;
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;
}

.tabs button.active {
  background: #2ecc71;
}

.tabs button:hover {
  background: #2980b9;
}

.tab-content {
  animation: fadeIn 0.5s ease-in-out;
}

.movie-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s;
}

input:focus,
select:focus {
  border-color: #3498db;
  outline: none;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 10px;
  background: #2ecc71;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.submit-button:hover {
  background: #27ae60;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.edit-button {
  background: #f1c40f;
  border: none;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
}

.edit-button:hover {
  background: #f39c12;
}

.delete-button {
  background: #e74c3c;
  border: none;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background: #c0392b;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
