import Event from '../auxiliar/event.js';

const UploadView = () => {
	const showUploadPageEvent = Event();

	function init() {
		document
			.getElementById('button-upload-json')
			.addEventListener('click', () => showUploadPageEvent.trigger(true));

		document
			.getElementById('upload-close')
			.addEventListener('click', () => showUploadPageEvent.trigger(false));
	}

	return {
		init,
		showUploadPageEvent,
	};
};

export default UploadView;
