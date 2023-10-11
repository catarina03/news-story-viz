import FileHandler from '../auxiliar/fileHandler.js';
import StorylinePickerView from '../views/storylinePickerView.js';

const StorylinePickerController = (narrative) => {
	const storylinePickerView = StorylinePickerView();
	const fileHandler = FileHandler();

	function init() {
		storylinePickerView.changeStorylineEvent.addListener(changeStoryline);
		storylinePickerView.changeStorylineVersionEvent.addListener(changeStorylineVersion);
		storylinePickerView.changeStorylineFileEvent.addListener(changeStorylineFile);
	}

	async function changeStoryline(filename) {
		await narrative.changeStoryline(filename);
	}

	async function changeStorylineFile(file) {
		await narrative.changeStorylineFile(file);
		console.log(file)
	}

	async function changeStorylineVersion(extended, filename) {
		console.log("click")
		let version = extended ? '_extended' : '';
		await narrative.changeStorylineVersion(version, filename);
	}

	function run() {
		storylinePickerView.init(fileHandler.currFile(), fileHandler.filenames());
	}

	return {
		init,
		run,
	};
};

export default StorylinePickerController;
