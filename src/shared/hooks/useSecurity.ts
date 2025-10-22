import { useForm } from "react-hook-form";

interface SecurityFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const useSecurity = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
    clearErrors,
    reset,
  } = useForm<SecurityFormData>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  const getPasswordStrength = (
    password: string,
  ): { strength: "weak" | "medium" | "strong"; text: string } => {
    if (!password) return { strength: "weak", text: "" };

    let score = 0;
    if (password.length >= 6) score++;
    if (password.match(/[A-Z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[^A-Za-z0-9]/)) score++;

    if (score <= 1) return { strength: "weak", text: "Weak" };
    if (score <= 2) return { strength: "medium", text: "Medium" };
    return { strength: "strong", text: "Strong" };
  };

  const getPasswordRequirements = (password: string) => {
    return {
      hasMinLength: password.length >= 6,
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
    };
  };

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    newPassword,
    confirmPassword,
    setError,
    clearErrors,
    reset,
    getPasswordStrength,
    getPasswordRequirements,
  };
};
