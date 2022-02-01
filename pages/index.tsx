import type { NextPage } from 'next';

import useSWR from 'swr';
import { useLocalStorage } from '../lib/useLocalstore';

import style from '../styles/index.module.scss';

interface Props {
	input: string;
}

const Output = ({ input }: Props) => {
	const { data, error } = useSWR(`/api/translate?t=${input}`, url => fetch(url).then(res => res.json()));
	if(error) return <pre className={style.error}>Error: {JSON.stringify(error)}</pre>;
	if(!data) return <h2 className={style.output}>Loading...</h2>;
	return <h2 className={style.output}>{data.result}</h2>;
}

const Home: NextPage = () => {
	const [input, setInput] = useLocalStorage('input', '');

	return (
		<div className={style.container}>
			<textarea className={style.input} value={input} onChange={(e) => setInput(e.target.value)}/>
			<Output input={input}/>
		</div>
	);
}

export default Home;
