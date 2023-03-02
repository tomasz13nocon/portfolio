import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  console.log("server load [test]");
  console.log(params);
  return {
    name: params.test,
  };
};
