<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";

const authStore = useAuthStore();
const isDark = ref(localStorage.getItem("theme") === "dark");

onMounted(async () => {
  console.log("App mounted, checking auth state", authStore.token);
  if (authStore.token) {
    await authStore.fetchProfile();
  }
});

</script>

<template>
  <div
    class="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100"
  >
    <Navbar :isDark="isDark" @toggleDark="isDark = !isDark" />
    <main class="mx-auto px-4 py-8 container">
      <RouterView />
    </main>
  </div>
</template>
