function listenForClicks() {
	document.addEventListener("click", (e) => {
		/**
		* Get the active tab,
		* then call "unhide()" or "rehide()" as appropriate.
		*/
		if (e.target.id === "unhide") {
			browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
				browser.tabs.sendMessage(tabs[0].id, {
					command: "unhide",
				});
			}).catch((err) => console.error(err));
		} else if (e.target.id === "rehide") {
			browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
				browser.tabs.sendMessage(tabs[0].id, {
					command: "rehide",
				});
			}).catch((err) => console.error(err));
		}
	});
}

browser.tabs.executeScript({file: "/unhide.js"})
	.then(listenForClicks)
	.catch((err) => console.error(`Failed to execute unhide content script: ${err.message}`));
