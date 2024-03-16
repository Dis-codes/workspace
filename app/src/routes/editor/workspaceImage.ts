export function svgToPng_(data, width, height, callback) {
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");
	const img = new Image();

	const pixelDensity = 5;
	const maxScaleI = 4096;
	let highestCScale = 0;
	let newWidth = width * pixelDensity;
	let newHeight = height * pixelDensity;

	if (newWidth > maxScaleI || newHeight > maxScaleI) {
		if (newWidth > newHeight) {
			highestCScale = newWidth;
		} else {
			highestCScale = newHeight;
		}
		newWidth = Math.round((newWidth / highestCScale) * maxScaleI);
		newHeight = Math.round((newHeight / highestCScale) * maxScaleI);
	}

	// newWidth = 4096
	// newHeight = 4096

	canvas.width = newWidth;
	canvas.height = newHeight;
	img.onload = function() {
		context.drawImage(img, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
		try {
			const dataUri = canvas.toDataURL("image/png");
			callback(dataUri);
		} catch (err) {
			console.warn("Error converting the workspace svg to a png");
			callback("");
		}
	};
	img.src = data;
}

export function workspaceToSvg_(workspace, callback) {
	// Go through all text areas and set their value.
	const textAreas = document.getElementsByTagName("textarea");
	for (let i = 0; i < textAreas.length; i++) {
		textAreas[i].innerHTML = textAreas[i].value;
	}

	const bBox = workspace.getBlocksBoundingBox();
	const x = bBox.x || bBox.left;
	const y = bBox.y || bBox.top;
	const width = bBox.width || bBox.right - x;
	const height = bBox.height || bBox.bottom - y;

	const blockCanvas = workspace.getCanvas();
	const clone = blockCanvas.cloneNode(true);
	clone.removeAttribute("transform");

	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	svg.appendChild(clone);
	svg.setAttribute("viewBox", `${x  } ${  y  } ${  width  } ${  height}`);

	svg.setAttribute(
		"class",
		`blocklySvg ${ 
			workspace.options.renderer || "geras" 
			}-renderer ${ 
			workspace.getTheme ? `${workspace.getTheme().name  }-theme` : ""}`
	);
	svg.setAttribute("width", width);
	svg.setAttribute("height", height);
	svg.setAttribute("style", "background-color: transparent");

	const css = [].slice
		.call(document.head.querySelectorAll("style"))
		.filter((el) => {
			return /\.blocklySvg/.test(el.innerText) || el.id.indexOf("blockly-") === 0;
		})
		.map((el) => {
			return el.innerText;
		})
		.join("\n");
	const style = document.createElement("style");
	style.innerHTML = css;
	svg.insertBefore(style, svg.firstChild);

	let svgAsXML = new XMLSerializer().serializeToString(svg);
	svgAsXML = svgAsXML.replace(/&nbsp/g, "&#160");
	const data = `data:image/svg+xml,${  encodeURIComponent(svgAsXML)}`;

	svgToPng_(data, width, height, callback);
}
