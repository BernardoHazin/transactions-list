import exec from "exec-sh";

export default async () => {
  console.log("\n -------- INIT SETUP ---------");
  const schemaPath = "./src/main/prisma/schema.prisma";
  await exec.promise(
    `yarn prisma migrate reset --force --schema=${schemaPath}`
  );
  console.log("\n -------- END SETUP ---------");
};
