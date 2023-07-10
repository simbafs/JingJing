interface ISelection {
	selectionStart: number
	selectionEnd: number
	value: string
}

export default function getSelection(target: ISelection) {
	const start = target.selectionStart
	const end = target.selectionEnd
	return [target.value.substring(start, end), start, end] as const
}
