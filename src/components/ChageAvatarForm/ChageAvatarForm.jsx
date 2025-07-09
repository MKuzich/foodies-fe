import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import css from "./ChageAvatarForm.module.css";

const schema = Yup.object().shape({
  avatarFile: Yup.mixed()
    .required("File is required")
    .test("fileSize", "File size must be less than 1MB", (value) => {
      return value && value[0].size <= 1024 * 1024;
    })
    .test("fileFormat", "File format must be .png, .jpg, .jpeg", (value) => {
      return (
        value &&
        (value[0].type === "image/png" || value[0].type === "image/jpeg")
      );
    }),
});

const ChageAvatarForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const userAvatarFieldValue = watch("avatarFile");
  useEffect(() => {
    if (userAvatarFieldValue == undefined) return;
    if (userAvatarFieldValue.length === 0) return;
    handleSubmit(onSubmit)();
  }, [userAvatarFieldValue]);

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <input {...register("avatarFile")} type="file" className={css.input} />
      {errors.avatarFile && (
        <div className={css.error}>{errors.avatarFile.message}</div>
      )}
    </form>
  );
};
export default ChageAvatarForm;
