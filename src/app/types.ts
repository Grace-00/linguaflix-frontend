import { z } from 'zod';
export const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  nativeLanguage: z.string().min(1, 'Native language is required'),
  targetLanguage: z.string().min(1, 'Target language is required'),
  proficiencyLevel: z.enum(['beginner', 'intermediate', 'advanced'], {
    required_error: 'Proficiency level is required',
  }),
  favoriteShow: z.string().min(1, 'Favorite show is required'),
});

export type TVShow = {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export type TVShowDropdown = Pick<TVShow, 'id' | 'name' | 'popularity'>;

export type FormDataTVShow = {
  name: string;
  email: string;
  nativeLanguage: string;
  targetLanguage: string;
  proficiencyLevel: string;
  favoriteShow: string;
};
