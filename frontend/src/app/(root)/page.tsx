import Link from "next/link";

const Home = () => {
  return (
    <>
      <h1>Home page</h1>
      <Link href="/client/new">Create new client</Link>
    </>
  );
};

export default Home;
