import { z } from 'zod';

export const VALID_LANGUAGES: string[] = [
  'Arabic',
  'Bulgarian',
  'Brazilian Portuguese',
  'British English',
  'Chinese',
  'Czech',
  'Danish',
  'Dutch',
  'English',
  'Estonian',
  'Finnish',
  'French',
  'German',
  'Greek',
  'Hungarian',
  'Indonesian',
  'Italian',
  'Japanese',
  'Korean',
  'Latvian',
  'Lithuanian',
  'Norwegian',
  'Polish',
  'Portuguese',
  'Romanian',
  'Russian',
  'Slovak',
  'Slovenian',
  'Spanish',
  'Swedish',
  'Turkish',
  'Ukrainian',
  // Keep in alphabetical order
];

const validLanguageSchema = z
  .string()
  .min(2, 'Language is required')
  .transform((input) => input.trim())
  .refine(
    (input) =>
      VALID_LANGUAGES.some(
        (lang) => lang.toLowerCase() === input.toLowerCase()
      ),
    {
      message: 'Invalid language. Please enter a valid language.',
    }
  );

export const formSchema = z.object({
  name: z
    .string()
    .min(3, 'Please make sure your name is at least three characters long.')
    .regex(
      /^[A-Za-z]+$/,
      'Name can only contain letters (no spaces, numbers, or special characters).'
    ),
  email: z.string().email('Invalid email format'),
  nativeLanguage: validLanguageSchema,
  targetLanguage: validLanguageSchema,
  proficiencyLevel: z.enum(['beginner', 'intermediate']),
  favoriteShow: z.string().min(3, 'Favorite show is required'),
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
