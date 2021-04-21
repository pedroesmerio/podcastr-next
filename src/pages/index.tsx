//-------------------SPA---------------------
//import { useEffect } from 'react';

//export default function Home() {
//useEffect(() => {
//fetch('http://localhost:3333/episodes')
//.then((res) => res.json())
//.then((data) => console.log(data));
//}, []);

//return (
//<>
//<h1>Simple Home</h1>
//</>
//);
//}

//-------------------SSR---------------------
export default function Home(props) {
  console.log(props.episodes);

  return (
    <>
      <h1>Simple Home</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3333/episodes');
  const data = await res.json();
  return {
    props: {
      episodes: data,
    },
  };
}

//-------------------SSG---------------------
//export default function Home(props) {
//console.log(props.episodes);

//return (
//<>
//<h1>Simple Home</h1>
//<p>{JSON.stringify(props.episodes)}</p>
//</>
//);
//}

//export async function getStaticProps() {
//const res = await fetch('http://localhost:3333/episodes');
//const data = await res.json();
//return {
//props: {
//episodes: data,
//},
//revalidate: 60 * 60 * 8,
//};
//}
