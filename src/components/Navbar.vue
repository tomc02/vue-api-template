<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { computed } from "vue";
import { useRoute } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const isActive = (path: string) => computed(() => route.path === path);
const mobileMenuOpen = ref(false);
const isDark = ref(false);

const logout = () => {
  authStore.logout();
  router.push("/login");
};

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("dark", isDark.value);
  localStorage.setItem("dark-mode", isDark.value ? "true" : "false");
};

onMounted(() => {
  const saved = localStorage.getItem("dark-mode");
  console.log("Saved dark mode preference:", saved);
  if (saved !== null) {
    isDark.value = saved == "true";
    document.documentElement.classList.toggle("dark", isDark.value);
  } else {
    // fallback, detect from system preference or document class
    isDark.value = document.documentElement.classList.contains("dark");
  }
});
</script>

<template>
  <nav
    class="bg-white dark:bg-gray-900 shadow-sm dark:border-gray-700 dark:border-b"
  >
    <div class="mx-auto px-4 container">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <router-link
            to="/"
            class="font-bold text-indigo-600 dark:text-indigo-400 text-xl"
            >AuthApp</router-link
          >
          <div class="hidden sm:flex sm:space-x-8 sm:ml-6">
            <router-link
              to="/"
              :class="[
                'inline-flex items-center px-1 pt-1 border-b-2 font-medium text-sm',
                isActive('/').value
                  ? 'border-indigo-500 text-gray-900 dark:text-white'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-300',
              ]"
            >
              Home
            </router-link>

            <router-link
              v-if="authStore.isAuthenticated"
              to="/profile"
              :class="[
                'inline-flex items-center px-1 pt-1 border-b-2 font-medium text-sm',
                isActive('/profile').value
                  ? 'border-indigo-500 text-gray-900 dark:text-white'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-300',
              ]"
            >
              Profile
            </router-link>

            <router-link
              v-if="authStore.isAuthenticated"
              to="/users"
              :class="[
                'inline-flex items-center px-1 pt-1 border-b-2 font-medium text-sm',
                isActive('/users').value
                  ? 'border-indigo-500 text-gray-900 dark:text-white'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-300',
              ]"
            >
              Users
            </router-link>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <button
            @click="toggleDarkMode"
            class="inline-flex relative items-center bg-gray-300 dark:bg-gray-600 rounded-full w-11 h-6 transition"
          >
            <span
              :class="[
                'inline-block h-4 w-4 transform rounded-full bg-white transition',
                isDark ? 'translate-x-6' : 'translate-x-1',
              ]"
            />
          </button>

          <div class="hidden sm:flex sm:items-center">
            <div
              v-if="authStore.isAuthenticated"
              class="flex items-center space-x-4"
            >
              <span class="text-gray-500 dark:text-gray-300 text-sm"
                >Hi, {{ authStore.user?.firstName }}</span
              >
              <button
                @click="logout"
                class="bg-indigo-600 hover:bg-indigo-700 shadow-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium text-white text-sm"
              >
                Logout
              </button>
            </div>
            <div v-else class="flex items-center space-x-4">
              <router-link
                to="/login"
                class="px-3 py-2 rounded-md font-medium text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-300 text-sm"
                >Login</router-link
              >
              <router-link
                to="/register"
                class="bg-indigo-600 hover:bg-indigo-700 shadow-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium text-white text-sm"
                >Register</router-link
              >
            </div>
          </div>

          <div class="sm:hidden flex items-center -mr-2">
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="inline-flex justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset text-gray-400 hover:text-gray-500 dark:hover:text-white"
            >
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!mobileMenuOpen" class="block w-6 h-6" />
              <XMarkIcon v-else class="block w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      v-if="mobileMenuOpen"
      class="sm:hidden dark:bg-gray-900 dark:text-white"
    >
      <div class="space-y-1 pt-2 pb-3">
        <router-link
          to="/"
          :class="[
            'block py-2 pr-4 pl-3 border-l-4 font-medium text-base',
            isActive('/').value
              ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-500 text-indigo-700 dark:text-indigo-400'
              : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-300',
          ]"
        >
          Home
        </router-link>
        <router-link
          v-if="authStore.isAuthenticated"
          to="/profile"
          :class="[
            'block py-2 pr-4 pl-3 border-l-4 font-medium text-base',
            isActive('/profile').value
              ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-500 text-indigo-700 dark:text-indigo-400'
              : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-300',
          ]"
          >Profile</router-link
        >
        <router-link
          v-if="authStore.isAuthenticated"
          to="/users"
          :class="[
            'block py-2 pr-4 pl-3 border-l-4 font-medium text-base',
            isActive('/users').value
              ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-500 text-indigo-700 dark:text-indigo-400'
              : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-300',
          ]"
          >Users</router-link
        >
      </div>
      <div
        v-if="authStore.isAuthenticated"
        class="pt-4 pb-3 border-gray-200 dark:border-gray-700 border-t"
      >
        <div class="flex items-center px-4">
          <div class="ml-3">
            <div class="font-medium text-gray-800 dark:text-white text-base">
              {{ authStore.user?.firstName }} {{ authStore.user?.lastName }}
            </div>
            <div class="font-medium text-gray-500 dark:text-gray-400 text-sm">
              {{ authStore.user?.email }}
            </div>
          </div>
        </div>
        <div class="space-y-1 mt-3">
          <button
            @click="logout"
            class="block hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 w-full font-medium text-gray-500 hover:text-gray-800 dark:hover:text-white dark:text-gray-300 text-base text-left"
          >
            Logout
          </button>
        </div>
      </div>
      <div
        v-else
        class="pt-4 pb-3 border-gray-200 dark:border-gray-700 border-t"
      >
        <div class="space-y-1">
          <router-link
            to="/login"
            class="block hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 w-full font-medium text-gray-500 hover:text-gray-800 dark:hover:text-white dark:text-gray-300 text-base text-left"
            >Login</router-link
          >
          <router-link
            to="/register"
            class="block hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 w-full font-medium text-gray-500 hover:text-gray-800 dark:hover:text-white dark:text-gray-300 text-base text-left"
            >Register</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>
