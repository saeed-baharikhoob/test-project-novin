import { QueryClient, QueryCache } from '@tanstack/react-query';
interface CustomError extends Error {
    response?: {
        status?: number;
    };
}
const createQueryClient = () => {
    let instance: QueryClient | null = null;

    return () => {
        if (!instance) {
            instance = new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                    },
                },
                queryCache: new QueryCache({
                    onError: (error:CustomError) => {
                        if (error?.response?.status === 401)
                        {
                        }
                    },
                }),

            });
        }

        return instance;
    };
};

const queryClient = createQueryClient();

export default queryClient;
