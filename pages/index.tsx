import type { NextPage } from 'next';
import { ReactEventHandler } from 'react';

import useSWR from 'swr';
import useLocalStorage from '../lib/useLocalstore';
import getSelection from '../lib/getSelection';

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

	// const handleSelect: ReactEventHandler<HTMLTextAreaElement> = (e) => {
	//     const selection = window.getSelection();
	//     if(selection && selection.anchorNode === selection.focusNode) {
	//         console.log(getSelection(e.target as HTMLTextAreaElement));
	//     }
	// }

	const handleContext: ReactEventHandler<HTMLTextAreaElement> = (e) => {
		console.log(getSelection(e.target as HTMLTextAreaElement));
		e.preventDefault();
	}

	return (
		<div className={style.container}>
			<textarea
				className={style.input}
				value={input}
				onChange={(e) => setInput(e.target.value)}
				// onSelect={handleSelect}
				onContextMenu={handleContext}
			/>
			<Output input={input}/>
		</div>
	);
}

export default Home;
