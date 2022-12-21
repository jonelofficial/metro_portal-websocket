import {
  Autocomplete,
  Button,
  createFilterOptions,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "react-image-upload/dist/index.css";
import React, { memo, useState } from "react";
import InputField from "../../form/InputField";
import ImageUploader from "react-image-upload/dist";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";
import { Box, Stack } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema, userUpdateSchema } from "../../../utility/schema";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "../../../api/metroApi";
import { useEffect } from "react";
import { department } from "../../../utility/department";

const UserDrawer = ({ open, item }) => {
  const [trip, setTrip] = useState(item ? item.trip_template : "");
  const [role, setRole] = useState(item ? item.role : "");
  const [status, setStatus] = useState(item ? item?.status || "" : "");
  const [image, setImage] = useState();
  const [value, setValue] = useState(item ? item.license_exp : dayjs());

  const [createUser, { isLoading }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue: setFormValue,
  } = useForm({
    resolver: yupResolver(item ? userUpdateSchema : userSchema),
    mode: "onSubmit",
    defaultValues: { department: null },
  });

  useEffect(() => {
    if (item?.department) {
      setFormValue("department", item.department);
    }

    return () => {
      null;
    };
  }, [item]);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      let res;
      const form = new FormData();
      (item?.profile != null || image?.imageFile.file != null) &&
        form.append("image", image?.imageFile.file);
      form.append("employee_id", data.employee_id);
      form.append("first_name", data.first_name);
      form.append("last_name", data.last_name);
      form.append("username", data.username);
      form.append("password", data.password.length > 0 ? data.password : null);
      form.append("trip_template", data.trip_template);
      form.append("role", data.role);
      form.append("status", data.status);
      // form.append(
      //   "department",
      //   `${data.department?.id} - ${data.department?.label}`
      // );
      form.append("department", JSON.stringify(data.department));
      form.append("license_exp", data.license_exp);
      if (item) {
        res = await updateUser({ id: item._id, obj: form });
        console.log(res);
      } else {
        res = await createUser(form);
        console.log(res);
      }
      if (res?.error) {
        alert(res.error.data.error);
      } else {
        open(false);
      }
    } catch (e) {
      console.log("ERROR CREATE USER: ", e);
    }
  };

  function getImageFileObject(imageFile) {
    setImage({ imageFile });
  }
  function runAfterImageDelete(file) {
    // console.log({ file });
  }

  const handleChangeTrip = (event) => {
    setTrip(event.target.value);
  };

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const [filterVal, setFilterVal] = useState();

  return (
    <Box className="drawer">
      <Box className="drawer__title-wrapper">
        <Typography variant="h6" className="drawer__title">
          {item ? "Update User" : "Create User"}
        </Typography>
      </Box>

      <Divider />

      <form onSubmit={handleSubmit(onSubmit)} className="drawer__form">
        <Box className="drawer__form-wrapper">
          <Stack spacing={2}>
            <Box className="drawer__form-image">
              {item?.profile && image == null ? (
                <Box sx={{ position: "relative" }}>
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: 0,
                      padding: 0,
                    }}
                    color="customDanger"
                    onClick={() => setImage({})}
                  >
                    <DoNotDisturbOnIcon />
                  </IconButton>
                  <Box
                    component="img"
                    sx={{
                      height: "auto",
                      maxWidth: 100,
                      display: "block",
                      margin: "0 auto",
                    }}
                    alt="Metro GPS"
                    src={`${process.env.BASEURL}/${item.profile}`}
                  />
                </Box>
              ) : (
                <ImageUploader
                  onFileAdded={(img) => getImageFileObject(img)}
                  onFileRemoved={(img) => runAfterImageDelete(img)}
                />
              )}
            </Box>

            <Controller
              control={control}
              name="department"
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  className="filter"
                  size="small"
                  options={department}
                  value={value}
                  // value={item && item?.department}
                  isOptionEqualToValue={(option, value) =>
                    `${option.id} - ${option.label}` ===
                    `${option.id} - ${option.label}`
                  }
                  // getOptionLabel={(option) => `${option.id} - ${option.label}`}
                  getOptionLabel={(option) => `${option.id} - ${option.label}`}
                  renderInput={(params) => (
                    <TextField {...params} label="Deparment" />
                  )}
                  onChange={(e, value) => onChange(value)}
                />
              )}
            />
            {/* <Box>
              <FormControl fullWidth size="small">
                <InputLabel id="select-label">Department</InputLabel>
                <Select
                  {...register("department")}
                  labelId="select-label"
                  label="Trip Template"
                  sx={{ width: "100%" }}
                  value={trip}
                  onChange={handleChangeTrip}
                >
                  <MenuItem value="office">Office</MenuItem>
                  <MenuItem value="hauling">Hauling</MenuItem>
                  <MenuItem value="delivery">Delivery</MenuItem>
                  <MenuItem value="feeds_delivery">Feeds Delivery</MenuItem>
                </Select>
              </FormControl>
            </Box> */}
            {errors["department"] && (
              <Typography
                variant="p"
                sx={{
                  fontFamily: "Roboto",
                  fontSize: 12,
                  marginBottom: 1,
                  marginLeft: 1,
                  color: "custom.danger",
                }}
              >
                {errors["department"].message}
              </Typography>
            )}

            <InputField
              {...register("employee_id")}
              id="employee_id"
              label="Employee Id"
              autoComplete="off"
              errors={errors}
              sx={{ width: "100%" }}
              defaultValue={item && item.employee_id}
            />
            <InputField
              {...register("first_name")}
              id="first_name"
              label="First Name"
              autoComplete="off"
              errors={errors}
              sx={{ width: "100%" }}
              defaultValue={item && item.first_name}
            />
            <InputField
              {...register("last_name")}
              id="last_name"
              label="Last Name"
              autoComplete="off"
              errors={errors}
              sx={{ width: "100%" }}
              defaultValue={item && item.last_name}
            />
            <InputField
              {...register("username")}
              id="username"
              label="Username"
              autoComplete="off"
              errors={errors}
              sx={{ width: "100%" }}
              defaultValue={item && item.username}
            />
            <InputField
              {...register("password")}
              id="password"
              label="Password"
              autoComplete="off"
              errors={errors}
              type="password"
              sx={{ width: "100%" }}
            />
            <Controller
              name="license_exp"
              control={control}
              defaultValue={value}
              render={({ field: { onChange } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={value}
                    label="License Expiration"
                    onChange={(newValue) => {
                      onChange(newValue);
                      setValue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField size="small" {...params} />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
            {errors["license_exp"] && (
              <Typography
                variant="p"
                sx={{
                  fontFamily: "Roboto",
                  fontSize: 12,
                  marginBottom: 1,
                  marginLeft: 1,
                  color: "custom.danger",
                }}
              >
                {errors["license_exp"].message}
              </Typography>
            )}
            <Box>
              <FormControl fullWidth size="small">
                <InputLabel id="select-label">Trip Template</InputLabel>
                <Select
                  {...register("trip_template")}
                  labelId="select-label"
                  label="Trip Template"
                  sx={{ width: "100%" }}
                  value={trip}
                  onChange={handleChangeTrip}
                >
                  <MenuItem value="office">Office</MenuItem>
                  <MenuItem value="hauling">Hauling</MenuItem>
                  <MenuItem value="delivery">Delivery</MenuItem>
                  <MenuItem value="feeds_delivery">Feeds Delivery</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {errors["trip_template"] && (
              <Typography
                variant="p"
                sx={{
                  fontFamily: "Roboto",
                  fontSize: 12,
                  marginBottom: 1,
                  marginLeft: 1,
                  color: "custom.danger",
                }}
              >
                {errors["trip_template"].message}
              </Typography>
            )}
            <Box>
              <FormControl fullWidth size="small">
                <InputLabel id="select-label">Role</InputLabel>
                <Select
                  {...register("role")}
                  labelId="select-label"
                  label="Role"
                  sx={{ width: "100%" }}
                  value={role}
                  onChange={handleChangeRole}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="driver">Driver</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {errors["role"] && (
              <Typography
                variant="p"
                sx={{
                  fontFamily: "Roboto",
                  fontSize: 12,
                  marginBottom: 1,
                  marginLeft: 1,
                  color: "custom.danger",
                }}
              >
                {errors["role"].message}
              </Typography>
            )}
            <Box>
              <FormControl fullWidth size="small">
                <InputLabel id="select-label">Status</InputLabel>
                <Select
                  {...register("status")}
                  labelId="select-label"
                  label="Status"
                  sx={{ width: "100%" }}
                  value={status}
                  onChange={handleChangeStatus}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="archived">Archived</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {errors["status"] && (
              <Typography
                variant="p"
                sx={{
                  fontFamily: "Roboto",
                  fontSize: 12,
                  marginBottom: 1,
                  marginLeft: 1,
                  color: "custom.danger",
                }}
              >
                {errors["status"].message}
              </Typography>
            )}
          </Stack>

          <Box className="drawer__form-button">
            <Button
              sx={{ marginRight: "20px" }}
              color="customDanger"
              onClick={() => open(false)}
            >
              Cancel
            </Button>

            <LoadingButton
              variant="contained"
              type="submit"
              color={item ? "customWarning" : "customSuccess"}
              loading={item ? isUpdating : isLoading}
            >
              {item ? "Update" : "Create"}
            </LoadingButton>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default memo(UserDrawer);
