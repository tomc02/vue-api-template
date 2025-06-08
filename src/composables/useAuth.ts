import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth"; // Adjust the path as needed
import type { LoginData, RegisterData, UpdateProfileData } from "@/types/auth";

export default function useAuth() {
  const authStore = useAuthStore();
  const router = useRouter();

  const error = computed(() => authStore.error);
  const isLoading = computed(() => authStore.isLoading);
  const success = computed(() => authStore.success);

  const login = async (credentials: LoginData): Promise<void> => {
    try {
      await authStore.login(credentials);
      router.push("/profile");
    } catch (err: any) {
      // error is handled in store
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    try {
      await authStore.register(userData);
      router.push("/profile");
    } catch (err: any) {
      // error is handled in store
    }
  };

  const updateProfile = async (userData: UpdateProfileData): Promise<void> => {
    try {
      await authStore.updateProfile(userData);
    } catch (err: any) {
      // error is handled in store
    }
  };

  return {
    error,
    success,
    isLoading,
    login,
    register,
    updateProfile,
  };
}
