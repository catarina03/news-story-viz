import UploadView from '../views/uploadView.js';

const UploadController = () => {
	const uploadView = UploadView();

	function init() {
		uploadView.showUploadPageEvent.addListener(showUploadPage);
	}

	function showUploadPage(isVisible) {
        console.log(isVisible)
		document.getElementById('upload-container').style.display = isVisible
			? 'inherit'
			: 'none';
	}

	function run() {
		uploadView.init();
	}

	return {
		init,
		run,
	};
};

export default UploadController;
