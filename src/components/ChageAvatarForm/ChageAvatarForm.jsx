import React from "react";
import { Formik } from "formik";
import { Form } from "formik";
import * as Yup from "yup";
import css from "./ChageAvatarForm.module.css";
import { ErrorMessage } from "formik";

const ChageAvatarForm = ({ onSubmit }) => {
  const onChange = async ({ e, ...props }) => {
    const file = e.currentTarget.files[0];
    await props.setTouched({ avatarFile: true });
    await props.setFieldValue("avatarFile", file);

    const errors = await props.validateForm();
    if (!errors.avatarFile) {
      props.submitForm();
    }
  };
  const avatarForm = {
    initialValues: {
      avatarFile: null,
    },
    schema: Yup.object({
      avatarFile: Yup.mixed()
        .required("File is required")
        .test("fileSize", "File size must be less than 1MB", (value) => {
          if (!value) {
            return true;
          }
          return value.size <= 1024 * 1024;
        })
        .test(
          "fileFormat",
          "File format must be .png, .jpg, .jpeg",
          (value) => {
            if (!value) {
              return true;
            }
            return value.type === "image/png" || value.type === "image/jpeg";
          }
        ),
    }),
    submit: (values) => {
      onSubmit(values);
    },
  };
  return (
    <Formik
      initialValues={avatarForm.initialValues}
      onSubmit={avatarForm.submit}
      validationSchema={avatarForm.schema}
    >
      {({ ...props }) => (
        <Form className={css.form}>
          <input
            type="file"
            name="avatarFile"
            className={css.input}
            onChange={(e) => onChange({ e, ...props })}
          />
          <ErrorMessage name="avatarFile">
            {(msg) => <div className={css.error}>{msg}</div>}
          </ErrorMessage>
        </Form>
      )}
    </Formik>
  );
};
export default ChageAvatarForm;
