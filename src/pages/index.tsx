import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    fetch('http://localhost:3333/episodes')
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <>
      <h1>Simple Home</h1>
    </>
  );
}
