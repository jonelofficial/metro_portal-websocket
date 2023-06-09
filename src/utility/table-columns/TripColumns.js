export const columns = [
  { id: "icon", label: "", minWidth: 60 },
  { id: "trip_date", label: "Trip Date", minWidth: 80 },
  {
    id: "createdAt",
    label: "Sync Date",
    minWidth: 90,
  },
  { id: "_id", label: "Id" },
  { id: "user_id", label: "User Id", minWidth: 80 },
  { id: "department", label: "Department", minWidth: 80 },
  { id: "vehicle_id", label: "Plate #", minWidth: 80 },
  { id: "duration", label: "Duration", minWidth: 80 },
  { id: "start", label: "Start", minWidth: 80 },
  { id: "end", label: "End", minWidth: 80 },
  // { id: "locations", label: "Locations" },
  { id: "diesels", label: "Diesels" },
  { id: "estimated_odo", label: "Estimated Odometer", minWidth: 160 },
  { id: "odometer", label: "Odometer" },
  { id: "odometer_done", label: "Odometer Done", minWidth: 120 },
  {
    id: "odometer_image_path",
    label: "Odometer Image",
    minWidth: 130,
  },
  { id: "companion", label: "Companion" },
  { id: "charging", label: "Charging" },

  { id: "others", label: "Others" },

  {
    id: "action",
    label: "Action",
  },
];

export const dropData = [
  { id: "_id", label: "Id" },
  { id: "user_id.employee_id", label: "User Id" },
  // { id: "user_id.department.label", label: "Department", minWidth: 80 },
  { id: "user_id.department", label: "Department", minWidth: 80 },
  { id: "vehicle_id.plate_no", label: "Plate #" },
  // { id: "locations.address.city", label: "Locations" },
  { id: "diesels.gas_station_name", label: "Diesels Gas Station" },
  { id: "odometer", label: "Odometer" },
  { id: "odometer_done", label: "Odometer Done" },
  // { id: "companion.firstName", label: "Companion" },
  { id: "companion.first_name", label: "Companion" },
  { id: "others", label: "Others" },
  { id: "trip_date", label: "Trip Date" },
  { id: "createdAt", label: "Sync Date" },
];
