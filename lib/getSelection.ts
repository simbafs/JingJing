interface ISelection {
	selectionStart: number;
	selectionEnd: number;
	value: string;
}

export default function getSelection(target: ISelection): string {
	const start = target.selectionStart;
	const end = target.selectionEnd;
	return target.value.substring(start, end);
}
