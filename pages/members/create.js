import React, { useEffect, useState } from "react";
import { object, string, ref } from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

import Admin from "@/components/layouts/Admin";
import Label from "@/components/Forms/Label.component";
import Button from "@/components/Forms/Button.component";
import TextError from "@/components/Error/TextError";
import blood_groups from "@/utils/blood_groups";
import religions from "@/utils/religions";
import marital_status from "@/utils/marital_status";
import getError from "@/utils/error";
import { useSession } from "next-auth/react";


const Create = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const session = useSession();

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const user_id = session?.data?._id;

  useEffect(() => {
    const getUser = async (user_id) => {
      try {
        const { data } = await axios.get(`/api/user/edit/${user_id}`);
        setUser(data)
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    user_id ? getUser(user_id) : "";
  }, [user_id]);

  const initialValues = {
    first_name: "",
    last_name: "",
    email: user?.email??'',
    nid: "",
    gender: "",
    blood_group: "",
    religion: "",
    marital_status: "",
    father_name: "",
    mother_name: "",
    guardian_name: "",
    village: "",
    post_office: "",
    post_code: "",
    police_station: "",
    district: "",
    division: "",
  };

  const validationSchema = () => {
    return object({
      first_name: string().required(t("member:First Name is Required")),
      last_name: string().required(t("member:Last Name is Required")),
      email: string().required(t("member:Email is Required")),
      mobile: string().required(t("member:Mobile is Required")),
      nid: string().required(t("member:NID is Required")),
      gender: string().required(t("member:Gender is Required")),
      blood_group: string().required(t("member:Blood Group is Required")),
      religion: string().required(t("member:Religion is Required")),
      marital_status: string().required(t("member:Marital Status is Required")),
      father_name: string().required(t("member:Father Name is Required")),
      mother_name: string().required(t("member:Mother Name is Required")),
      guardian_name: string().required(t("member:Guardian Name is Required")),
      village: string().required(t("member:Village is Required")),
      post_office: string().required(t("member:Post Office is Required")),
      post_code: string().required(t("member:Post Code is Required")),
      police_station: string().required(t("member:Police Station is Required")),
      district: string().required(t("member:District is Required")),
      division: string().required(t("member:Division is Required")),
    });
  };


  const onSubmit = async (values) => {
    try {
      console.log(values);
      const {
        data: { message },
      } = await axios.post(`/api/members/store`, values);
      toast.success(t("common:Successfully done"));
      setTimeout(() => {
        router.push("/members");
      }, 2000);
    } catch (err) {
      console.log(err, "error");
      toast.error(getError(err));
    }
  };

  return (
    <Admin>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <h2 className="text-xl text-center bold text-black">
            {t("member:Member's Description")}
          </h2>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={() => validationSchema()}
          >
            {(formik) => {
              return (
                <Form>
                  <fieldset className="flex flex-wrap border-2 shadow-md border-solid border-indigo-600 p-3">
                    <legend>{t("member:Personal Information")}</legend>

                    <div className="w-full lg:w-3/12 md:w-6/12">
                      <Label htmlFor="first_name" className="block">
                        {t("member:First Name")}
                      </Label>
                      <Field
                        name="first_name"
                        id="first_name"
                        className="w-full md:w-8/12 custom_input "
                      />
                      <ErrorMessage
                        name="first_name"
                        className="w-full md:w-8/12 block"
                        component={TextError}
                      />
                    </div>

                    <div className="w-full lg:w-3/12 md:w-6/12">
                      <Label htmlFor="last_name" className="block">
                        {t("member:Last Name")}
                      </Label>
                      <Field
                        name="last_name"
                        id="last_name"
                        className="w-full md:w-8/12 custom_input "
                      />
                      <ErrorMessage
                        name="last_name"
                        className="w-full md:w-8/12 block"
                        component={TextError}
                      />
                    </div>
                    <div className="w-full lg:w-3/12 md:w-6/12">
                      <Label htmlFor="email" className="block">
                        {t("member:Email")}
                      </Label>
                      <Field
                        name="email"
                        id="email"
                        className="w-full md:w-8/12 custom_input"
                        readOnly="true"
                      />
                      <ErrorMessage
                        name="email"
                        className="w-full md:w-8/12 block"
                        component={TextError}
                      />
                    </div>
                    <div className="w-full lg:w-3/12 md:w-6/12">
                      <Label htmlFor="mobile" className="block">
                        {t("member:Mobile")}
                      </Label>
                      <Field
                        name="mobile"
                        id="mobile"
                        className="w-full md:w-8/12 custom_input "
                      />
                      <ErrorMessage
                        name="mobile"
                        className="w-full md:w-8/12 block"
                        component={TextError}
                      />
                    </div>

                    <div className="w-full lg:w-3/12 md:w-6/12">
                      <Label htmlFor="nid" className="block">
                        {t("member:NID")}
                      </Label>
                      <Field
                        name="nid"
                        id="nid"
                        className="w-full md:w-8/12 custom_input "
                      />
                      <ErrorMessage
                        name="nid"
                        className="w-full md:w-8/12 block"
                        component={TextError}
                      />
                    </div>
                    <div className="w-full lg:w-3/12 md:w-6/12">
                      <Label htmlFor="gender" className="block">
                        {t("member:Gender")}
                      </Label>
                      <label>
                        {t("member:Male")}
                        <Field
                          name="gender"
                          id="gender"
                          type="radio"
                          value="Male"
                        />
                      </label>
                      <label>
                        {t("member:Female")}
                        <Field
                          name="gender"
                          id="gender"
                          type="radio"
                          value="Female"
                        />
                      </label>

                      <ErrorMessage
                        name="gender"
                        className="w-full md:w-8/12 block"
                        component={TextError}
                      />
                    </div>
                    <div className="w-full lg:w-3/12 md:w-6/12">
                      <Label htmlFor="blood_group" className="block">
                        {t("member:Blood Group")}
                      </Label>
                      <Field
                        as="select"
                        name="blood_group"
                        id="blood_group"
                        className="w-full md:w-8/12 custom_input text-black "
                      >
                        {blood_groups.map((blood_group, index) => {
                          return (
                            <option key={index} value={blood_group.value}>
                              {blood_group.label}
                            </option>
                          );
                        })}
                      </Field>
                      <ErrorMessage
                        name="blood_group"
                        className="w-full md:w-8/12 block"
                        component={TextError}
                      />
                    </div>
                    <div className="w-full lg:w-3/12 md:w-6/12">
                      <Label htmlFor="religion" className="block">
                        {t("member:Religion")}
                      </Label>
                      <Field
                        name="religion"
                        id="religion"
                        className="w-full md:w-8/12 custom_input text-black"
                        as="select"
                      >
                        {religions.map((religion, index) => {
                          return (
                            <option key={index} value={religion.value}>
                              {religion.label}
                            </option>
                          );
                        })}
                      </Field>
                      <ErrorMessage
                        name="religion"
                        className="w-full md:w-8/12 block"
                        component={TextError}
                      />
                    </div>
                    <div className="w-full lg:w-3/12 md:w-6/12">
                      <Label htmlFor="marital_status" className="block">
                        {t("member:Marital Status")}
                      </Label>
                      <Field
                        name="marital_status"
                        id="marital_status"
                        className="w-full md:w-8/12 custom_input text-black"
                        as="select"
                      >
                        {marital_status.map((data, index) => {
                          return (
                            <option key={index} value={data.value}>
                              {data.label}
                            </option>
                          );
                        })}
                      </Field>
                      <ErrorMessage
                        name="marital_status"
                        className="w-full md:w-8/12 block"
                        component={TextError}
                      />
                    </div>
                    <div className="w-full lg:w-3/12 md:w-6/12">
                      <Label htmlFor="father_name" className="block">
                        {t("member:Father Name")}
                      </Label>
                      <Field
                        name="father_name"
                        id="father_name"
                        className="w-full md:w-8/12 custom_input "
                      />
                      <ErrorMessage
                        name="father_name"
                        className="w-full md:w-8/12 block"
                        component={TextError}
                      />
                    </div>
                    <div className="w-full lg:w-3/12 md:w-6/12">
                      <Label htmlFor="mother_name" className="block">
                        {t("member:Mother Name")}
                      </Label>
                      <Field
                        name="mother_name"
                        id="mother_name"
                        className="w-full md:w-8/12 custom_input "
                      />
                      <ErrorMessage
                        name="mother_name"
                        className="w-full md:w-8/12 block"
                        component={TextError}
                      />
                    </div>
                    <div className="w-full lg:w-3/12 md:w-6/12">
                      <Label htmlFor="guardian_name" className="block">
                        {t("member:Guardian Name")}
                      </Label>
                      <Field
                        name="guardian_name"
                        id="guardian_name"
                        className="w-full md:w-8/12 custom_input "
                      />
                      <ErrorMessage
                        name="guardian_name"
                        className="w-full md:w-8/12 block"
                        component={TextError}
                      />
                    </div>
                  </fieldset>

                  <fieldset className="flex flex-wrap border-2 shadow-md border-solid border-indigo-600 p-3">
                    <legend>{t("member:Permanent Address")}</legend>
                    <div className="w-full lg:w-3/12 md:w-6/12">
                      <Label htmlFor="village" className="block">
                        {t("member:Village")}
                      </Label>
                      <Field
                        name="village"
                        id="village"
                        className="w-full md:w-8/12 custom_input "
                      />
                      <ErrorMessage
                        name="village"
                        className="w-full md:w-8/12 block"
                        component={TextError}
                      />
                    </div>
                    <div className="w-full lg:w-3/12 md:w-6/12">
                      <Label htmlFor="post_office" className="block">
                        {t("member:Post Office")}
                      </Label>
                      <Field
                        name="post_office"
                        id="post_office"
                        className="w-full md:w-8/12 custom_input "
                      />
                      <ErrorMessage
                        name="post_office"
                        className="w-full md:w-8/12 block"
                        component={TextError}
                      />
                    </div>
                    <div className="w-full lg:w-3/12 md:w-6/12">
                      <Label htmlFor="post_code" className="block">
                        {t("member:Post Code")}
                      </Label>
                      <Field
                        name="post_code"
                        id="post_code"
                        className="w-full md:w-8/12 custom_input "
                      />
                      <ErrorMessage
                        name="post_code"
                        className="w-full md:w-8/12 block"
                        component={TextError}
                      />
                    </div>
                    <div className="w-full lg:w-3/12 md:w-6/12">
                      <Label htmlFor="police_station" className="block">
                        {t("member:Police Station")}
                      </Label>
                      <Field
                        name="police_station"
                        id="police_station"
                        className="w-full md:w-8/12 custom_input "
                      />
                      <ErrorMessage
                        name="police_station"
                        className="w-full md:w-8/12 block"
                        component={TextError}
                      />
                    </div>
                    <div className="w-full lg:w-3/12 md:w-6/12">
                      <Label htmlFor="district" className="block">
                        {t("member:District")}
                      </Label>
                      <Field
                        name="district"
                        id="district"
                        className="w-full md:w-8/12 custom_input "
                      />
                      <ErrorMessage
                        name="district"
                        className="w-full md:w-8/12 block"
                        component={TextError}
                      />
                    </div>
                    <div className="w-full lg:w-3/12 md:w-6/12">
                      <Label htmlFor="division" className="block">
                        {t("member:Division")}
                      </Label>
                      <Field
                        name="division"
                        id="division"
                        className="w-full md:w-8/12 custom_input "
                      />
                      <ErrorMessage
                        name="division"
                        className="w-full md:w-8/12 block"
                        component={TextError}
                      />
                    </div>
                  </fieldset>

                  <div className=" flex flex-wrap justify-center my-2">
                    <Button
                      type="submit"
                      className="bg-cyan-900 active:bg-cyan-800 hover:bg-cyan-600 text-white px-2"
                    >
                      {t("common:Submit")}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </Admin>
  );
};

export default Create;
