import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { buyersService } from "@/services/buyers.service";

export const buyerKeys = {
  all: ["buyers"] as const,
};

export function useBuyers() {
  return useQuery({
    queryKey: buyerKeys.all,
    queryFn: () => buyersService.list(),
  });
}

export function useToggleBuyerSuspend() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name, suspended }: { name: string; suspended: boolean }) =>
      buyersService.toggleSuspend(name, suspended),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: buyerKeys.all });
    },
  });
}
