import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().label("Password"),
});

export const searchSchema = Yup.object().shape({
  search_by: Yup.object().required().label("Search"),
  // .required()
  search: Yup.string().label("Search"),
  date: Yup.date().required().label("Date"),
});

export const searchNoDateSchema = Yup.object().shape({
  search_by: Yup.object().required().label("Search"),
  // .required()
  search: Yup.string().label("Search"),
});

export const userSchema = Yup.object().shape({
  division: Yup.string().required().label("Division"),
  company: Yup.string().required().label("Company"),
  division_category: Yup.string().required().label("Division Category"),
  location: Yup.string().required().label("Location"),
  sub_unit: Yup.string().required().label("Sub Unit"),
  department: Yup.string().required().label("Department"),
  employee_id: Yup.string()
    .transform((e) => e?.general_info?.full_id_number)
    .required()
    .label("Employee Id"),
  first_name: Yup.string().required().label("First name"),
  last_name: Yup.string().required().label("Last name"),
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().label("Password"),
  license_exp: Yup.date()
    .required()
    .typeError("License Expiration is a required field")
    .label("License Expiration"),
  trip_template: Yup.string().required().label("Trip template"),
  role: Yup.string().required().label("Role"),
  status: Yup.string().required().label("Status"),
});

export const userUpdateSchema = Yup.object().shape({
  // department: Yup.object().required().label("Department"),
  // employee_id: Yup.string().required().label("Employee Id"),
  // first_name: Yup.string().required().label("First name"),
  // last_name: Yup.string().required().label("Last name"),
  // username: Yup.string().required().label("Username"),
  // license_exp: Yup.date().required().label("License expiration"),
  // trip_template: Yup.string().required().label("Trip template"),
  // role: Yup.string().required().label("Role"),
  // status: Yup.string().required().label("Status"),
  // sub_unit: Yup.object().required().label("Sub Unit"),
  // location: Yup.object().required().label("Location"),
  // division: Yup.object().required().label("Division"),
  // division_category: Yup.object().required().label("Division Category"),
  // company: Yup.object().required().label("Company"),
  division: Yup.string().required().label("Division"),
  company: Yup.string().required().label("Company"),
  division_category: Yup.string().required().label("Division Category"),
  location: Yup.string().required().label("Location"),
  sub_unit: Yup.string().required().label("Sub Unit"),
  department: Yup.string().required().label("Department"),
  employee_id: Yup.string()
    .transform((e) => e?.general_info?.full_id_number)
    .required()
    .label("Employee Id"),
  first_name: Yup.string().required().label("First name"),
  last_name: Yup.string().required().label("Last name"),
  username: Yup.string().required().label("Username"),
  license_exp: Yup.date()
    .required()
    .typeError("License Expiration is a required field")
    .label("License Expiration"),
  trip_template: Yup.string().required().label("Trip template"),
  role: Yup.string().required().label("Role"),
  status: Yup.string().required().label("Status"),
});

export const vehicleSchema = Yup.object().shape({
  department: Yup.object().required().label("Department"),
  plate_no: Yup.string()
    .matches(/^\S*$/, "No space allowed")
    .required()
    .label("Plate Number"),
  vehicle_type: Yup.string().required().label("Vehicle Type"),
  name: Yup.string().required().label("Name"),
  brand: Yup.string().required().label("Brand"),
  fuel_type: Yup.string().required().label("Fuel Type"),
  km_per_liter: Yup.string()
    .matches(/^\d+\.?\d*$/, "Must be only digits")
    .required()
    .label("KMPL"),
});

export const gasStationSchema = Yup.object().shape({
  label: Yup.string().required().label("Label"),
});
