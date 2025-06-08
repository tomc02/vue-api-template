import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import type {
  User,
  AuthResponse,
  LoginData,
  RegisterData,
  UpdateProfileData,
} from "@/types/auth";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem("token"));
  const isAuthenticated = ref<boolean>(!!token.value);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Set auth header for axios
  if (token.value) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
  }

  const setAuth = (data: AuthResponse) => {
    user.value = data.user;
    token.value = data.token;
    isAuthenticated.value = true;
    localStorage.setItem("token", data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
  };

  const clearAuth = () => {
    user.value = null;
    token.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  const login = async (credentials: LoginData) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await axios.post<AuthResponse>(
        "/auth/login",
        credentials,
      );
      setAuth(response.data);
    } catch (err) {
      error.value = "Invalid email or password";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await axios.post<AuthResponse>(
        "/auth/register",
        userData,
      );
      setAuth(response.data);
    } catch (err) {
      error.value = "Registration failed. Email may already be in use.";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    clearAuth();
  };

  const fetchProfile = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await axios.get<AuthResponse>("/users/profile");
      user.value = response.data.user;
    } catch (err) {
      error.value = "Failed to fetch profile";
      clearAuth();
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const updateProfile = async (profileData: UpdateProfileData) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await axios.post<AuthResponse>(
        "/users/update",
        profileData,
      );
      user.value = response.data.user;
    } catch (err) {
      error.value = "Failed to update profile";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchUsers = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      const response =
        await axios.get<Array<{ user: User; token: string }>>("/users/list");
      console.log(response.data);
      return response.data;
    } catch (err) {
      error.value = "Failed to fetch users";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    fetchProfile,
    updateProfile,
    fetchUsers,
  };
});
