import { useCallback, useEffect, useState } from 'react';

const BASE = 'https://parseapi.back4app.com/classes';
const HEADERS = {
  'X-Parse-Application-Id': process.env.EXPO_PUBLIC_B4A_APP_ID ?? '',
  'X-Parse-REST-API-Key': process.env.EXPO_PUBLIC_B4A_REST_KEY ?? '',
};

export type Profile = { objectId: string; nome: string; titulo: string; bio: string; email: string; github: string; linkedin: string; cidade: string };
export type Academica = { objectId: string; curso: string; instituicao: string; periodo: string; descricao: string };
export type Profissional = { objectId: string; cargo: string; empresa: string; periodo: string; descricao: string };
export type Projeto = { objectId: string; nome: string; descricao: string; tecnologias: string[]; link: string };

export async function fetchClass<T>(name: string, order?: string): Promise<T[]> {
  const res = await fetch(`${BASE}/${name}${order ? `?order=${order}` : ''}`, { headers: HEADERS });
  if (!res.ok) throw new Error(`Back4App respondeu ${res.status}`);
  return (await res.json()).results as T[];
}

export function useClass<T>(name: string, order?: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await fetchClass<T>(name, order));
    } catch (e: any) {
      setError(e.message ?? 'Erro ao carregar');
    } finally {
      setLoading(false);
    }
  }, [name, order]);

  useEffect(() => { load(); }, [load]);
  return { data, loading, error, reload: load };
}
