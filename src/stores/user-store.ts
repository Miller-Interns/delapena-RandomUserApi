import { defineStore } from 'pinia';
import type { User } from '../types/user-types';
import { GenderFilter } from '../enums/user-gender';

interface UserState {
  users: User[];
  genderFilter: GenderFilter;
  currentPage: number;
  usersPerPage: number;
}

export const useUserStore = defineStore('userStore', {
  state: (): UserState => ({
    users: [],
    genderFilter: GenderFilter.All,
    currentPage: 1,
    usersPerPage: 12,
  }),

  getters: {
    filteredUsers(state): User[] {
      if (state.genderFilter === GenderFilter.All) return state.users;
      return state.users.filter((user) => user.gender === state.genderFilter);
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

    setGenderFilter(gender: GenderFilter) {
      this.genderFilter = gender;
    },

    setCurrentPage(page: number) {
      this.currentPage = page;
    },
  },
});
