var Permalance = {};

Permalance.nodes = {
	{
		id: 1,
		title: 'Job Interview',
		to: {2, 3, 4},
		toLabel: 'Beginning',
		video: ''
	},
	{
		id: 2,
		title: 'Economic Situation',
		to: {5, 3, 4},
		toLabel: 'Why does this happen?',
		video: ''
	},
	{
		id: 3,
		title: 'Legal Consultation',
		to: {2, 5, 4},
		toLabel: 'What does this mean?',
		video: ''
	},
	{
		id: 4,
		title: 'History of Labor',
		to: {2, 3, 5},
		toLabel: 'How did it end like this?',
		video: ''
	},
	{
		id: 5,
		title: 'Fired!',
		to: {6, 7},
		toLabel: 'Some time later...',
		video: ''
	},
	{
		id: 6,
		title: 'Legal Options',
		to: {7, 8},
		toLabel: 'What are the legal options?',
		video: ''
	},
	{
		id: 7,
		title: 'Personal Story',
		to: {6, 8},
		toLabel: 'Personal Story',
		video: ''
	},
	{
		id: 8,
		title: 'Conclusion',
		to: {},
		toLabel: 'Conclusion',
		video: ''
	}
};

document.addEventListener("DOMContentLoaded", function () {
});