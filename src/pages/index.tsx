import { GetStaticProps } from 'next';
import { api } from '../services/api';

interface Episode {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  description: string;
  file: Array<{
    url: string;
    type: string;
    duration: number;
  }>;
}

interface HomeProps {
  episodes: Episode[];
}

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
//export default function Home(props) {
//console.log(props.episodes);

//return (
//<>
//<h1>Simple Home</h1>
//<p>{JSON.stringify(props.episodes)}</p>
//</>
//);
//}

//export async function getServerSideProps() {
//const res = await fetch('http://localhost:3333/episodes');
//const data = await res.json();
//return {
//props: {
//episodes: data,
//},
//};
//}

//-------------------SSG---------------------
export default function Home(props: HomeProps) {
  console.log(props.episodes);

  return (
    <>
      <h1>Simple Home</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  });

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  };
};
