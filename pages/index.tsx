import type { NextPage } from 'next';
import { MouseEventHandler, KeyboardEventHandler, useEffect, useState } from 'react';

import useLocalStorage from '../lib/useLocalstore';
import getSelection from '../lib/getSelection';
import tidyString from '../lib/tidyString';

import style from '../styles/index.module.scss';

const Home: NextPage = () => {
	// issue #1
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
			const final = tidyString(origin.slice(0, start) + ' ' + text + ' ' + origin.slice(end));
			console.log(final);
			setInput(() => final);
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
					onChange={(e) => setInput(() => e.target.value)}
					onCompositionUpdate={(e) => setInput(() => e.data)}
					onContextMenu={handleContext}
					// onKeyDown={handleKeyDown}
					// onCompositionStart={(e) => console.log('compositionStart', e.data, e.target.value)}
					// onCompositionEnd={(e) => console.log('compositionEnd', e.data, e.target.value)}
					// onCompositionUpdate={(e) => console.log('compositionUpdate', e.data, e.target.value)}
				/>
			</div>
		</>
	);
}

export default Home;
