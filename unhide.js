(function() {
	if (window.hasRun) return;

	window.hasRun = true;

	const elBlacklist = ["script", "style"];
	
	function unhide() {
		// Inject CSS so we can add a border to the elements, and rehide the elements later
		const style = document.createElement("style");
		style.innerHTML = ".unhidden { border: 1px solid red; }";
		style.id = [ "unhiddenStyle" ];
		document.getElementsByTagName("head")[0].appendChild(style);

		document.querySelectorAll("body *").forEach(element => {
			if (elBlacklist.includes(element.tagName.toLocaleLowerCase())) return;
			if (element.currentStyle) {
				if (element.currentStyle.display === "none") {
					element.style.display = "block";
					element.classList.add("unhidden");
				}
			} else {
				if (getComputedStyle(element, null).display === "none") {
					element.style.display = "block";
					element.classList.add("unhidden");
				}
			}
		});
	}

	function rehide() {
		document.getElementById("unhiddenStyle").remove();
		const elements = document.getElementsByClassName("unhidden")
		while (elements.length > 0) {
			elements[0].style.display = "none";
			elements[0].classList.remove("unhidden");
		}
	}

	browser.runtime.onMessage.addListener((message) => {
		if (message.command === "unhide") {
			unhide();
		} else if (message.command === "rehide") {
			rehide();
		}
	});
})();

