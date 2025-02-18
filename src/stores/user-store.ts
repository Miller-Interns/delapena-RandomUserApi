import { defineStore } from 'pinia';
import type { User } from '../types/user-types';

interface UserState {
  users: User[];
  genderFilter: string;
  currentPage: number;
  usersPerPage: number;
}

export const useUserStore = defineStore('userStore', {
  state: (): UserState => ({
    users: [],
    genderFilter: 'all',
    currentPage: 1,
    usersPerPage: 12,
  }),

  getters: {
    filteredUsers(state): User[] {
      if (state.genderFilter === 'all') return state.users;
      return state.users.filter((User) => User.gender === state.genderFilter);
    },

    totalPages(): number {
      return Math.ceil(this.filteredUsers.length / this.usersPerPage) || 1;
    },

    totalUsers(): number {
      return this.filteredUsers.length;
    },
  },

  actions: {
    setUsers(users: User[]) {
      this.users = users;
    },

    setGenderFilter(gender: string) {
      this.genderFilter = gender;
    },

    setCurrentPage(page: number) {
      this.currentPage = page;
    },
  },
});
