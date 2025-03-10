// pages/index.js
export default function About({ data }: { data: { message: string } }) {
  return (
    <div>
      <h1>Static Site Generation</h1>
      <p>{data.message}</p>
    </div>
  );
}

export async function getStaticProps() {
  // Fetch dữ liệu tại thời điểm build
  const data = { message: "Hello from SSG!a" };
  const res = await fetch('https://api.vercel.app/blog').then(r => r.json());
  console.log(1111, res)
  // Có thể fetch từ API: const res = await fetch('https://api.example.com/data');
  return {
    props: {
      data,
    },
  };
}