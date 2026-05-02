// Edit this file to customize the studio location across the site.
// `mapQuery` accepts any address, place, or coordinates Google Maps understands.
export const studioLocation = {
  name: "ATNE Performance Studio",
  addressLine: "5000 France Ave S",
  city: "Edina",
  region: "MN",
  postalCode: "55410",
  country: "USA",
  // Used by the embedded Google Map (no API key required).
  // Examples: "Edina, Minnesota", "5000 France Ave S, Edina, MN 55410", "44.9128,-93.3289"
  mapQuery: "5000 France Ave S, Edina, MN 55410",
  // Convenience link for "Open in Google Maps"
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=5000+France+Ave+S+Edina+MN+55410",
  phone: "(612) 555-0144",
  email: "hello@atneperformance.com",
  serviceArea: "Minneapolis, St. Paul, Edina, Minnetonka, Woodbury & the greater Twin Cities",
};

export const fullAddress = (() => {
  const l = studioLocation;
  return `${l.addressLine}, ${l.city}, ${l.region} ${l.postalCode}`;
})();