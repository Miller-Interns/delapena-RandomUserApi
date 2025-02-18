<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import UserCard from '../components/UserCard.vue';
import UserModal from '../components/UserModal.vue';
import { useUserStore } from '../stores/user-store';
import { useUserApi } from '../composables/user-api';
import { User } from '../types/user-types';

const userStore = useUserStore();
const { users, loading, fetchUsers } = useUserApi();

const selectedGender = ref(userStore.genderFilter);
const currentPage = ref(userStore.currentPage);
const usersPerPage = ref(userStore.usersPerPage);

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * usersPerPage.value;
  const end = start + usersPerPage.value;
  return userStore.filteredUsers.slice(start, end);
});

const totalPages = computed(() => {
  return 10;
});

const filterByGender = () => {
  userStore.setGenderFilter(selectedGender.value);
  currentPage.value = 1;
  refreshList();
};

const refreshList = async () => {
  await fetchUsers(
    120,
    selectedGender.value === 'all' ? '' : selectedGender.value
  );
  userStore.setUsers(users.value);
};

const selectedUser = ref<User | null>(null);
const isModalVisible = ref(false);

const openModal = (user: User) => {
  selectedUser.value = user;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
  selectedUser.value = null;
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

onMounted(async () => {
  if (userStore.users.length === 0) {
    await refreshList();
  }
});

watch([selectedGender, currentPage], () => {
  userStore.setCurrentPage(currentPage.value);
  userStore.setGenderFilter(selectedGender.value);
});
</script>

<template>
  <div class="home-view">
    <div class="header">
      <h1>Random User List</h1>
      <p class="subheading"></p>
    </div>

    <div class="filter-container">
      <label for="gender">Filter by Gender:</label>
      <select
        id="gender"
        v-model="selectedGender"
        @change="filterByGender"
        class="custom-select"
      >
        <option value="all">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <button @click="refreshList" class="refresh-btn">Refresh List</button>
    </div>

    <div v-if="loading" class="loading">Loading...</div>

    <div v-else class="users">
      <div
        v-for="(user, index) in paginatedUsers"
        :key="index"
        class="user-card-wrapper"
        @click="openModal(user)"
      >
        <UserCard :user="user" />
      </div>

      <div class="pagination">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="page-btn"
        >
          Previous
        </button>
        <span class="page-info"
          >Page {{ currentPage }} of {{ totalPages }}</span
        >
        <button
          @click="nextPage"
          :disabled="currentPage >= totalPages"
          class="page-btn"
        >
          Next
        </button>
      </div>
    </div>

    <UserModal
      :user="selectedUser"
      :isVisible="isModalVisible"
      @close="closeModal"
    />
  </div>
</template>

<style scoped>
.home-view {
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  height: 100vh;
  overflow-y: auto;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #343a40;
}

.subheading {
  font-size: 1.2rem;
  color: #6c757d;
  margin-top: 5px;
}

.filter-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 900px;
}

.filter-container label {
  font-size: 1rem;
  color: #495057;
}

.custom-select {
  padding: 8px 15px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ced4da;
}

.refresh-btn {
  padding: 12px 25px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.refresh-btn:hover {
  background-color: #218838;
}

.users {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}

.user-card-wrapper {
  display: flex;
  justify-content: center;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.page-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.page-btn:hover {
  background-color: #0056b3;
}

.page-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.page-info {
  font-size: 1rem;
  color: #495057;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .filter-container {
    flex-direction: column;
    gap: 10px;
  }

  .page-btn {
    font-size: 0.9rem;
  }
}
</style>
