import React, { useEffect } from "react";
import Main from "../components/Main";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../services/index/users";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/reducers/userReducers.js";
import { useMutation } from 'react-query';

const LoginForm = () => {
  // Redux dispatch ve navigate hook'larını kullanmak için tanımlamalar
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  // React Query useMutation hook'unu kullanarak login fonksiyonunu çalıştırmak
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      return login({ email, password });
    },
    onSuccess: (data) => {
      // Login başarılı olduğunda kullanıcı bilgilerini Redux'a kaydet ve localStorage'a yaz
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
    },
    onError: (error) => {
      // Login başarısız olduğunda hata mesajını göster
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    // Eğer kullanıcı bilgileri varsa ana sayfaya yönlendir
    if (userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  // React Hook Form kullanarak form işlemlerini tanımla
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  // Form submit handler fonksiyonu
  const submitHandler = (data) => {
    const { email, password } = data;
    mutate({ email, password });
  };

  return (
    <Main>
      <section className="container mx-auto px-5 py-5">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="font-roboto text-3xl font-bold text-center mb-2">
            Giriş Yap
          </h1>
          {/* Form başlangıcı */}
          <form onSubmit={handleSubmit(submitHandler)}>
            {/* Email alanı */}
            <div className="flex flex-col mb-2 w-full">
              <label
                htmlFor="email"
                className="text-[#5a7184] font-semibold block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Geçerli bir email giriniz**",
                  },
                  required: {
                    value: true,
                    message: "Email zorunlu**",
                  },
                })}
                placeholder="Email giriniz."
                className={`placeholder:text-[#959ead] mt-2 rounded-lg px-5 py-3 font-semibold block outline-none border ${
                  errors.email ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.email?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>

            {/* Şifre alanı */}
            <div className="flex flex-col mb-2 w-full">
              <label
                htmlFor="password"
                className="text-[#5a7184] font-semibold block"
              >
                Şifre
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Şifre zorunlu**",
                  },
                  minLength: {
                    value: 6,
                    message: "Şifre uzunluğu en az 6 karakter olmalıdır.",
                  },
                })}
                placeholder="Şifre giriniz."
                className={`placeholder:text-[#959ead] mt-2 rounded-lg px-5 py-3 font-semibold block outline-none border ${
                  errors.password ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>

            {/* Şifremi unuttum linki */}
            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-red-600"
            >
              Şifremi unuttum?
            </Link>
            
            {/* Giriş Yap butonu */}
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="bg-black text-white w-full text-lg my-4 py-2 px-8 md:flex items-center text-center justify-center rounded-full hover:bg-gray-900 disabled:cursor-not-allowed"
            >
              Giriş Yap
            </button>
            
            {/* Kayıt linki */}
            <p className="text-sm font-semibold text-red-600">
              <Link to="/register">Hesabınız yok mu?</Link>
            </p>
          </form>
        </div>
      </section>
    </Main>
  );
};

export default LoginForm;
