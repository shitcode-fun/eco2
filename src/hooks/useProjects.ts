import { useQuery } from '@tanstack/react-query';

export function useProjects() {
  return useQuery<Array<{
      id: string;
      name: string;
      description: string;
      url: string;
    }>, Error>({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      if (!res.ok) {
        throw new Error('Failed to fetch projects');
      }
      return (await res.json()) as Array<{
        id: string;
        name: string;
        description: string;
        url: string;
      }>;
    },
  });
}