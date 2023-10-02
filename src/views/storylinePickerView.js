import Event from '../auxiliar/event.js';

const StorylinePickerView = () => {
	const changeStorylineEvent = Event();
	const changeStorylineVersionEvent = Event();

	function init(initFile, filenames) {
		const select = document.getElementById('storyline-picker-select');
		const timelineCheckbox = document.getElementById('checkbox-timeline-extended');

		select.addEventListener('change', (e) => {
			changeStorylineEvent.trigger(e.target.value);
			timelineCheckbox.checked = false;
		});
		let option;
		for (let filename of filenames) {
			option = document.createElement('option');
			option.value = filename;
			option.innerHTML = filename;
			initFile === filename
				? option.setAttribute('selected', '')
				: option.removeAttribute('selected');
			select.appendChild(option);
		}

		timelineCheckbox.addEventListener('change', (e) => {
			//console.log(e.target.checked, select.value)
			changeStorylineVersionEvent.trigger(e.target.checked,select.value)
		} );

	}

	return {
		init,
		changeStorylineEvent,
		changeStorylineVersionEvent,
	};
};

export default StorylinePickerView;
