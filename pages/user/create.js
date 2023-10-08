import React, { useState } from "react";
import { object, string, ref } from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import useTranslation from "next-translate/useTranslation";
import axios from "axios";
import { toast } from "react-toastify";

import Label from "@/components/Forms/Label.component";
import Admin from "@/components/layouts/Admin";
import TextError from "@/components/Error/TextError";
import Button from "@/components/Forms/Button.component";
import { useRouter } from "next/router";

const initialValues = {
  email: "",
  username: "",
  password: "",
  role_name: "",
  admin_mail: "",
};


const UserForm = () => {
  const { t } = useTranslation();
  const [isHideAdmin, setIsHideAdmin] = useState(true);
  const router = useRouter();


  const userFormValidationSchema = () => {
    return object({
      username: string().required(t("common:Username is Required")),
      password: string().required(t("common:Password is Required")),
      email: string().required(t("common:Email is Required")),
      role_name: string().required(t("common:Role is Required")),
    });
  };


  const onSubmit = async (values) => {
    try {
      const res = await axios.post(`/api/user/register`, values);
      toast.success(t("common:Successfully done"));
      setTimeout(() => {
        router.push("/user");
      }, 3000);
    } catch (err) {
      console.log(err, "error");
      toast.error(getError(err));
    }
  };

  return (
    <Admin>
      <h2 className="text-xl text-center bold text-black">
        <legend>{t("common:Registration Form")}</legend>
      </h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={() => userFormValidationSchema()}
      >
        {(formik) => {
          {
            formik?.values?.role_name === "User"
              ? setIsHideAdmin(false)
              : setIsHideAdmin(true);
          }
          return (
            <Form>
              <fieldset className="flex flex-col w-auto border-2 shadow-sm border-solid border-indigo-600 p-3">
                <legend>{t("common:Registration Form")}</legend>

                <div className="w-full lg:w-6/12 md:w-6/12  self-center ">
                  <Label htmlFor="username" className="block">
                    {t("common:Username")}
                  </Label>
                  <Field
                    name="username"
                    id="username"
                    className="w-full md:w-12/12 custom_input "
                  />
                  <ErrorMessage
                    name="username"
                    className="w-full md:w-12/12 block"
                    component={TextError}
                  />
                </div>

                <div className="w-full lg:w-6/12 md:w-6/12  self-center">
                  <Label htmlFor="email" className="block">
                    {t("common:Email")}
                  </Label>
                  <Field
                    name="email"
                    id="email"
                    className="w-full md:w-12/12 custom_input "
                  />
                  <ErrorMessage
                    name="email"
                    className="w-full md:w-12/12 block"
                    component={TextError}
                  />
                </div>

                <div className="w-full lg:w-6/12 md:w-6/12  self-center">
                  <Label htmlFor="password" className="block">
                    {t("common:Password")}
                  </Label>
                  <Field
                    name="password"
                    id="password"
                    className="w-full md:w-12/12 custom_input "
                  />
                  <ErrorMessage
                    name="password"
                    className="w-full md:w-12/12 block"
                    component={TextError}
                  />
                </div>
                <div className="w-full lg:w-6/12 md:w-6/12  self-center">
                  <Label
                    className="block"
                    htmlFor="signas">
                      Sign as
                    </Label>
                  <Field
                    as="select"
                    name="role_name"
                    id="signas"
                    className="w-full md:w-12/12 custom_input"
                  >
                    <option value="">Select Role</option>
                    <option value="Admin">{t("common:Admin")}</option>
                    <option value="User">{t("common:User")}</option>
                  </Field>
                </div>
                <div
                  className={`w-full lg:w-6/12 md:w-6/12  self-center ${
                    isHideAdmin && "hidden"
                  }`}
                >
                  <Label
                    className="block"
                    htmlFor="admin_mail"
                    >
                      Owner Email
                      </Label>
                  <Field
                    name="admin_mail"
                    id="admin_mail"
                    className="w-full md:w-12/12 custom_input"
                  />
                </div>

                <div className=" flex flex-wrap justify-center mt-4">
                  <Button
                    type="submit"
                    className="bg-cyan-900 active:bg-cyan-800 hover:bg-cyan-600 text-white px-2 mx-5"
                  >
                    {t("common:Submit")}
                  </Button>
                </div>
              </fieldset>
            </Form>
          );
        }}
      </Formik>
    </Admin>
  );
};

export default UserForm;
