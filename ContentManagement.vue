<template>
  <div class="content-management">
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
            <input type="number" v-model="movieForm.rating" placeholder="Nhập rating..." min="0" max="10" step="0.1" required />
          </div>
          <div class="form-group">
            <label>Trạng thái:</label>
            <select v-model="movieForm.status" required>
              <option value="Công chiếu">Công chiếu</option>
              <option value="Sắp ra mắt">Sắp ra mắt</option>
            </select>
          </div>
          <button type="submit" class="submit-button">{{ movieForm.editing ? 'Cập nhật' : 'Thêm Phim Lẻ' }}</button>
        </form>
        <div class="table-container">
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
              <tr v-for="(movie, index) in movieList" :key="movie.id">
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

      <!-- Quản lý phim bộ -->
      <div v-if="currentTab === 'series'" class="tab-content">
        <h2>Quản lý Phim Bộ</h2>
        <form @submit.prevent="submitSeries" class="movie-form">
          <div class="form-group">
            <label>Tiêu đề:</label>
            <input type="text" v-model="seriesForm.title" placeholder="Nhập tiêu đề..." required />
          </div>
          <div class="form-group">
            <label>Đạo diễn:</label>
            <input type="text" v-model="seriesForm.director" placeholder="Nhập đạo diễn..." required />
          </div>
          <div class="form-group">
            <label>Thể loại:</label>
            <input type="text" v-model="seriesForm.genre" placeholder="Nhập thể loại..." required />
          </div>
          <div class="form-group">
            <label>Rating:</label>
            <input type="number" v-model="seriesForm.rating" placeholder="Nhập rating..." min="0" max="10" step="0.1" required />
          </div>
          <div class="form-group">
            <label>Trạng thái:</label>
            <select v-model="seriesForm.status" required>
              <option value="Đang phát sóng">Đang phát sóng</option>
              <option value="Hoàn tất">Hoàn tất</option>
            </select>
          </div>
          <button type="submit" class="submit-button">{{ seriesForm.editing ? 'Cập nhật' : 'Thêm Phim Bộ' }}</button>
        </form>
        <div class="table-container">
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
              <tr v-for="(series, index) in seriesList" :key="series.id">
                <td>{{ series.id }}</td>
                <td>{{ series.title }}</td>
                <td>{{ series.director }}</td>
                <td>{{ series.genre }}</td>
                <td>{{ series.rating }}</td>
                <td>{{ series.status }}</td>
                <td>
                  <button @click="editSeries(index)" class="edit-button">Sửa</button>
                  <button @click="deleteSeries(index)" class="delete-button">Xóa</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Quản lý tập phim -->
      <div v-if="currentTab === 'episodes'" class="tab-content">
        <h2>Quản lý Tập Phim</h2>
        <form @submit.prevent="submitEpisode" class="episode-form">
          <div class="form-group">
            <label>Chọn Phim Bộ:</label>
            <select v-model="episodeForm.seriesId" required>
              <option v-for="series in seriesList" :key="series.id" :value="series.id">{{ series.title }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Tiêu đề Tập:</label>
            <input type="text" v-model="episodeForm.title" placeholder="Nhập tiêu đề tập..." required />
          </div>
          <div class="form-group">
            <label>Số Tập:</label>
            <input type="number" v-model="episodeForm.episodeNumber" placeholder="Nhập số tập..." required />
          </div>
          <div class="form-group">
            <label>Trạng thái:</label>
            <select v-model="episodeForm.status" required>
              <option value="Chưa phát sóng">Chưa phát sóng</option>
              <option value="Đã phát sóng">Đã phát sóng</option>
            </select>
          </div>
          <button type="submit" class="submit-button">{{ episodeForm.editing ? 'Cập nhật' : 'Thêm Tập Phim' }}</button>
        </form>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Phim Bộ</th>
                <th>Tiêu đề Tập</th>
                <th>Số Tập</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(episode, index) in episodesList" :key="episode.id">
                <td>{{ episode.id }}</td>
                <td>{{ getSeriesTitle(episode.seriesId) }}</td>
                <td>{{ episode.title }}</td>
                <td>{{ episode.episodeNumber }}</td>
                <td>{{ episode.status }}</td>
                <td>
                  <button @click="editEpisode(index)" class="edit-button">Sửa</button>
                  <button @click="deleteEpisode(index)" class="delete-button">Xóa</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 'movies',
      movieForm: {
        title: '',
        director: '',
        genre: '',
        rating: '',
        status: 'Công chiếu',
        editing: false,
        id: null,
      },
      seriesForm: {
        title: '',
        director: '',
        genre: '',
        rating: '',
        status: 'Đang phát sóng',
        editing: false,
        id: null,
      },
      episodeForm: {
        seriesId: null,
        title: '',
        episodeNumber: '',
        status: 'Chưa phát sóng',
        editing: false,
        id: null,
      },
      movieList: [],
      seriesList: [],
      episodesList: [],
    };
  },
  methods: {
    selectTab(tab) {
      this.currentTab = tab;
    },
    submitMovie() {
      if (this.movieForm.editing) {
        const movieIndex = this.movieList.findIndex(
          (movie) => movie.id === this.movieForm.id
        );
        this.$set(this.movieList, movieIndex, { ...this.movieForm });
      } else {
        this.movieForm.id = this.movieList.length + 1;
        this.movieList.push({ ...this.movieForm });
      }
      this.resetMovieForm();
    },
    resetMovieForm() {
      this.movieForm = {
        title: '',
        director: '',
        genre: '',
        rating: '',
        status: 'Công chiếu',
        editing: false,
        id: null,
      };
    },
    editMovie(index) {
      this.movieForm = { ...this.movieList[index], editing: true };
    },
    deleteMovie(index) {
      this.movieList.splice(index, 1);
    },
    submitSeries() {
      if (this.seriesForm.editing) {
        const seriesIndex = this.seriesList.findIndex(
          (series) => series.id === this.seriesForm.id
        );
        this.$set(this.seriesList, seriesIndex, { ...this.seriesForm });
      } else {
        this.seriesForm.id = this.seriesList.length + 1;
        this.seriesList.push({ ...this.seriesForm });
      }
      this.resetSeriesForm();
    },
    resetSeriesForm() {
      this.seriesForm = {
        title: '',
        director: '',
        genre: '',
        rating: '',
        status: 'Đang phát sóng',
        editing: false,
        id: null,
      };
    },
    editSeries(index) {
      this.seriesForm = { ...this.seriesList[index], editing: true };
    },
    deleteSeries(index) {
      this.seriesList.splice(index, 1);
    },
    submitEpisode() {
      if (this.episodeForm.editing) {
        const episodeIndex = this.episodesList.findIndex(
          (episode) => episode.id === this.episodeForm.id
        );
        this.$set(this.episodesList, episodeIndex, { ...this.episodeForm });
      } else {
        this.episodeForm.id = this.episodesList.length + 1;
        this.episodesList.push({ ...this.episodeForm });
      }
      this.resetEpisodeForm();
    },
    resetEpisodeForm() {
      this.episodeForm = {
        seriesId: null,
        title: '',
        episodeNumber: '',
        status: 'Chưa phát sóng',
        editing: false,
        id: null,
      };
    },
    editEpisode(index) {
      this.episodeForm = { ...this.episodesList[index], editing: true };
    },
    deleteEpisode(index) {
      this.episodesList.splice(index, 1);
    },
    getSeriesTitle(seriesId) {
      const series = this.seriesList.find((s) => s.id === seriesId);
      return series ? series.title : '';
    },
    goBack() {
      // Handle go back logic
    },
  },
};
</script>

<style scoped>
.content-management {
  font-family: 'Roboto', sans-serif;
  padding: 20px;
  background-color: #f5f5f5;
}

.back-button {
  background-color: #4caf50;
  padding: 10px 15px;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #45a049;
}

.movie-management {
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.tabs {
  display: flex;
  gap: 20px;
}

.tabs button {
  padding: 12px 24px;
  font-size: 18px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.tabs button.active {
  background-color: #4caf50;
  color: white;
}

.tab-content {
  margin-top: 30px;
}

h1, h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 8px;
}

input[type='text'],
input[type='number'],
select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input[type='text']:focus,
input[type='number']:focus,
select:focus {
  border-color: #4caf50;
  outline: none;
}

.submit-button {
  background-color: #4caf50;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #45a049;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
}

.data-table th,
.data-table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
}

.data-table th {
  background-color: #f4f4f4;
}

.edit-button,
.delete-button {
  padding: 8px 16px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  margin-right: 10px;
  font-size: 16px;
}

.edit-button {
  background-color: #4caf50;
  color: white;
}

.delete-button {
  background-color: #f44336;
  color: white;
}

.edit-button:hover {
  background-color: #45a049;
}

.delete-button:hover {
  background-color: #e53935;
}
</style>
