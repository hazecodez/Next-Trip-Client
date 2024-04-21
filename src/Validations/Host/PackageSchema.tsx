import Yup from "yup";

const PackageSchema = Yup.object().shape({
  name: Yup.string().required("Package Name is required."),
  capacity: Yup.number().required("Maximum capacity required."),
  destination: Yup.string().required("Destination is required."),
  dur_start: Yup.date().required("Duration start date is required."),
  dur_end: Yup.date().required("Duration end date is required."),
  stay: Yup.string().required("Stay is required."),
  room_type: Yup.string().required("Room is required."),
  amenities: Yup.string().required("Amenities is required."),
  food: Yup.string(),
  depa_airport: Yup.string(),
  arrival_airport: Yup.string(),
  book_start: Yup.number().required("Booking start date is required."),
  book_end: Yup.number().required("Booking end date is required."),
  images: Yup.mixed().required("Images is required."),
  activities: Yup.string().required("Activities is required."),
  price: Yup.number().required("Package price is required"),
  itinerary: Yup.string().required("Itineraries is required."),
});

export default PackageSchema;
