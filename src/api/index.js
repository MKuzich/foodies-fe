import api, { setAuthToken } from "./api";
import * as auth from "./auth";
import * as testimonials from "./testimonials";
import * as users from "./users";

export default {
  setAuthToken,
  axios: api,
  auth,
  testimonials,
  users,
};
