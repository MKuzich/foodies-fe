import api, { setAuthToken } from "./api";
import * as auth from "./auth";
import * as testimonials from "./testimonials";

export default {
  setAuthToken,
  createApi: api,
  auth,
  testimonials,
};
