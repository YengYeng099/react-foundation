import { useForm } from "react-hook-form";
import { useUserRegisterMutation } from "../API/authApi";
import { resolvePath } from "react-router";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { GoogleRegisterComponent } from "../oAuth/GoogleRegisterComponent";
import { GithubAuthProvider } from "firebase/auth";
import { GithubRegisterComponent } from "../oAuth/GithubRegisterComponent";

export default function RegisterComponent() {
  const navigation = useNavigate();
  const formSchema = z
    .object({
      username: z.string().min(6, { message: "Username is required" }),
      email: z
        .string("Please input an email")
        .email({ pattern: z.regexes.html5Email }),
      password: z
        .string("AT least 6 letters")
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(32, { message: "Password must not exceed 32 characters" })
        .regex(/[A-Z]/, {
          message: "Password must contain at least one uppercase letter",
        })
        .regex(/[a-z]/, {
          message: "Password must contain at least one lowercase letter",
        })
        .regex(/[0-9]/, {
          message: "Password must contain at least one number",
        })
        .regex(/[^A-Za-z0-9]/, {
          message: "Password must contain at least one special character",
        }),
      confirmPassword: z.string("Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
    });
  const [registerRequest] = useUserRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const HandleRegisterSubmit = async (data) => {
    const userRegisterRequest = {
      ...data,
      phoneNumber: "099123456",
      address: {
        addressLine1: "Phnom Penh",
        addressLine2: "Phnom Penh",
        road: "5 National Road",
        linkAddress: "N/A",
      },
      profile:
        "https://i.pinimg.com/736x/46/12/5f/46125f78d9efe0fe7f96fc71c6f70670.jpg",
    };
    try {
      const result = await registerRequest({ userRegisterRequest });
      if (result?.data) {
        toast.success("Register Succesfully ! ");
        setTimeout(() => {
          navigation("/auth/login", { replace: true });
        }, 5000);
      }
    } catch (error) {
      toast.error("Register Failed");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <ToastContainer />
      <div className="w-full flex items-center justify-center">
        <div className="w-3/4 max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Register</h2>
          <form onSubmit={handleSubmit(HandleRegisterSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Sign up
            </button>
          </form>
          <GoogleRegisterComponent />
          <GithubRegisterComponent />
          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?
            <a href="/auth/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
