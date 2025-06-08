<script setup lang="ts">
import ProfileForm from "@/components/User/ProfileForm.vue";
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
  <div>
    <h1 class="mb-8 font-bold text-gray-900 text-3xl">Your Profile</h1>
    <ProfileForm />
  </div>
</template>
