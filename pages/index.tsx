import type { NextPage } from 'next';

import useSWR from 'swr';
import { useLocalStorage } from '../lib/useLocalstore';

import style from '../styles/container.module.scss';

interface Props {
	input: string;
}

const Output = ({ input }: Props) => {
	const { data, error } = useSWR(`/api/translate?t=${input}`, url => fetch(url).then(res => res.json()));
	if(error) return <pre>Error: {JSON.stringify(error)}</pre>;
	if(!data) return <div>Loading...</div>;
	return <div>{data.result}</div>;
}

const Home: NextPage = () => {
	const [input, setInput] = useLocalStorage('input', '');

	return (
		<div className={style.container}>
			<textarea value={input} onChange={(e) => setInput(e.target.value)}/>
			<Output input={input}/>
		</div>
	);
}

export default Home;
