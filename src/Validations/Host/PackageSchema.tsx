import * as Yup from "yup";

const PackageSchema = Yup.object().shape({
  _id: Yup.string(),
  name: Yup.string().required("Package Name is required."),
  capacity: Yup.number()
    .required("Maximum capacity required.")
    .min(1, "Capacity must be a positive number."),
  destination: Yup.string().required("Destination is required."),
  dur_start: Yup.date()
    .required("Duration start date is required.")
    .test({
      name: "dateLessThan",
      exclusive: true,
      message: "Duration start date must be less than Duration end date",
      test: function (value) {
        const durEnd = this.resolve(Yup.ref("dur_end"));
        return !durEnd || value < durEnd;
      },
    }),
  dur_end: Yup.date()
    .required("Duration end date is required.")
    .test({
      name: "dateGreaterThan",
      exclusive: true,
      message: "Duration end date must be greater than Duration start date",
      test: function (value) {
        const durStart = this.resolve(Yup.ref("dur_start"));
        return !durStart || value > durStart;
      },
    }),
  stay: Yup.string().required("Stay is required."),
  room_type: Yup.string().required("Room is required."),
  amenities: Yup.string().required("Amenities is required."),
  food: Yup.string().required("Food is required."),
  depa_airport: Yup.string(),
  arrival_airport: Yup.string(),
  arrival_time: Yup.date().min(
    Yup.ref("depa_time"),
    "Arrival  date must be greater than Departure date."
  ),
  depa_time: Yup.date(),
  book_start: Yup.date()
    .required("Booking start date is required.")
    .max(
      Yup.ref("dur_start"),
      "Booking start date must be before Duration start date."
    ),
  book_end: Yup.date()
    .required("Booking end date is required.")
    .max(
      Yup.ref("dur_start"),
      "Booking end date must be before Duration start date."
    )
    .min(
      Yup.ref("book_start"),
      "Booking end date must be after Booking start date."
    ),
  activities: Yup.string().required("Activities is required."),
  price: Yup.number()
    .required("Package price is required")
    .min(1, "Price must be positive number."),
  itinerary: Yup.string().required("Itineraries is required."),
});

export default PackageSchema;
