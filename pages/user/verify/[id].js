import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import { signIn, useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import useTranslation from "next-translate/useTranslation";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import Button from "@/components/Forms/Button.component";
import Label from "@/components/Forms/Label.component";
import getError from "@/utils/error";
import { useRouter } from "next/router";
import axios from "axios";
import SendMessage from "@/helpers/SendMessage";
import SendEmail from "@/helpers/SendEmail";
import CONSTANT_VARIABLE from "@/utils/env";

export default function Verify() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useTranslation();
  const [user, setUser] = useState();
  const [duration, setDuration] = useState(60);


  const userId = router?.query?.id;

  useEffect(() => {
    const getUser = async (userId) => {
        const { data } = await axios.get(`/api/user/edit/${userId}`);
        setUser(data);
    }
    getUser(userId)
  }, [userId])


  const removeUserInfo = (id) => {
    setDuration(0);
  }

  const handleResendOtp = () => {
    SendMessage(user.mobile,`Your OTP is: ${user.otp}`);
    window.location.reload();
  }

  const onSubmit = async (values) => {
    
    try {
       const { data } = await axios.post(`/api/user/verify-otp`,{id:userId, otp:values.otp});
       if(data.message == 'success'){

        // message send to user 
        if(!user.admin_mail){
          
          SendMessage(CONSTANT_VARIABLE.OWNER_MOBILE,`Please approve a new building owner. Email(${user.email} & Mobile(${user.mobile}))`);
        }else{
          const mail_content = {
            user_name: 'Hello Sir',
            user_email: user.admin_mail,
            message: `Please approve a new building owner. Email(${user.email} & Mobile(${user.mobile}))`,
          }

          SendEmail(mail_content);

        }

        toast.success('Sucessfully Verified');
        setTimeout(() => router.push(`/user/login`),5000);

       }else{
        toast.error(getError(`OTP doesn't match`));
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
                  
                  <div className="flex content-center items-center justify-center">
                  <CountdownCircleTimer
                    isPlaying
                    duration={duration}
                    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[30, 20, 10, 0]}
                    size={120}
                    updateInterval={0}
                  >
                    {({ remainingTime }) => {
                      if(remainingTime == 0){
                        removeUserInfo(userId)
                      }else{
                        return remainingTime;
                      }
                    }}
                  </CountdownCircleTimer>
                  
                  </div>
                  <h6 className="text-dark-500 text-2xl font-bold my-3">
                    Verify Your Number
                  </h6>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <Formik initialValues={{ otp: "" }} onSubmit={onSubmit}>
                  {(formik) => {
                    return (
                      <Form>
                        <div className="relative w-full mb-3">
                          <Label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="otp"
                          >
                            Send OTP to this <span className="font-bold text-red-700 mx-3">({user?.mobile.slice(0,3)} ... {user?.mobile.slice(-3)})</span> number 
                          </Label>
                          <Field
                            type="otp"
                            name="otp"
                            id="otp"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Type your otp"
                          />
                        </div>

                        <div className="text-center mt-6">
                          <Button
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type={`submit`}
                          >
                            {t("common:Verify")}
                          </Button>
                        </div>
                        {
                            duration == 0 ? (<div className="flex justify-between">
                            <p>Dont Received Otp ? </p>
                            <button type="button" className="P-2" onClick={handleResendOtp}>Resend</button>
                        </div>) : ''                       
                         }
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Login.layout = Auth;
