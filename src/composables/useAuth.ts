import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

interface Credentials {
  email: string;
  password: string;
  [key: string]: any;
}

interface UserData {
  name?: string;
  email?: string;
  password?: string;
  [key: string]: any;
}

export default function useAuth() {
  const store = useStore();
  const router = useRouter();

  const error = ref<string | null>(null);
  const isLoading = ref<boolean>(false);

  const login = async (credentials: Credentials): Promise<void> => {
    try {
      isLoading.value = true;
      error.value = null;
      await store.dispatch("login", credentials);
      router.push("/profile");
    } catch (err: any) {
      error.value = err?.message || "Login failed";
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (userData: UserData): Promise<void> => {
    try {
      isLoading.value = true;
      error.value = null;
      await store.dispatch("register", userData);
      router.push("/profile");
    } catch (err: any) {
      error.value = err?.message || "Registration failed";
    } finally {
      isLoading.value = false;
    }
  };

  const updateProfile = async (userData: UserData): Promise<void> => {
    try {
      isLoading.value = true;
      error.value = null;
      await store.dispatch("updateProfile", userData);
    } catch (err: any) {
      error.value = err?.message || "Update failed";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    error,
    isLoading,
    login,
    register,
    updateProfile,
  };
}
