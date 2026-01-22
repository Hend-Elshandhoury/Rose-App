// import { FORGOT_PASSWORD_STEPS } from "@/lib/constants/auth.constant";
import { ForgotPasswordSteps } from "@/lib/types/auth.type";
import React, { Dispatch, SetStateAction } from "react";

type EmailStepProps = {
  email: string | null;
  setStep: Dispatch<SetStateAction<ForgotPasswordSteps>>;
  setEmail: Dispatch<SetStateAction<string | null>>;
};

export default function EmailStep({
  email,
  setStep,
  setEmail,
}: EmailStepProps) {
  /* to do function (not ready yet) */
  // const onSubmit = (values) => {
  //   onSuccess: () => {
  //     setEmail(values.email);
  //     setStep(FORGOT_PASSWORD_STEPS.OTP);
  //   }
  // }
  return (
    <>
      <div>email step</div>
    </>
  );
}
