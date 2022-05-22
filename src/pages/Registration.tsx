import React, { useState } from "react";
import Input from "../components/Input";
import joi from "joi";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
interface IRegistrationPageProps {
  onAccountCreate: () => void;
}
// get key value pair for errors using joi schema

const formDataSchema = joi.object({
  email: joi
    .string()
    .required()
    .email({ tlds: { allow: false } })
    .message("Email is invalid")
    .label("Email"),
  password: joi.string().min(8).required().label("Password"),
  confirmPassword: joi
    .string()
    .valid(joi.ref("password"))
    .required()
    .messages({
      "any.required": "Confirm password is required",
      "any.only": "Passwords do not match",
    })
    .label("Confirm Password"),
  name: joi
    .string()
    .required()
    .messages({ "string.required": "Name is required" })
    .label("Name"),
  phoneNumber: joi
    .string()
    .regex(/^\d{10}$/)
    .messages({
      "any.required": "Phone number is required",
      "object.regex.base": "Invalid Phone number",
      "string.pattern.base": "Invalid Phone Number",
      "any.empty": "Phone Number is required",
    })
    .label("Phone Number"),
});

const initialFormData = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  phoneNumber: "",
};
const initialErrors = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  phoneNumber: "",
};

const initialTouched = {
  email: false,
  password: false,
  confirmPassword: false,
  name: false,
  phoneNumber: false,
};

export default function RegistrationPage(props: IRegistrationPageProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState(initialTouched);
  const [noErrors, setNoErrors] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const findErrors = async (data: typeof formData) => {
    try {
      await formDataSchema.validateAsync(data, {
        abortEarly: false,
      });
      setErrors(initialErrors);
      setNoErrors(true);
    } catch (error: any) {
      console.log(error);
      if (error) {
        const newErrors: any = {};
        error.details.forEach(({ path, message }: any) => {
          newErrors[path] = message;
        });
        setErrors((e) => ({ ...newErrors }));
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setTouched({ ...touched, [e.target.name]: true });
    setFormData(newFormData);
    findErrors(newFormData);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };
  return (
    <div className={"registration"}>
      <div className={"registration-section registration-section__image"}>
        <div className={"registration-section__image-text"}>
          <h4 className={"heading-text"}>Choose a Date Range</h4>
          <p className={"body-text"}>
            {
              "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut la"
            }
          </p>
        </div>
      </div>
      <div
        className={
          "registration-section registration-section__form box-shadow--paper bg--white"
        }
      >
        <h4 className={"heading-text registration-section__form-title"}>
          Create an Account
        </h4>
        <form className={"registration-section__form-form"}>
          <Input
            label={"Your Email Address"}
            type={"email"}
            name={"email"}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            error={touched.email ? errors.email : ""}
          />
          <Input
            label={"Your Password"}
            type={"password"}
            name={"password"}
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            error={touched.password ? errors.password : ""}
          />
          <Input
            label={"Confirm Your Password"}
            type={"password"}
            name={"confirmPassword"}
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            error={touched.confirmPassword ? errors.confirmPassword : ""}
          />
          <Input
            label={"Your Full Name"}
            type={"text"}
            name={"name"}
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            error={touched.name ? errors.name : ""}
          />
          <Input
            label={"Your Phone Number"}
            type={"text"}
            name={"phoneNumber"}
            value={formData.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phoneNumber ? errors.phoneNumber : ""}
          />

          <Checkbox
            label={"I read and agree to the terms and conditions"}
            name={"isAgree"}
            checked={isAgree}
            id={"is_agree"}
            onChange={() => setIsAgree(!isAgree)}
          />
          <div className={"mt registration-section__form-button"}>
            <Button
              disabled={!isAgree || !noErrors}
              onClick={() => {
                props.onAccountCreate();
              }}
              type={"button"}
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
