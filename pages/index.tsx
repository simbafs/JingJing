import type { NextPage } from 'next';
import { MouseEventHandler, KeyboardEventHandler, useEffect, useState } from 'react';

// import useSWR from 'swr';
import useLocalStorage from '../lib/useLocalstore';
import getSelection from '../lib/getSelection';

import style from '../styles/index.module.scss';

// interface Props {
//     input: string;
// }
//
// const Output = ({ input }: Props) => {
//     const { data, error } = useSWR(`/api/translate?t=${input}`, url => fetch(url).then(res => res.json()));
//     if(error) return <pre className={style.error}>Error: {JSON.stringify(error)}</pre>;
//     if(!data) return <h2 className={style.output}>Loading...</h2>;
//     return <h2 className={style.output}>{data.result}</h2>;
// }
//
const Home: NextPage = () => {
	const [input, setInput] = useLocalStorage('input', '');
	const [t, setT] = useState('');

	useEffect(()=> {
		setT(() => input);
	}, [input]);

	const handleContext: MouseEventHandler<HTMLTextAreaElement> = (e) => {
		const target = e.target as HTMLTextAreaElement;
		const [selection, start, end] = getSelection(target);
		// console.log(`translating ${selection}`);

		fetch(`/api/translate?t=${selection}`)
		.then(res => res.json())
		.then(data => {
			const text: string = data.result;
			const origin = target.value;
			// console.log(data.result, start, end)
			const final = `${origin.slice(0, start)} ${text} ${origin.slice(end)}`.trim();
			console.log(final);
			setInput(() => final);
			// console.log(selection, data.result)
		});

		e.preventDefault();
	}

	return (
		<>
			<textarea
				className={style.input}
				value={t}
				onChange={(e) => setInput(e.target.value)}
				onContextMenu={handleContext}
			/>
			{/*<Output input={input}/>*/}
		</>
	);
}

export default Home;
