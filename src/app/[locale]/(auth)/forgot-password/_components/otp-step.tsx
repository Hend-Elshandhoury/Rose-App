import React from "react";
// import { FORGOT_PASSWORD_STEPS } from "@/lib/constants/auth.constant";
import { Dispatch, SetStateAction } from "react";
import { ForgotPasswordSteps } from "@/lib/types/auth.type";

type OtpStepProps = {
  setStep: Dispatch<SetStateAction<ForgotPasswordSteps>>;
};

export default function OtpStep({ setStep }: OtpStepProps) {
  /* to do function (not ready yet) */
  // const onSubmit = (values) => {
  //   onSuccess: () => {
  //     setStep(FORGOT_PASSWORD_STEPS.NEW_PASSWORD);
  //   }
  // }
  return <div>otp-step</div>;
}
