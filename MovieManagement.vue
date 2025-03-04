<template>
    <div>
        <button @click="goBack" class="back-button">← Quay lại</button>
  <div class="movie-management">
    <h1>Quản lý phim</h1>
    <form @submit.prevent="submitForm" class="movie-form">
      <div class="form-group">
        <label for="name">Tên phim</label>
        <input type="text" id="name" v-model="movie.name" />
      </div>
      <div class="form-group">
        <label for="genre">Thể loại</label>
        <input type="text" id="genre" v-model="movie.genre" />
      </div>
      <div class="form-group">
        <label for="status">Trạng thái</label>
        <input type="text" id="status" v-model="movie.status" />
      </div>
      <div class="form-group">
        <label for="releaseDate">Ngày phát hành</label>
        <input type="date" id="releaseDate" v-model="movie.releaseDate" />
      </div>
      <button type="submit" class="submit-button">{{ isEditing ? 'Cập nhật' : 'Thêm' }}</button>
      <button type="button" @click="cancelEdit" v-if="isEditing" class="cancel-button">Hủy</button>
    </form>

    <table class="movie-list">
      <thead>
        <tr>
          <th>Tên</th>
          <th>Thể loại</th>
          <th>Trạng thái</th>
          <th>Ngày phát hành</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(movie, index) in movies" :key="index">
          <td>{{ movie.name }}</td>
          <td>{{ movie.genre }}</td>
          <td>{{ movie.status }}</td>
          <td>{{ movie.releaseDate }}</td>
          <td>
            <button @click="editMovie(index)" class="edit-button">Sửa</button>
            <button @click="deleteMovie(index)" class="delete-button">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const movies = ref([
  { name: 'Phim 1', genre: 'Thể loại 1', status: 'Đang chiếu', releaseDate: '2023-01-01' },
  { name: 'Phim 2', genre: 'Thể loại 2', status: 'Sắp chiếu', releaseDate: '2023-02-01' },
]);

const movie = ref({ name: '', genre: '', status: '', releaseDate: '' });
const isEditing = ref(false);
const editingIndex = ref(null);

const submitForm = () => {
  if (isEditing.value) {
    movies.value.splice(editingIndex.value, 1, { ...movie.value });
    isEditing.value = false;
    editingIndex.value = null;
  } else {
    movies.value.push({ ...movie.value });
  }
  resetForm();
};

const resetForm = () => {
  movie.value = { name: '', genre: '', status: '', releaseDate: '' };
};

const editMovie = (index) => {
  movie.value = { ...movies.value[index] };
  isEditing.value = true;
  editingIndex.value = index;
};

const cancelEdit = () => {
  resetForm();
  isEditing.value = false;
  editingIndex.value = null;
};

const deleteMovie = (index) => {
  movies.value.splice(index, 1);
};
const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
.movie-management {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  animation: fadeIn 1s ease-in-out;
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

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 30px;
  font-weight: bold;
}

.movie-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
  animation: slideIn 1s ease-in-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"], input[type="date"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: all 0.3s ease;
}

input[type="text"]:focus, input[type="date"]:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
}

.submit-button, .cancel-button {
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

.submit-button {
  background-color: #4CAF50;
}

.submit-button:hover {
  background-color: #45a049;
}

.cancel-button {
  background-color: #E74C3C;
  margin-top: 10px;
}

.cancel-button:hover {
  background-color: #C0392B;
}

.movie-list {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  animation: fadeIn 1s ease-in-out;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
}

tr:hover {
  background-color: #f1f1f1;
  transition: background-color 0.3s ease;
}

.edit-button, .delete-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.edit-button {
  background-color: #3498DB;
  color: white;
}

.edit-button:hover {
  background-color: #2980B9;
}

.delete-button {
  background-color: #E74C3C;
  color: white;
}

.delete-button:hover {
  background-color: #C0392B;
}
</style>
