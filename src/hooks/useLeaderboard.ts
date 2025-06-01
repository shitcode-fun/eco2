import { useQuery } from '@tanstack/react-query';

export function useLeaderboard() {
  return useQuery<Array<{ user: string; score: number }>, Error>({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const res = await fetch('/api/leaderboard');
      if (!res.ok) {
        throw new Error('Failed to fetch leaderboard');
      }
      return (await res.json()) as Array<{ user: string; score: number }>;
    },
  });
}