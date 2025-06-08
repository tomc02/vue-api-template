<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import type { UpdateProfileData } from "@/types/auth";

const authStore = useAuthStore();

const formData = ref<UpdateProfileData>({
  firstName: "",
  lastName: "",
  email: "",
});

onMounted(async () => {
  !authStore.user && await authStore.fetchProfile();
  if (authStore.user) {
    formData.value = {
      firstName: authStore.user.firstName,
      lastName: authStore.user.lastName,
      email: authStore.user.email,
    };
  }
});

const handleSubmit = async () => {
  try {
    await authStore.updateProfile(formData.value);
  } catch (error) {
    // Error handled by store
  }
};
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 shadow-md mx-auto p-8 rounded-lg max-w-md"
  >
    <h2 class="mb-6 font-bold text-gray-800 dark:text-gray-100 text-2xl">
      Update your profile
    </h2>

    <div
      v-if="authStore.error"
      class="bg-red-50 dark:bg-red-200/20 mb-4 p-4 rounded-md"
    >
      <p class="text-red-800 dark:text-red-400 text-sm">
        {{ authStore.error }}
      </p>
    </div>

    <div
      v-if="authStore.success"
      class="bg-green-50 dark:bg-green-200/20 mb-6 p-4 rounded-md"
    >
      <p class="text-green-800 dark:text-green-400 text-sm">
        {{ authStore.success }}
      </p>
    </div>

    <div v-if="authStore.isLoading" class="flex justify-center py-8">
      <div
        class="border-4 border-indigo-500 border-t-transparent rounded-full w-8 h-8 animate-spin"
      ></div>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label
          for="firstName"
          class="block font-medium text-gray-700 dark:text-gray-200 text-sm"
          >First Name</label
        >
        <input
          v-model="formData.firstName"
          id="firstName"
          name="firstName"
          type="text"
          required
          minlength="1"
          class="block dark:bg-gray-900 shadow-sm mt-1 p-2 border-gray-300 focus:border-indigo-500 dark:border-gray-600 rounded-md focus:ring-indigo-500 w-full dark:text-white sm:text-sm"
        />
      </div>

      <div>
        <label
          for="lastName"
          class="block font-medium text-gray-700 dark:text-gray-200 text-sm"
          >Last Name</label
        >
        <input
          v-model="formData.lastName"
          id="lastName"
          name="lastName"
          type="text"
          required
          minlength="1"
          class="block dark:bg-gray-900 shadow-sm mt-1 p-2 border-gray-300 focus:border-indigo-500 dark:border-gray-600 rounded-md focus:ring-indigo-500 w-full dark:text-white sm:text-sm"
        />
      </div>

      <div>
        <label
          for="email"
          class="block font-medium text-gray-700 dark:text-gray-200 text-sm"
          >Email address</label
        >
        <input
          v-model="formData.email"
          id="email"
          name="email"
          type="email"
          required
          class="block dark:bg-gray-900 shadow-sm mt-1 p-2 border-gray-300 focus:border-indigo-500 dark:border-gray-600 rounded-md focus:ring-indigo-500 w-full dark:text-white sm:text-sm"
        />
      </div>

      <div>
        <button
          type="submit"
          :disabled="authStore.isLoading"
          class="flex justify-center bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 shadow-sm px-4 py-2 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full font-medium text-white text-sm"
        >
          <span v-if="authStore.isLoading">Updating...</span>
          <span v-else>Update Profile</span>
        </button>
      </div>
    </form>
  </div>
</template>
