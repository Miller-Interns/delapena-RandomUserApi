<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import type { User } from '../types/user-types';

const props = defineProps<{
  user: User | null;
  isVisible: boolean;
}>();

const emit = defineEmits<{
  (event: 'close'): void;
}>();

const userLocation = computed(() => {
  if (props.user) {
    const { street, city, state, country } = props.user.location;
    return `${street.number} ${street.name}, ${city}, ${state}, ${country}`;
  }
  return '';
});

const closeModal = () => {
  emit('close');
};
</script>

<template>
  <div v-if="props.isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="closeModal">X</button>
      <h2>{{ props.user?.name.first }} {{ props.user?.name.last }}</h2>
      <img
        v-if="props.user"
        :src="props.user.picture.large"
        :alt="props.user?.name.first"
      />
      <p v-if="props.user"><strong>Email:</strong> {{ props.user.email }}</p>
      <p v-if="props.user"><strong>Gender:</strong> {{ props.user.gender }}</p>
      <p v-if="props.user"><strong>Location:</strong> {{ userLocation }}</p>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

img {
  max-width: 100%;
  border-radius: 50%;
  margin-bottom: 15px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
