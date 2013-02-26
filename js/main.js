var Permalance = {};

Permalance.nodes = {
	'n1': {
		title: 'Job Interview',
		to: ['n2', 'n3', 'n4'],
		toLabel: 'Beginning',
		video: 'video_test'
	},
	'n2': {
		title: 'Economic Situation',
		to: ['n5', 'n3', 'n4'],
		toLabel: 'Why does this happen?',
		video: 'video_test'
	},
	'n3': {
		title: 'Legal Consultation',
		to: ['n2', 'n5', 'n4'],
		toLabel: 'What does this mean?',
		video: 'video_test'
	},
	'n4': {
		title: 'History of Labor',
		to: ['n2', 'n3', 'n5'],
		toLabel: 'How did it end like this?',
		video: 'video_test'
	},
	'n5': {
		title: 'Fired!',
		to: ['n6', 'n7'],
		toLabel: 'Some time later...',
		video: 'video_test'
	},
	'n6': {
		title: 'Legal Options',
		to: ['n7', 'n8'],
		toLabel: 'What are the legal options?',
		video: 'video_test'
	},
	'n7': {
		title: 'Personal Story',
		to: ['n6', 'n8'],
		toLabel: 'Personal Story',
		video: 'video_test'
	},
	'n8': {
		title: 'Conclusion',
		to: [],
		toLabel: 'Conclusion',
		video: 'video_test'
	}
};

Permalance.init = function(){
	var container = $('#container');
	for(key in Permalance.nodes) {
		var elem = Permalance.nodes[key];
		var pagefn = doT.template(document.getElementById('videoTmpl').text);
		var toNodes = [];
		for(var i = 0; i < elem.to.length; i++) {
			var toId = elem.to[i];
			toNodes.push({id: toId, toLabel: Permalance.nodes[toId].toLabel});
		}
		var data = {id: key, title: elem.title, video: elem.video, toNodes: toNodes};
		container.append(pagefn(data));
		elem['popcorn'] = Popcorn('#video-'+key);
		elem['popcorn'].on('ended', Permalance.fn.onEnd);
	}
	$('.toOverlay a').click(function(e){
		e.preventDefault();
		Permalance.fn.watchNode(this.hash.substring(1));
	});
	Permalance.fn.watchNode(Permalance.vars.firstNode);
	container.parent().height($(window).height()-10);
};

Permalance.vars = {
	firstNode: 'n1'
};

Permalance.fn = {
	watchNode: function(nid) {
		$(".toOverlay").hide();
		$('.node').hide();
		for(key in Permalance.nodes){
			var elem = Permalance.nodes[key];
			var pop = elem.popcorn;
			pop.pause();
			if(pop.readyState() > 0) pop.currentTime(0);
		}
		$('#'+nid).show();
		Permalance.nodes[nid].popcorn.play();
	},
	onEnd: function(){
		var nid = this.media.id.substring(6);
		$('#'+nid+ " .toOverlay").show();
	}
};

document.addEventListener("DOMContentLoaded", function () {
	Permalance.init();
});