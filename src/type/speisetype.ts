
type SpeiseType = {
  id: number;
  name: string;
  description: string;
  variants: string[];
  price: number;
  rating: RatingType;
  extras: string[];
  liked: boolean;
}

type RatingType = {
  votes: number;
  score: number;
}