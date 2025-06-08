<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import type { RegisterData } from "@/types/auth";

const authStore = useAuthStore();
const router = useRouter();

const formData = ref<RegisterData>({
  email: "",
  username: "",
  password: "",
});

const handleSubmit = async () => {
  try {
    await authStore.register(formData.value);
    router.push("/");
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
      Create a new account
    </h2>

    <div
      v-if="authStore.error"
      class="bg-red-50 dark:bg-red-200/10 mb-4 p-4 rounded-md"
    >
      <p class="text-red-800 dark:text-red-400 text-sm">
        {{ authStore.error }}
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
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
          class="block bg-white dark:bg-gray-900 shadow-sm mt-1 border-gray-300 focus:border-indigo-500 dark:border-gray-600 rounded-md focus:ring-indigo-500 w-full text-gray-900 dark:text-gray-100 sm:text-sm"
        />
      </div>

      <div>
        <label
          for="username"
          class="block font-medium text-gray-700 dark:text-gray-200 text-sm"
          >Username</label
        >
        <input
          v-model="formData.username"
          id="username"
          name="username"
          type="text"
          required
          minlength="3"
          class="block bg-white dark:bg-gray-900 shadow-sm mt-1 border-gray-300 focus:border-indigo-500 dark:border-gray-600 rounded-md focus:ring-indigo-500 w-full text-gray-900 dark:text-gray-100 sm:text-sm"
        />
      </div>

      <div>
        <label
          for="password"
          class="block font-medium text-gray-700 dark:text-gray-200 text-sm"
          >Password</label
        >
        <input
          v-model="formData.password"
          id="password"
          name="password"
          type="password"
          required
          minlength="6"
          class="block bg-white dark:bg-gray-900 shadow-sm mt-1 border-gray-300 focus:border-indigo-500 dark:border-gray-600 rounded-md focus:ring-indigo-500 w-full text-gray-900 dark:text-gray-100 sm:text-sm"
        />
      </div>

      <div>
        <button
          type="submit"
          :disabled="authStore.isLoading"
          class="flex justify-center bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 shadow-sm px-4 py-2 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 w-full font-medium text-white text-sm"
        >
          <span v-if="authStore.isLoading">Registering...</span>
          <span v-else>Register</span>
        </button>
      </div>
    </form>

    <div class="mt-6 text-gray-600 dark:text-gray-400 text-sm text-center">
      Already have an account?
      <router-link
        to="/login"
        class="font-medium text-indigo-600 hover:text-indigo-500 dark:hover:text-indigo-300 dark:text-indigo-400"
      >
        Login here
      </router-link>
    </div>
  </div>
</template>
