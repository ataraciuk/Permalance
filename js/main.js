var Permalance = {};

Permalance.nodes = {
	'n1': {
		title: 'Introduction',
		to: ['n5', 'n6'],
		toLabel: 'Start Over',
		video: 'intro',
		links: [
			{
				to: 'http://www.outtengolden.com/',
				start: 8,
				end: 15,
				text: 'A recognized firm in the field of employment law',
				name: 'Outen Golden'
			}
		]
	},
	'n5': {
		title: 'Permalancer Kevin',
		to: ['n9', 'n10', 'n11','n6'],
		toLabel: 'Permalancer Kevin Personal Story',
		audio: 'Permalance_Kevin'

	},
	'n6': {
		title: 'Permalancer Dillon',
		to: ['n9', 'n10', 'n11', 'n5'],
		toLabel: 'Permalancer Dillon Personal Story',
		audio: 'Permalance_Dillon'
	},
	'n2': {
		title: 'MTV Demonstration',
		to: ['n8', 'n3', 'n4'],
		toLabel: 'Do people complain in the streets?',
		video: 'strike',
		links: [
			{
				to: 'http://www.contactmusic.com/news/mtv-workers-on-strike_1053238',
				start: 1,
				end: 10,
				text: 'December 12, 2007',
				name: 'Freelancers demonstrating'
			},
			{
				to: 'http://fruitsofourlabour.blogspot.com/2007/12/striking-mtv-workers-workers-win.html',
				start: 21,
				end: 30,
				text: 'The striking workers won a partial victory',
				name: 'Result'
			}
		]
	},
	'n3': {
		title: 'Obama Speech',
		to: ['n2', 'n4', 'n8'],
		toLabel: 'What does Obama think about middle-class security?',
		video: 'obama-security',
		links: [
			{
				to: 'http://www.whitehouse.gov/administration/president-obama',
				start: 1,
				end: 10,
				text: 'Labor Day Address. Detroit, MI. September 5, 2011.',
				name: 'President Obama'
			}
		]
	},
	'n4': {
		title: 'US Economy Now',
		to: ['n2', 'n3', 'n8'],
		toLabel: 'Is the economy getting better?',
		video: 'economy-better',
		links: [
			{
				to: 'http://en.wikipedia.org/wiki/Gross_domestic_product',
				start: 12,
				end: 17,
				text: 'Gross Domestic Product',
				name: 'GDP'
			},
			{
				to: 'http://en.wikipedia.org/wiki/Real_GDP',
				start: 18,
				end: 25,
				text: 'Real Gross Domestic Product',
				name: 'Real GDP: growth without inflation'
			},
			{
				to: 'http://en.wikipedia.org/wiki/List_of_countries_by_GDP_(PPP)_per_capita',
				start: 52,
				end: 60,
				text: 'GDP divided by average population',
				name: 'Per capita GDP'
			},
			{
				to: 'http://en.wikipedia.org/wiki/List_of_countries_by_GDP_(PPP)_per_capita',
				start: 117,
				end: 130,
				text: 'Multiplier Effect',
				name: 'Fiscal Multiplier'
			}
		]
	},
	'n8': {
		title: 'Comparison',
		to: ['n12'],
		toLabel: 'Comparison of in-house and freelancing',
		video: 'comparison',
		links: [
			{
				to: 'http://ca.linkedin.com/pub/terese-brasen-abc/17/75/a37',
				start: 1,
				end: 10,
				text: 'Manager Internal Communications and Engagement, Alberta Energy',
				name: 'Terese Brasen'
			},
			{
				to: 'http://en.wikipedia.org/wiki/Internal_communications',
				start: 15,
				end: 24,
				text: 'Function responsible for effective communication or trade among participants',
				name: 'Internal communications'
			}
		]
	},
	'n9': {
		title: 'Interview with artist',
		to: ['n10', 'n11', 'n2', 'n3', 'n4'],
		toLabel: 'Interview with artist',
		video: 'Art01b'
	},
	'n10': {
		title: 'Interview with Lawyer',
		to: ['n9', 'n11', 'n2', 'n3', 'n4'],
		toLabel: 'Interview with Lawyer',
		video: 'laborlawyer01'
	},
	'n11': {
		title: 'Legal Options',
		to: ['n10', 'n9', 'n2', 'n3', 'n4'],
		toLabel: 'What are the legal options?',
		video: 'Legal'
	},
	'n12': {
		title: 'Conclusion',
		to: [],
		toLabel: 'Start Over',
		video: 'Conclusionb'
	}
};

Permalance.tree = [
	[null, null, 'n1'],
	[null, 'n5', null, 'n6'],
	['n9', null, 'n10', null, 'n11'],
	['n2', null, 'n3', null, 'n4'],
	[null, null, 'n8'],
	[null, null, 'n12'],
];

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
		if (toNodes.length == 0) {
			toNodes.push({id: Permalance.vars.firstNode , toLabel: Permalance.nodes[Permalance.vars.firstNode].toLabel});
		}
		var data = {id: key, title: elem.title, video: elem.video, toNodes: toNodes, audio: elem.audio};
		container.append(pagefn(data));
		elem['popcorn'] = Popcorn('#video-'+key);
		elem['popcorn'].on('ended', Permalance.fn.onEnd);
		if(typeof elem.links == 'object') {
			for(var i = 0; i < elem.links.length; i++) {
				var link = elem.links[i];
				var f = function(link) {
					elem['popcorn'].code({
						start: link.start,
						end: link.end,
						onStart: function(options){
							Permalance.vars.footlink
								.children('a').attr('href', link.to).html(link.text).filter('.bigger').html(link.name);
							Permalance.vars.footlink.show().stop().animate({opacity:1});
						},
						onEnd: function(options){
							Permalance.vars.footlink.stop().animate({opacity:0}, {complete: function(){$(this).hide();}});
						}
					});
				}(link);	
			}
		}
	}
	Permalance.fn.makeTree();
	$('.overlayBtn').click(function(e){
		var overlayId = this.id;
		e.preventDefault();
		var pop = Permalance.fn.getCurrent().popcorn;
		pop.pause();
		$('#overlay').stop().show().animate({opacity: 0.5}).click(Permalance.fn.closeOverlay);
		$('.'+overlayId).stop().show().animate({opacity: 1});
	});
	$('.closeCross').click(function(e) {
		e.preventDefault();
		Permalance.fn.closeOverlay();
	});
	$(document).keyup(function(e){
		if(e.which == 27) Permalance.fn.closeOverlay();
	});
	Permalance.vars.footlink.children('a').click(function(){
		Permalance.fn.getCurrent().popcorn.pause();
	});

	setInterval(function(){
		var h = $(window).height();
		var w = $(window).width();
		var r = w / h;
		var useW = false;
		Permalance.vars.bg.height(h).width(w);	
		if(r < Permalance.vars.bgRatio) w = Math.round(h * Permalance.vars.bgRatio);
		Permalance.vars.bg.children().width(w).children().attr({width: w});		
	},
	500);
};

Permalance.vars = {
	firstNode: 'n1',
	footlink: $('.footlink'),
	bgRatio: 2000 / 1200,
	bg: $('.backgroundDiv')
};

Permalance.fn = {
	watchNode: function(nid) {
		$('.yellowBg').removeClass('yellowBg');
		$('.arrowsandboxes-node-title a[href$="'+nid+'"]').parent().addClass('yellowBg').parent().addClass('yellowBg');
		$(".toOverlay").css('opacity', 0);
		$('.to-'+nid).addClass('visited');
		$('.node').hide();
		for(key in Permalance.nodes){
			var elem = Permalance.nodes[key];
			var pop = elem.popcorn;
			pop.pause();
			if(pop.readyState() > 0) pop.currentTime(0);
		}
		$('#'+nid).show();
		Permalance.vars.footlink.css('opacity', 0);
		Permalance.nodes[nid].popcorn.play();
	},
	onEnd: function(){
		var nid = this.media.id.substring(6);
		$('#'+nid+ " .toOverlay").stop().animate({opacity: 1});
	},
	closeOverlay: function(){
		$('#overlay, .overlayMain').stop().animate({opacity: 0}, {complete: function(){$('#overlay, .overlayMain').hide();}});
	},
	getCurrent: function(){
		var playingId = $('.node:visible')[0].id;
		return Permalance.nodes[playingId];		
	},
	makeTree: function(){
		var txt = '';
		var first = true;
		for(var i = 0; i < Permalance.tree.length; i++) {
			if(!first) txt += ' || ';
			first = false;
			for(var j = 0; j < Permalance.tree[i].length; j++) {
				var elem = Permalance.tree[i][j];
				if(elem === null) txt += ' () ';
				else {
					txt += ' ('+elem+':{{<a href="#' + elem + '" target="_blank">'+Permalance.nodes[elem].title+'</a>}} ';
					if(Permalance.nodes[elem].to.length > 0) {
						txt += '>> [' + Permalance.nodes[elem].to.join() + ']';
					}
					txt += ') ';
				}
			}
		}
		$('pre.arrows-and-boxes').html(txt);
		jQuery.getScript('http://www.headjump.de/javascripts/arrowsandboxes.js', function(){
			setTimeout(function(){
				Permalance.fn.watchNode(Permalance.vars.firstNode);
				$('.toOverlay a, .arrowsandboxes-node-title a').click(function(e){
					e.preventDefault();
					Permalance.fn.closeOverlay();
					Permalance.fn.watchNode(this.hash.substring(1));
				});
			},100);
		});
	}
};

document.addEventListener("DOMContentLoaded", function () {
	Permalance.init();
});