import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as Yup from "yup";

import css from "./ChageAvatarForm.module.css";

const schema = Yup.object().shape({
  avatarFile: Yup.mixed()
    .required("File is required")
    .test("fileSize", "File size must be less than 1MB", (value) => {
      return value && value[0].size <= 1024 * 1024;
    })
    .test("fileFormat", "File format must be .png, .jpg, .jpeg", (value) => {
      return value && (value[0].type === "image/png" || value[0].type === "image/jpeg");
    }),
});

const ChageAvatarForm = ({ onSubmit, inputId }) => {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const userAvatarFieldValue = watch("avatarFile");

  useEffect(() => {
    const file = userAvatarFieldValue?.[0];
    if (!file) return;

    const submit = async () => {
      const isValid = await trigger("avatarFile");
      if (!isValid) {
        toast.error(errors.avatarFile.message);
        return;
      }
      await onSubmit({ avatarFile: userAvatarFieldValue });
      reset();
    };
    submit();
  }, [userAvatarFieldValue]);

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <input {...register("avatarFile")} type="file" className={css.input} id={inputId} />
    </form>
  );
};
export default ChageAvatarForm;
