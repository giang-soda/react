import Link from "next/link";
import { Flex, Text, Button } from "@radix-ui/themes";

/**
 * route /dashboard
 */

export default function Dashboard() {
  return (
    <div className="">
      <Link className="text-lg" href={`/`}>
        HOME
      </Link>
      <Link className="text-lg" href={`/dashboard/blog`}>
        GO TO block
      </Link>
      <main className="">
        <h1>Dashboard</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Button
        </button>

        <h1>Radix theme</h1>
        <Flex direction="column" gap="2">
          <Text>Hello from Radix Themes :)</Text>
          <Button>Let{"'"}s go</Button>
        </Flex>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <h2>footer</h2>
      </footer>
    </div>
  );
}
