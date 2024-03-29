import Head from 'next/head'
import React from 'react';
import { useLocalStorage } from 'usehooks-ts';

import getSelection from '../lib/getSelection';
import tidyString from '../lib/tidyString';

export default function Home() {
	const [input, setInput] = useLocalStorage('input', '');

	const handleContext = (e: React.MouseEvent<HTMLTextAreaElement>) => {
		e.preventDefault();

		const target = e.target as HTMLTextAreaElement;
		const [selection, start, end] = getSelection(target);
		if (!selection.trim()) return;

		fetch(`/api/translate?t=${selection}`)
			.then(res => res.json())
			.then(data => {
				const text: string = data.result;
				const origin = target.value;
				const final = tidyString(origin.slice(0, start) + ' ' + text + ' ' + origin.slice(end));
				setInput(() => final);
			});
	}

	return <>
		<Head>
			<title>晶晶體產生器</title>
			<meta name="description" content="晶晶體產生器 JingJing Generator" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<div className="h-screen w-screen flex justify-center items-center flex-col">
			<h1 className="text-6xl">晶晶體產生器</h1>
			<h2>下方文字框輸入文字，選取後按右鍵可以翻譯選取文字</h2>
			<textarea
				className="border-2 border-gray-600 rounded-lg p-4 w-[90%] lg:w-[60%] h-[60%]"
				value={input}
				onChange={e => setInput(() => e.target.value)}
				onContextMenu={handleContext}
			/>
		</div>
		<a
			className="p-2 bg-sky-600 text-white rounded-lg absolute bottom-0 right-0 m-4"
			href="https://github.com/simbafs/JingJing"
			target="_blank"
			rel="noopener noreferrer"
		>Source Code</a>
	</>
}
