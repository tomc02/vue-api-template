<script setup lang="ts">
import RegisterForm from "@/components/Auth/RegisterForm.vue";
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
        Create a new account
      </h2>
    </div>

    <RegisterForm class="mt-8" />
  </div>
</template>
