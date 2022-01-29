import type { NextPage } from 'next';
import { useState } from 'react';
import useSWR from 'swr';

import style from '../styles/container.module.scss';

interface Props {
	input: string;
}

const Output = ({ input }: Props) => {
	const { data, error } = useSWR(`/api/translate?t=${input}`, url => fetch(url).then(res => res.json()));
	if(error) return <pre>{JSON.stringify(error)}</pre>;
	if(!data) return <div>loading...</div>;
	return <div>{data.result}</div>;
}

const Home: NextPage = () => {
	const [input, setInput] = useState('');

	return (
		<div className={style.container}>
			<h1>Hello Next.js</h1>
			<input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
			<Output input={input}/>
		</div>
	);
}

export default Home;
