<template>
  <div class="genre-management">
    <h1>Quản lý thể loại phim</h1>
    <div class="add-genre">
      <input type="text" v-model="newGenre" placeholder="Thêm thể loại mới" />
      <button @click="addGenre" class="add-button">Thêm</button>
    </div>
    <ul class="genre-list">
      <li v-for="(genre, index) in genres" :key="index" class="genre-item">
        <span v-if="editedIndex !== index">{{ genre }}</span>
        <input v-else type="text" v-model="editedGenre" class="edit-input" />
        <div class="button-group">
          <button v-if="editedIndex !== index" @click="editGenre(index)" class="edit-button">Sửa</button>
          <button v-else @click="updateGenre(index)" class="save-button">Lưu</button>
          <button @click="deleteGenre(index)" class="delete-button">Xóa</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const genres = ref(['Thể loại 1', 'Thể loại 2']); // Thêm dữ liệu mẫu
const newGenre = ref('');
const editedGenre = ref('');
const editedIndex = ref(null);

const addGenre = () => {
  if (newGenre.value.trim() !== '') {
    genres.value.push(newGenre.value.trim());
    newGenre.value = '';
  }
};

const editGenre = (index) => {
  editedIndex.value = index;
  editedGenre.value = genres.value[index];
};

const updateGenre = (index) => {
  if (editedGenre.value.trim() !== '') {
    genres.value.splice(index, 1, editedGenre.value.trim());
    editedIndex.value = null;
    editedGenre.value = '';
  }
};

const deleteGenre = (index) => {
  genres.value.splice(index, 1);
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.genre-management {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #f0f2f5;
  font-family: 'Arial', sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 28px;
  font-weight: bold;
}

.add-genre {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
}

input[type="text"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  font-size: 16px;
  flex-grow: 1;
  transition: border-color 0.3s ease-in-out;
}

input[type="text"]:focus {
  outline: none;
  border-color: #007BFF;
}

.add-button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #0056b3;
}

.genre-list {
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
}

.genre-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.edit-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex-grow: 1;
  margin-right: 10px;
}

.button-group {
  display: flex;
  gap: 5px;
}

.edit-button, .save-button, .delete-button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease-in-out;
}

.edit-button {
  background-color: #3498DB;
  color: white;
}

.edit-button:hover {
  background-color: #2980B9;
}

.save-button {
  background-color: #2ECC71;
  color: white;
}

.save-button:hover {
  background-color: #27AE60;
}

.delete-button {
  background-color: #E74C3C;
  color: white;
}

.delete-button:hover {
  background-color: #C0392B;
}
</style>