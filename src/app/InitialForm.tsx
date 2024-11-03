'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from './utils';
import { useDebounce } from './useDebounce';
import { formSchema, TVShow, TVShowDropdown, FormDataTVShow } from './types';
import { LoaderCircle } from 'lucide-react';

export function InitialForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      nativeLanguage: '',
      targetLanguage: '',
      proficiencyLevel: 'beginner',
      favoriteShow: '',
    },
  });

  const [shows, setShows] = useState<TVShow[]>([]);
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const debouncedInputValue = useDebounce(inputValue, 500);

  const fetchShows = async (query: string) => {
    setLoading(true);
    if (query.length === 0) {
      setShows([]);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`/api/searchShows`, {
        params: { query },
      });

      const fetchedShowsWithSubtitles = response.data.map(
        (tvshow: TVShowDropdown) => ({
          name: tvshow.name,
          id: tvshow.id,
          popularity: tvshow.popularity,
        })
      );

      setShows(fetchedShowsWithSubtitles);
    } catch (error) {
      console.error('Error fetching shows:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShows(debouncedInputValue);
  }, [debouncedInputValue]);

  const onSubmit: SubmitHandler<FormDataTVShow> = async (data) => {
    setLoading(true);
    try {
      const response: Response = await fetch(`${apiUrl}/submit-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorDetail = await response.json();
        if (
          errorDetail.error.includes('no found') ||
          errorDetail.error.includes('not found')
        ) {
          setFeedback({
            message: 'Sorry, this show has no subtitles available for now.',
            type: 'error',
          });
        }
        console.error(`Error ${response.status}: ${errorDetail.error}`);
      } else {
        setFeedback({
          message: 'Request submitted successfully! Check your email!',
          type: 'success',
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nativeLanguage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Native Language</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., English" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetLanguage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Language</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Spanish" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="proficiencyLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proficiency Level</FormLabel>
                  <FormControl>
                    <select {...field}>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="favoriteShow"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favorite Show</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Search for your favorite show"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setInputValue(e.target.value);
                        setFeedback({ message: '', type: '' });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  {shows.length > 0 && (
                    <ul className="absolute z-10 bg-white border border-gray-300 rounded-md max-h-20 md:max-h-32 overflow-y-auto w-fit">
                      {shows.map((show) => (
                        <li
                          key={show.id}
                          className="p-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            field.onChange(show.name);
                            setShows([]);
                          }}
                        >
                          {show.name}
                        </li>
                      ))}
                    </ul>
                  )}
                  {(feedback.type === 'error' ||
                    feedback.type === 'success') && <p>{feedback.message}</p>}
                </FormItem>
              )}
            />

            <Button type="submit">
              {loading ? <LoaderCircle className="animate-spin" /> : 'Submit'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
