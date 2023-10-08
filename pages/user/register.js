import React, { useState } from "react";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import { useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTranslation from "next-translate/useTranslation";


import Auth from "@/components/layouts/Auth.js";
import Button from "@/components/Forms/Button.component";
import Label from "@/components/Forms/Label.component";
import { toast } from "react-toastify";
import getError from "@/utils/error";
import axios from "axios";
import { useRouter } from "next/router";
import SendMessage from "@/helpers/SendMessage";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useTranslation();

  const [isHideAdmin, setIsHideAdmin] = useState(true);

  const onSubmit = async (values) => {
    try {
      const { data } = await axios.post(`/api/user/register`, values);
      toast.success("Please verify your phone number")
      SendMessage(data.mobile,`Your OTP is: ${data.otp}`);
      setTimeout(() => router.push(`/user/verify/${data._id}`), 4000);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <>
      <ToastContainer position="top-right" limit={1} autoClose={3000} />

      <div
        className=" mx-auto  min-h-screen items-start"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/modern-business-buildings_1127-2857.jpg?w=2000')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <span
          id="blackOverlay"
          className="w-full min-h-screen absolute opacity-50 bg-black"
        ></span>
        <div className="flex content-center items-center justify-center h-full">
          <div className="min-h-screen"></div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3 ">
                  <h6 className="text-blueGray-500 text-xl font-bold">
                    {t("common:Sign up")}
                  </h6>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                    mobile: "",
                    role_name: "",
                    admin_mail: "",
                  }}
                  onSubmit={onSubmit}
                >
                  {(formik) => {
                    return (
                      <Form>
                        {formik?.values?.role_name === "user"
                          ? setIsHideAdmin(false)
                          : setIsHideAdmin(true)}
                        <div className="relative w-full mb-3">
                          <Label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="username"
                          >
                            {t("common:Username")}
                          </Label>
                          <Field
                            type="text"
                            name="username"
                            id="username"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                        <div className="relative w-full mb-3">
                          <Label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="email"
                          >
                            {t("common:Email")}
                          </Label>
                          <Field
                            type="email"
                            name="email"
                            id="email"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <Label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            {t("common:Password")}
                          </Label>
                          <Field
                            type="password"
                            name="password"
                            id="password"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Password"
                          />
                        </div>
                        <div className="relative w-full mb-3">
                          <Label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            {t("common:Mobile")}
                          </Label>
                          <Field
                            type="text"
                            name="mobile"
                            id="mobile"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Mobile"
                          />
                        </div>
                        <div className="relative w-full mb-3">
                          <Label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="signas"
                          >
                            Sign as
                          </Label>
                          <Field
                            as="select"
                            name="role_name"
                            id="signas"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          >
                            <option value="">Select Role</option>
                            <option value="admin">{t("common:Building Owner")}</option>
                            <option value="user">{t("common:Tenant Member")}</option>
                          </Field>
                        </div>
                        <div
                          className={`relative w-full mb-3 ${
                            isHideAdmin && "hidden"
                          }`}
                        >
                          <Label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="admin_mail"
                          >
                           Building Owner Email
                          </Label>
                          <Field
                            type="email"
                            name="admin_mail"
                            id="admin_mail"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>

                        <div>
                          <Label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                            />
                            <span className="ml-2 text-sm font-semibold text-blueGray-600">
                              {t("common:Remember me")}
                            </span>
                          </Label>
                        </div>

                        <div className="text-center mt-6">
                          <Button
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type={`submit`}
                          >
                            {t("common:Sign up")}
                          </Button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2 text-xl">
              <Link
                  href="/"
                  className="text-blueGray-200"
                >
                  <small>{t("common:Home Page")}</small>
                </Link>
              </div>
              <div className="w-1/2 text-right text-white text-xl">
                <Link href="/user/login">
                  <small> {t("common:Login")}</small>
                </Link>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </>
  );
}

Login.layout = Auth;
