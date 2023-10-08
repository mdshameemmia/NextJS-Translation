import React, { useEffect } from "react";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import { signIn, useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

import Button from "@/components/Forms/Button.component";
import Label from "@/components/Forms/Label.component";
import getError from "@/utils/error";

export default function Login() {
  const { data: session, status } = useSession();
  const { t } = useTranslation();
  const router = useRouter();

  const onSubmit = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (status === "authenticated") {
        const { data } = await axios.post(`/api/activity`,{email});
        console.log(data)

        toast.success("Sucessfully logged in!");
        setTimeout(() => router.push("/admin/dashboard"), 3000);
      }

      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} limit={1} />
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
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    {t("common:Sign In")}
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <Button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <Image alt="..." height={20} width={20} className="w-5 mr-1" src="/img/github.svg" />
                    {t("common:Github")}
                  </Button>
                  <Button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center  text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <Image alt="..."  height={20} width={20} className="w-5 mr-1" src="/img/google.svg" />
                    {t("common:Google")}
                  </Button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>{t("common:Or sign in with credentials")}</small>
                </div>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  onSubmit={onSubmit}
                >
                  {(formik) => {
                    return (
                      <Form>
                        <div className="relative w-full mb-3">
                          <Label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="email">
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
                            htmlFor="grid-password">
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
                            {t("common:Sign In")}
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
                <Link href="/user/register">
                  <small>{t("common:Create new account")}</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Login.layout = Auth;
