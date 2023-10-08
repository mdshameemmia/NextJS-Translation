import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useTranslation from "next-translate/useTranslation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Admin from "@/components/layouts/Admin";
import Label from "@/components/Forms/Label.component";
import TextError from "@/components/Error/TextError";
import Button from "@/components/Forms/Button.component";
import FloorNameFormat from "@/utils/FloorNameFormat";
import FlatNameFormat from "@/utils/FlatNameFormat";
import SendEmail from "@/helpers/SendEmail";
import SendMessage from "@/helpers/SendMessage";
import UserRole from "@/helpers/UserRole";

const AddFloor = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const session = useSession();

  const [floors, setFloors] = useState();
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfoWithBuildingDetails, setUserInfoWithBuildingDetails] =
    useState("");
  const [role, setRole] = useState();

  const user_id = router?.query?.user_id;
  const admin_id = session?.data?._id;

  useEffect(() => {
    const getBuildings = async (admin_id) => {
      const { data } = await axios.get(`/api/building/${admin_id}`);
      setBuildings(data);
    };
    getBuildings(admin_id);

    const getUserInfoWithBuildingDetails = async (user_id) => {
      const { data } = await axios.post(
        `/api/user/get-user-info-with-building-details`,
        { id: user_id }
      );

      setUserInfoWithBuildingDetails(data);

      //  role
      const user_role = await UserRole(admin_id);
      setRole(user_role);
    };
    getUserInfoWithBuildingDetails(user_id);

    setLoading(false);
  }, [admin_id, user_id]);

  const buildingHandleChange = (event, formik) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);

    const getFloor = async () => {
      const { data } = await axios.post(`/api/building/get-floor-by-building`, {
        id: value,
      });
      formik.setFieldValue("floors", data);
    };
    value ? getFloor(value) : "";
  };

  const floorHandleChange = (event, formik) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
    const getFlat = async () => {
      const { data } = await axios.post(`/api/building/get-flat-by-floor`, {
        id: value,
      });
      formik.setFieldValue("flats", data);
    };
    value ? getFlat(value) : "";
  };

  const onSubmit = (values) => {

    values.user_id = router?.query?.user_id;
    role == "admin" ? (values.admin_id = admin_id) : "";

    const assignFlat = async () => {
      const { data } = await axios.post(`/api/building/assign-flat`, values);
      
      // send email
      let message = null;
      if (data.building) {
        message = `You are assigned ${FlatNameFormat(data.flat)}, ${FloorNameFormat(parseInt(data.floor))}, ${data.building}`;
      } else {
        message = data.msg;
      }

      const mail_content = {
        user_name: data.name,
        user_email: data.email,
        message: message,
      };

      SendEmail(mail_content);

      SendMessage(data.mobile, message);

      toast.success(t("common:Successfully done"));
      setTimeout(() => {
        router.push("/members");
      }, 3000);

    };

   assignFlat();
  };

  return (
    <Admin>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {userInfoWithBuildingDetails.flat_id && (
            <div className="text-center">
              <h1 className="text-bold text-2xl">
                Hello!{" "}
                {userInfoWithBuildingDetails.first_name +
                  " " +
                  userInfoWithBuildingDetails.last_name}
              </h1>
              <span className="text-red-500 font-bold">
                You already assigned{" "}
                {FlatNameFormat(userInfoWithBuildingDetails.flat) +
                  ", " +
                  FloorNameFormat(userInfoWithBuildingDetails.floor) +
                  ", " +
                  userInfoWithBuildingDetails.building_name}
              </span>
            </div>
          )}

          <Formik initialValues={{ building_id: "" }} onSubmit={onSubmit}>
            {(formik) => {
              return (
                <Form>
                  <fieldset className="flex flex-wrap border-2 shadow-md border-solid border-indigo-600 p-3">
                    <legend>{t("building:Building Information")}</legend>

                    {role == "admin" && (
                      <div className="w-full lg:w-6/12 my-2">
                        <Label htmlFor="floor" className="block">
                          {t("building:Building Name")}
                        </Label>
                        <Field
                          name="building_id"
                          id="building_id"
                          as="select"
                          className="md:w-6/12"
                        >
                          {({ field, form }) => (
                            <select
                              {...field}
                              onChange={(event) =>
                                buildingHandleChange(event, form)
                              }
                              className="md:w-6/12"
                            >
                              <option value="">Choose Building</option>
                              {buildings.length > 0 &&
                                buildings.map((building) => {
                                  return (
                                    <option
                                      selected={
                                        userInfoWithBuildingDetails.building_id ==
                                        building._id
                                      }
                                      key={building._id}
                                      value={building._id}
                                    >
                                      {building.building_name}
                                    </option>
                                  );
                                })}
                            </select>
                          )}
                        </Field>
                        <ErrorMessage
                          name="building_id"
                          className="w-full md:w-8/12 block"
                          component={TextError}
                        />
                      </div>
                    )}

                    {role == "admin" && (
                      <div className="w-full lg:w-6/12 md:w-6/12 my-2">
                        <Label htmlFor="floor_id" className="block">
                          {t("building:Name of Floor")}
                        </Label>
                        <Field name="floor_id" className="md:w-6/12">
                          {({ field, form }) => (
                            <select
                              {...field}
                              onChange={(event) =>
                                floorHandleChange(event, form)
                              }
                              className="md:w-6/12"
                            >
                              <option value="">Choose One</option>
                              {form.values.floors &&
                                form.values.floors.map((floor) => {
                                  return (
                                    <option key={floor._id} value={floor._id}>
                                      {FloorNameFormat(floor.floor)}
                                    </option>
                                  );
                                })}
                            </select>
                          )}
                        </Field>
                        <ErrorMessage
                          name="floor_id"
                          className="w-full md:w-8/12 block"
                          component={TextError}
                        />
                      </div>
                    )}
                    {role == "admin" && (
                      <div className="w-full lg:w-6/12 md:w-6/12 my-2">
                        <Label htmlFor="flat_id" className="block">
                          {t("building:Name of Flat")}
                        </Label>
                        <Field name="flat_id">
                          {({ field, form }) => (
                            <select {...field} className="md:w-6/12">
                              <option value="">Choose One</option>
                              {form.values?.flats &&
                                form.values?.flats?.map((flat) => {
                                  return (
                                    <option key={flat._id} value={flat._id}>
                                      {FlatNameFormat(flat.flat)}
                                    </option>
                                  );
                                })}
                            </select>
                          )}
                        </Field>
                        <ErrorMessage
                          name="flat_id"
                          className="w-full md:w-8/12 block"
                          component={TextError}
                        />
                      </div>
                    )}

                    <div className="w-full lg:w-6/12 md:w-6/12 my-2">
                      <Label htmlFor="status" className="block">
                        Status
                      </Label>
                      <Field
                        component="select"
                        name="status"
                        className="md:w-6/12"
                      >
                        <option value=""> Choose One</option>
                        <option value="1">Active Member</option>
                        <option value="2">Want to Leave Member</option>
                        <option value="3">Already Left Member</option>
                      </Field>
                      <ErrorMessage
                        name="status"
                        className="w-full md:w-8/12 block"
                        component={TextError}
                      />
                    </div>

                    {role == "admin" && (
                      <div className="w-full lg:w-6/12 md:w-6/12 my-2">
                        <Label htmlFor="date" className="block">
                          date
                        </Label>
                        <Field
                          type="date"
                          name="date"
                          className="custom_input md:w-6/12"
                        />
                        <ErrorMessage
                          name="date"
                          className="w-full md:w-8/12 block"
                          component={TextError}
                        />
                      </div>
                    )}
                    {role == "admin" && (
                      <div className="w-full lg:w-6/12 md:w-6/12 my-2">
                        <Label htmlFor="amount" className="block">
                          Amount
                        </Label>
                        <Field
                          type="amount"
                          name="amount"
                          className="custom_input py-2 md:w-6/12"
                        />
                        <ErrorMessage
                          name="amount"
                          className="w-full md:w-8/12 block"
                          component={TextError}
                        />
                      </div>
                    )}
                  </fieldset>

                  <div className=" flex flex-wrap justify-center my-3">
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

export default AddFloor;
