import Event from '../auxiliar/event.js';
import { ScrollDirection } from '../auxiliar/consts.js';
import { convertDate } from '../auxiliar/convertDates.js';

const SceneInfoView = () => {
	const resetFocusEvent = Event();
	const scrollEvent = Event();

	function init() {
		document
			.getElementById('previous-button')
			.addEventListener('click', () =>
				scrollEvent.trigger(ScrollDirection.LEFT)
			);
		document
			.getElementById('next-button')
			.addEventListener('click', () =>
				scrollEvent.trigger(ScrollDirection.RIGHT)
			);
		document
			.getElementById('focus-button')
			.addEventListener('click', () => resetFocusEvent.trigger());
	}

	function update(title, date, description, location) {
		const datesArray = date ? date.map(date => {return date.time}) : undefined
		const locationsArray = location ? location.map(location => {return location.value}) : undefined
		document.getElementById('event-date').innerHTML = date
			? datesArray && datesArray.length > 0 ? `🕐${datesArray.join(', ')}` : '🕐undefined date'
			: '';
		document.getElementById('event-location').innerHTML = location
			? locationsArray && locationsArray.length > 0 ? `📌${locationsArray.join(', ')}`: '📌undefined place'
			: '';
		document.getElementById('event-title').innerHTML = title
			? title
			: 'Select an event';
		document.getElementById('event-info').innerHTML = description
			? description
			: 'Click on an event or the `Next event` button to see more information about a particular event ';
	}

	return {
		init,
		update,
		resetFocusEvent,
		scrollEvent,
	};
};

export default SceneInfoView;
