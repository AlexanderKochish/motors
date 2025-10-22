export const getStatusVariant = (status: string) => {
  switch (status) {
    case "confirmed":
      return "badgeDefault";
    case "pending":
      return "badgeSecondary";
    case "cancelled":
      return "badgeDestructive";
    default:
      return "badgeDefault";
  }
};
