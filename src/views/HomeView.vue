<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { onMounted } from "vue";

const authStore = useAuthStore();

onMounted(() => {
  if (!authStore.user && authStore.token) {
    authStore.fetchProfile();
  }
});
</script>

<template>
  <div class="bg-white dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-12 text-center">
    <h1
      class="font-bold text-gray-900 dark:text-white text-4xl sm:text-5xl md:text-6xl tracking-tight"
    >
      <span class="block">Welcome to</span>
      <span class="block text-indigo-600 dark:text-indigo-400">AuthApp</span>
    </h1>

    <div v-if="authStore.isAuthenticated" class="mt-8">
      <p class="text-gray-600 dark:text-gray-300 text-lg">
        Welcome back, {{ authStore.user?.firstName }}
        {{ authStore.user?.lastName }}!
      </p>
      <div class="flex justify-center space-x-4 mt-6">
        <router-link
          to="/profile"
          class="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 shadow-sm px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium text-white text-sm"
        >
          View Profile
        </router-link>
        <router-link
          to="/users"
          class="inline-flex items-center bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium text-indigo-600 dark:text-indigo-400 text-sm"
        >
          View Users
        </router-link>
      </div>
    </div>

    <div v-else class="mt-8">
      <p class="text-gray-600 dark:text-gray-300 text-lg">
        Please login or register to access all features
      </p>
      <div class="flex justify-center space-x-4 mt-6">
        <router-link
          to="/login"
          class="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 shadow-sm px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium text-white text-sm"
        >
          Login
        </router-link>
        <router-link
          to="/register"
          class="inline-flex items-center bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium text-indigo-600 dark:text-indigo-400 text-sm"
        >
          Register
        </router-link>
      </div>
    </div>
  </div>
</template>
