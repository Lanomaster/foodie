type RestaurantType = {
  restaurantName: string;
  description: string;
  minOrderValue: number;
  freeDeliveryThreshold: number;
  menu: SpeiseType[];
}