export const permissions = [
  {
    role: "user",
    actions: ["get_adverts", "get_one_advert", "update_profile", "get_profile"],
  },

  {
    role: "vendor",
    actions: [
      "get_adverts",
      "get_one_advert",
      "update_profile",
      "get_profile",
      "add_advert",
      "update_advert",
      "delete_advert",
    ],
  },
];
