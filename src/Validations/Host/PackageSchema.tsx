import * as Yup from "yup";

const PackageSchema = Yup.object().shape({
  name: Yup.string().required("Package Name is required."),
  capacity: Yup.string().required("Maximum capacity required."),
  destination: Yup.string().required("Destination is required."),
  dur_start: Yup.string().required("Duration start date is required."),
  dur_end: Yup.string().required("Duration end date is required."),
  stay: Yup.string().required("Stay is required."),
  room_type: Yup.string().required("Room is required."),
  amenities: Yup.string().required("Amenities is required."),
  food: Yup.string().required("Food is required."),
  depa_airport: Yup.string(),
  arrival_airport: Yup.string(),
  arrival_time: Yup.string(),
  depa_time: Yup.string(),
  book_start: Yup.string().required("Booking start date is required."),
  book_end: Yup.string().required("Booking end date is required."),
  activities: Yup.string().required("Activities is required."),
  price: Yup.string().required("Package price is required"),
  itinerary: Yup.string().required("Itineraries is required."),
});

export default PackageSchema;
