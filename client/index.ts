import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
      async headers(){
        return{
           Authorization:"Bearer 123"
        }
      }
    }),
  ],
});

async function main(){
  let response=await trpc.singUp.mutate({
    email:"suhel@gmail.com",
    password:"123434"
  })
  console.log(response);
}
main();