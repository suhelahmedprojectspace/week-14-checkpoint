import { publicProcedure, router } from './trpc';
import {z} from "zod"
import { createHTTPServer } from '@trpc/server/adapters/standalone';
const todoInputType=z.object({
  title:z.string().min(8,'mininum 8 characters'),
  description:z.string().min(8,'mininum 8 character long description')
})
 
const appRouter = router({
  createTodo:publicProcedure 
  .input(todoInputType)
  .mutation(async (opts)=>{
    console.log(opts.ctx.username);
    const tiltle=opts.input.title;
    const description=opts.input.description;

    return { id:"1" ,}
  }),
  singUp:publicProcedure
  .input(z.object({
    email:z.string(),
    password:z.string(),
  }))
  .mutation(async(opts)=>{
    const email=opts.input.email;
    const description=opts.input.password;

    let token="122343443"
    return{
      token
    }
  })
});
 
const server=createHTTPServer({
  router:appRouter,
  createContext(opts){
    let authHeader=opts.req.headers["authorization"];
    console.log(authHeader);
    return{
      username:"123"
    }
  }
})
server.listen(3000);
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;