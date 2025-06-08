<script setup lang="ts">
import LoginForm from "@/components/Auth/LoginForm.vue";
</script>

<template>
  <div
    class="flex flex-col flex-1 justify-center sm:px-6 lg:px-8 py-12 min-h-full"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h1 class="font-bold text-gray-900 text-3xl text-center tracking-tight">
        AuthApp
      </h1>
      <h2 class="mt-6 font-semibold text-gray-600 text-xl text-center">
        Sign in to your account
      </h2>
    </div>

    <LoginForm class="mt-8" />
  </div>
</template>
