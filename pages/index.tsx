import type { NextPage } from 'next';
import { MouseEventHandler, KeyboardEventHandler, useEffect, useState } from 'react';

// import useSWR from 'swr';
import useLocalStorage from '../lib/useLocalstore';
import getSelection from '../lib/getSelection';
import tidyString from '../lib/tidyString';

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
		e.preventDefault();

		const target = e.target as HTMLTextAreaElement;
		const [selection, start, end] = getSelection(target);
		if(!selection.trim()) return;

		fetch(`/api/translate?t=${selection}`)
		.then(res => res.json())
		.then(data => {
			const text: string = data.result;
			const origin = target.value;
			// console.log(data.result, start, end)
			const final = tidyString(origin.slice(0, start) + ' ' + text + ' ' + origin.slice(end));
			console.log(final);
			setInput(() => final);
			// console.log(selection, data.result)
		});
	}

	// const handleKeyDown:KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
	//     console.log(e.key, e.ctrlKey, e);
	// }

	return (
		<>
			<div className={style.card}>
				<h1>晶晶體產生器</h1>
				<h2>下方文字框輸入文字，選取後按右鍵可以翻譯選取文字</h2>
				<textarea
					className={style.input}
					value={t}
					onChange={(e) => setInput(e.target.value)}
					onContextMenu={handleContext}
					// onKeyDown={handleKeyDown}
				/>
			</div>
			{/*<Output input={input}/>*/}
		</>
	);
}

export default Home;
