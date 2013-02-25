var Permalance = {};

Permalance.nodes = {
	'n1': {
		title: 'Job Interview',
		to: ['n2', 'n3', 'n4'],
		toLabel: 'Beginning',
		video: ''
	},
	'n2': {
		title: 'Economic Situation',
		to: ['n5', 'n3', 'n4'],
		toLabel: 'Why does this happen?',
		video: ''
	},
	'n3': {
		title: 'Legal Consultation',
		to: ['n2', 'n5', 'n4'],
		toLabel: 'What does this mean?',
		video: ''
	},
	'n4': {
		title: 'History of Labor',
		to: ['n2', 'n3', 'n5'],
		toLabel: 'How did it end like this?',
		video: ''
	},
	'n5': {
		title: 'Fired!',
		to: ['n6', 'n7'],
		toLabel: 'Some time later...',
		video: ''
	},
	'n6': {
		title: 'Legal Options',
		to: ['n7', 'n8'],
		toLabel: 'What are the legal options?',
		video: ''
	},
	'n7': {
		title: 'Personal Story',
		to: ['n6', 'n8'],
		toLabel: 'Personal Story',
		video: ''
	},
	'n8': {
		title: 'Conclusion',
		to: [],
		toLabel: 'Conclusion',
		video: ''
	}
};

Permalance.init = function(){
	var container = $('#container');
	for(key in Permalance.nodes) {
		var elem = Permalance.nodes[key];
		var pagefn = doT.template(document.getElementById('videoTmpl').text);
		var toNodes = [];
		console.log(elem);
		for(var i = 0; i < elem.to.length; i++) {
			var toId = elem.to[i];
			toNodes.push({id: toId, toLabel: Permalance.nodes[toId].toLabel});
		}
		var data = {id: key, title: elem.title, video: elem.video, toNodes: toNodes};
		container.append(pagefn(data));
	}
};

document.addEventListener("DOMContentLoaded", function () {
	Permalance.init();
});