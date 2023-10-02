import { SCENE_WIDTH } from '../auxiliar/consts.js';
import { createTransition } from '../auxiliar/auxiliar.js';
import { convertDate } from '../auxiliar/convertDates.js';
import Event from '../auxiliar/event.js';

// const SVG_HEIGHT = 150; // By Mariana 
// Change height here
let SVG_HEIGHT = 200;

// 75 by mariana for short text
// catarina made it a const to be multiplied by each char of the last scene
const LEGEND_BUFFER = 8; 
let LAST_SCENE_SIZE = 10;

const TimelineView = () => {
	const dragDateEvent = Event();
	let shouldShowDates = false;
	let narrative;
	// Tooltip
	let tooltip = d3.select("body")
		.append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);

	function init(_narrative) {
		narrative = _narrative || narrative;
		const scenes = narrative.scenes();
		const layoutSize = narrative.size()[0];
		

		let sizesArray = []
		scenes.forEach(s => {
			sizesArray.push(s.title.length)
		});
		LAST_SCENE_SIZE = Math.max(...sizesArray)
		//SVG_HEIGHT = 150 + 91
		console.log(narrative.size(),LAST_SCENE_SIZE, SVG_HEIGHT)

		//narrative.size(layoutSize, )

		const drag = d3
			.drag()
			.on('drag', (event, scene) => dragDateEvent.trigger(scene.id, event.x));

		const lineDimensions = {
			x1: scenes[0].x,
			x2: scenes[scenes.length - 1].x,
		};

		// SVG
		const svg = d3
			.select('div[id=timeline-div]')
			.style('height', `${SVG_HEIGHT}px`)
			.selectAll('svg[id=timeline]')
			.data([layoutSize])
			.join((enter) =>
				enter.append('svg').attr('id', 'timeline').attr('height', SVG_HEIGHT)
			)
			.attr('width', (size) => size + (LEGEND_BUFFER*LAST_SCENE_SIZE));

		// Line
		svg
			.selectAll('line')
			.data([lineDimensions])
			.join((enter) => enter.append('line'))
			.attr('x1', (dim) => dim.x1 + SCENE_WIDTH / 2)
			.attr('x2', (dim) => dim.x2 + SCENE_WIDTH / 2)
			.attr('y1', SVG_HEIGHT - 4)
			.attr('y2', SVG_HEIGHT - 4)
			.attr('stroke', 'black');
		console.log(lineDimensions)

		// Date points
		const datePoints = svg
			.selectAll('.date-group')
			.data(scenes, (scene) => scene.id)
			//.data(descriptions, (description) => description.description)
			.join((enter) => {
				const group = enter.append('g').attr('class', 'date-group').call(drag);

				group
					.append('text')
					.attr('class', 'date-text')
					.attr('text-anchor', 'start')
					.attr('y', -8)
					.attr('x', 0)
					.attr('transform', 'rotate(-20)')
					.on('mouseenter', function (e, d) {
						const tooltip = d3.select('.tooltip');
						if (!d.hidden) {
							tooltip.transition().duration(200).style('opacity', 1);
							tooltip
								.select('.tooltip-date')
								.text('')
							tooltip
								.select('.tooltip-text')
								.text(d.description);
							tooltip
								.style('left', e.pageX + 'px')
								.style('top', e.pageY + 'px');
						}
					})
					.on('mouseleave', function (_) {
						const tooltip = d3.select('.tooltip');

						tooltip.transition().duration(500).style('opacity', 0);
					});

				group
					.append('circle')
					.style('fill', 'black')
					.attr('width', SCENE_WIDTH + 16)
					.attr('height', (d) => d.height + 16)
					.attr('y', 0)
					.attr('x', 0)
					.attr('r', 4);
				console.log(SCENE_WIDTH + 16)

				return group;
			})
			.attr(
				'transform',
				(scene) =>
					'translate(' + [scene.x + SCENE_WIDTH / 2, SVG_HEIGHT - 4] + ')'
			)
			.transition(createTransition())
			.style('opacity', (scene) =>
				narrative.shouldHideScene(scene.id) ? 0.2 : 1
			);

		datePoints.select('.date-text').text((scene) => {
			return scene.date && shouldShowDates
				? convertDate(new Date(scene.date), true)
				: scene.title;
		});
	}

	function toggleDates() {
		shouldShowDates = !shouldShowDates;
		init();
	}

	return {
		init,
		toggleDates,
		dragDateEvent,
	};
};

export default TimelineView;
