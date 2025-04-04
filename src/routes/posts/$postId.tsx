import { createFileRoute } from '@tanstack/react-router'

// Dynamic URL Parameter

export const Route = createFileRoute('/posts/$postId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    // {throw new Error()} | Throw error for testing.
    /* Allows the system to properly load (Idea to possibly add a loading screen?) */
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      postId: params.postId,
    };
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error!</div>,
});

function RouteComponent() {
  const { postId } = Route.useLoaderData();
  return <div>Hello {postId}!</div>
}
