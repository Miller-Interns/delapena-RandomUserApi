import { ref } from 'vue';

export function useUseApi() {
  const users = ref([]);
  const loading = ref(false);

  const fetchUsers = async (limit: number, gender: string) => {
    loading.value = true;
    try {
      const response = await fetch(
        `https://randomuser.me/api/?results=${limit}&gender=${gender}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      users.value = data.results;
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      loading.value = false;
    }
  };

  return { users, loading, fetchUsers };
}
