<script setup lang="ts">
import type { User } from '../types/user-types';
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ user: User }>();
const emit = defineEmits<{
  (event: 'click', user: User): void;
}>();

const handleClick = () => {
  emit('click', props.user);
};
</script>

<template>
  <div class="user-card" @click="handleClick">
    <img
      :src="props.user.picture.large"
      :alt="`${props.user.name.first} ${props.user.name.last}`"
      class="user-image"
    />
    <div class="user-info">
      <h3 class="user-name">
        {{ props.user.name.first }} {{ props.user.name.last }}
      </h3>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  margin: 15px 0;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.user-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
  object-fit: cover;
  border: 2px solid #007bff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.user-name {
  font-size: 1.4rem;
  font-weight: 600;
  color: #343a40;
  text-transform: capitalize;
  margin: 0;
  text-align: left;
  padding-left: 10px;
  font-family: 'Arial', sans-serif;
}
</style>
