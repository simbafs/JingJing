import type { NextPage } from 'next'
import { FormEventHandler, useState } from 'react'
import style from '../styles/container.module.scss'

const Home: NextPage = () => {
	const [text, setText] = useState('')

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault()
	}

	return (
		<div className={style.container}>
			<form action="/test" method="post" onSubmit={handleSubmit}>
				<h1>Hello Next.js</h1>
				<input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
				<button type="submit">Send</button>
			</form>
		</div>
	)
}

export default Home
