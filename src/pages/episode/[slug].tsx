import { GetStaticPaths, GetStaticProps } from 'next';
import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';
import Image from 'next/image';

import styles from './episode.module.scss';
import { useContext } from 'react';
import { PlayerContext } from '../../contexts/PlayerContexts';
import Head from 'next/head';

interface Episode {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  published_at: string;
  thumbnail: string;
  description: string;
  url: string;
  duration: number;
  durationAsString: string;
}

type EpisodeProps = {
  episode: Episode;
};

export default function Episode({ episode }: EpisodeProps) {
  const { play } = useContext(PlayerContext);

  return (
    <div className={styles.episode}>
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>
        <Image
          width={700}
          height={160}
          objectFit="cover"
          src={episode.thumbnail}
          alt={episode.title}
        />
        <button type="button" onClick={() => play(episode)}>
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking', //24 horas
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await api.get(`episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR,
    }),
    description: data.description,
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)), //recebe uma função externa que formata o dado recebido da API, e converte para um número
    url: data.file.url,
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, //24 horas
  };
};
