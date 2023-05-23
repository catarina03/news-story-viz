import Event from '../auxiliar/event.js';

const HideSidebarView = () => {
	const hideSidebarEvent = Event();
	let sidebarIsHidden = document.getElementById('options-container').style.display === 'none';
	let sourceAnnIsHidden = document.getElementById('source-brat-container').style.display === 'none';

	function init() {
		// Sidebar
		document
			.getElementById('hide-sidebar-button')
			.addEventListener('click', (event) => {
				sidebarIsHidden = document.getElementById('options-container').style.display === 'none';
				hideSidebarEvent.trigger(!(sidebarIsHidden && sourceAnnIsHidden));
				document.getElementById('options-container').style.display = sidebarIsHidden
					? 'block'
					: 'none';
				event.target.innerHTML = sidebarIsHidden ? 'Esconder barra lateral' : 'Mostrar barra lateral';
				sidebarIsHidden = document.getElementById('options-container').style.display === 'none';
			});

		// Source annotations
		document
			.getElementById('show-source-brat-button')
			.addEventListener('click', (event) => 	{
				sourceAnnIsHidden = document.getElementById('source-brat-container').style.display === 'none';
				if (sidebarIsHidden){
					document.getElementById('source-brat-container').style.display = sourceAnnIsHidden
						? 'block'
						: 'none';
					event.target.innerHTML = sourceAnnIsHidden ? 'Esconder ficheiro .ann' : 'Mostrar ficheiro .ann';
				}
				sourceAnnIsHidden = document.getElementById('source-brat-container').style.display === 'none';
			}
		);		
	}

	return {
		init,
		hideSidebarEvent,
	};
};

export default HideSidebarView;