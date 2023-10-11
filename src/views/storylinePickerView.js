import Event from '../auxiliar/event.js';

const StorylinePickerView = () => {
	const changeStorylineEvent = Event();
	const changeStorylineVersionEvent = Event();
	const changeStorylineFileEvent = Event();

	async function init(initFile, filenames) {
		const select = document.getElementById('storyline-picker-select');
		const timelineCheckbox = document.getElementById('checkbox-timeline-extended');
		const uploadFile = document.getElementById("new-file-uploaded");
		const updateStorylineButton = document.getElementById('upload-update');

		select.addEventListener('change', (e) => {
			console.log(e.target.value)
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

		updateStorylineButton.addEventListener('click', (e) =>{
			if (uploadFile.files.length > 0) 
			{
			  var reader = new FileReader(); // File reader to read the file 
			  
			  // This event listener will happen when the reader has read the file
			  reader.addEventListener('load', function() {
				var result = JSON.parse(reader.result); // Parse the result into an object 
				
				console.log(result);

				changeStorylineFileEvent.trigger(result)
			  });
			  
			  reader.readAsText(uploadFile.files[0]); // Read the uploaded file
			  //changeStorylineFile.trigger(uploadFile.files[0])
			}

		});

		timelineCheckbox.addEventListener('change', (e) => {
			//console.log(e.target.checked, select.value)
			changeStorylineVersionEvent.trigger(e.target.checked,select.value)
		} );

	}

	return {
		init,
		changeStorylineEvent,
		changeStorylineVersionEvent,
		changeStorylineFileEvent,
	};
};

export default StorylinePickerView;
