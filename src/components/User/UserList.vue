<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import type { User } from "@/types/auth";

const authStore = useAuthStore();
const users = ref<User[]>([]);

onMounted(async () => {
  try {
    users.value = await authStore.fetchUsers();
    console.log("Users", users.value);
  } catch (error) {
    // Error handled by store
  }
});
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 shadow-md mx-auto p-8 rounded-lg max-w-4xl"
  >
    <h2 class="mb-6 font-bold text-gray-800 dark:text-gray-100 text-2xl">
      Users
    </h2>

    <div
      v-if="authStore.error"
      class="bg-red-50 dark:bg-red-200/10 mb-4 p-4 rounded-md"
    >
      <p class="text-red-800 dark:text-red-400 text-sm">
        {{ authStore.error }}
      </p>
    </div>

    <div v-if="authStore.isLoading" class="flex justify-center py-8">
      <div
        class="border-4 border-indigo-500 border-t-transparent rounded-full w-8 h-8 animate-spin"
      ></div>
    </div>

    <div
      v-else
      class="ring-opacity-5 shadow sm:rounded-lg ring-1 ring-black overflow-hidden"
    >
      <table class="divide-y divide-gray-300 dark:divide-gray-700 min-w-full">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th
              scope="col"
              class="py-3.5 pr-3 pl-4 sm:pl-6 font-semibold text-gray-900 dark:text-gray-100 text-sm text-left"
            >
              Name
            </th>
            <th
              scope="col"
              class="px-3 py-3.5 font-semibold text-gray-900 dark:text-gray-100 text-sm text-left"
            >
              Email
            </th>
            <th
              scope="col"
              class="px-3 py-3.5 font-semibold text-gray-900 dark:text-gray-100 text-sm text-left"
            >
              Joined
            </th>
          </tr>
        </thead>
        <tbody
          class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
        >
          <tr v-for="user in users" :key="user.id">
            <td
              class="py-4 pr-3 pl-4 sm:pl-6 font-medium text-gray-900 dark:text-gray-100 text-sm whitespace-nowrap"
            >
              {{ user.firstName }} {{ user.lastName }}
            </td>
            <td
              class="px-3 py-4 text-gray-500 dark:text-gray-300 text-sm whitespace-nowrap"
            >
              {{ user.email }}
            </td>
            <td
              class="px-3 py-4 text-gray-500 dark:text-gray-300 text-sm whitespace-nowrap"
            >
              {{ new Date(user.createdAt).toLocaleDateString() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
