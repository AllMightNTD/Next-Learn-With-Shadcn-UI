"use client";
import axios from "axios";

import Checkbox from "@/components/Checkbox/Checkbox";
import Input from "@/components/Input/Input";
import Radio from "@/components/Radio/Radio";
import Switch from "@/components/Switch/Switch";
import { login } from "@/lib/action";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  SubmitHandler,
  useForm
} from "react-hook-form";
import * as yup from "yup";

interface LoginHandler {
  email: string;
  password: string;
}

const LoginInputSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .max(255, "Email không được vượt quá 255 kí tự")
    .required("Vui lòng nhập email"),
  password: yup.string().required("Vui lòng nhập password"),
  sex:yup.string().required("Giới tính phải được nhập"),
  favourite: yup.array().min(1, "Sở thích phải được nhập").required("Sở thích phải được nhập"),
  like:yup.boolean().required("Vui lòng like")
});

// eslint-disable-next-line @next/next/no-async-client-component
const Page = () => {
  const {
    handleSubmit,
    setError,
    control,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      favourite:[],
      like:false,
    },
    resolver: yupResolver(LoginInputSchema),
  });
  const onSubmit: SubmitHandler<LoginHandler> = async (data) => {
    try {
      console.log('data' , data);
      const res = await axios.post(
        `http://localhost:8000/api/user/login`,
        data
      );
      if (res.status == 200) {
        localStorage.setItem('token_next', res.data.data.access_token)
        login(res.data.data.access_token);
      }
    } catch (error: any) {
      setError("password", {
        type: "custom",
        message: error.response.data.message,
      });
    }
  };
  
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[400px] mx-auto my-auto"
      >
        <div className="grid grid-cols-1 gap-4">
        <Input
          label="My Custom Input"
          name="email"
          control={control}
          type="email"
          placeholder = "Please enter your email"
          required
        />
        
           <Input
          label="My Custom Input"
          name="password"
          control={control}
          type="password"
          placeholder = "Please enter your password"
          required
        />
          <Radio
            name="sex"
            control={control}
            label="Giới tính"
            required
            defaultValue="1"
            options={[
                {
                    label:"Nam",
                    value : "1"
                },
                {
                    label:"Nữ",
                    value : "0"
                }
            ]}
          />
           <Checkbox
            name="favourite"
            control={control}
            label="Sở thích"
            required
            options={[
                {
                    label:"Ô tô",
                    value : 'car'
                },
                {
                    label:"Xe máy",
                    value : 'motobike'
                }
            ]}
          />
          <Switch  name="like" control={control} label="Like"/>
        </div>
        <button type="submit" className="bg-red-200 text-white text-[14px]">
          Login
        </button>
      </form>
    </div>
  );
};

export default Page;
