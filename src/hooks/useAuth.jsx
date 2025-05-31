import { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already logged in when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation - replace with real API call
      if (email === "test@example.com" && password === "password") {
        const userData = {
          id: 1,
          email,
          name: "John Doe",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, error: "Invalid email or password" };
      }
    } catch (error) {
      return { success: false, error: "Login failed. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email, password, name) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful signup - replace with real API call
      const userData = {
        id: Date.now(), // Simple ID generation
        email,
        name,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: "Signup failed. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };

  //  Update profile method
  const updateProfile = async (profileData) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful profile update
      const updatedUser = {
        ...user,
        ...profileData,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: "Profile update failed. Please try again.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  //  Change password method
  const changePassword = async (currentPassword, newPassword) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock password validation
      if (currentPassword === "password") {
        // Simple mock validation
        return { success: true };
      } else {
        return { success: false, error: "Current password is incorrect" };
      }
    } catch (error) {
      return {
        success: false,
        error: "Password change failed. Please try again.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  // 🆕 Delete account method
  const deleteAccount = async (password) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock password validation
      if (password === "password") {
        // Simple mock validation
        // Clear user data
        setUser(null);
        localStorage.removeItem("user");
        return { success: true };
      } else {
        return { success: false, error: "Invalid password" };
      }
    } catch (error) {
      return {
        success: false,
        error: "Account deletion failed. Please try again.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    updateProfile,
    changePassword,
    deleteAccount,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
