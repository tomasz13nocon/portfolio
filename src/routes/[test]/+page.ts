import type { PageLoad } from "./$types";

export const load: PageLoad = (data) => {
  console.log("universal load [test]");
  console.log(data);
  return {
    ...data.data,
    some: "data from test/page.ts",
  };
};
