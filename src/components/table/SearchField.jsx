import { Autocomplete, Box, Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import AutoFormPicker from "../form/AutoFormPicker";
import InputField from "../form/InputField";
import SearchIcon from "@mui/icons-material/Search";
import DateFormPicker from "../../components/form/DateFormPicker";
import { useState } from "react";

const SearchField = ({
  onSubmit,
  control,
  errors,
  register,
  options,
  watch,
}) => {
  const [value, setValue] = useState();
  let values;
  if (watch) {
    values = watch();
  }
  useEffect(() => {
    values?.search_by && setValue(values?.search_by.id || "");

    return () => {
      null;
    };
  }, [values]);

  return (
    <form onSubmit={onSubmit} className="table__filter-wrapper">
      <AutoFormPicker
        control={control}
        options={options}
        name="search_by"
        label="Search By"
        errors={errors}
        showId={false}
      />

      {value === "trip_date" || value === "createdAt" ? (
        <DateFormPicker
          name="date"
          control={control}
          label="Date"
          errors={errors}
        />
      ) : (
        <InputField
          {...register("search")}
          id="search"
          label="Search"
          autoComplete="off"
          errors={errors}
          className="filter-textfield"
        />
      )}

      <Button
        className="filter-button"
        variant="contained"
        startIcon={<SearchIcon />}
        type="submit"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchField;
