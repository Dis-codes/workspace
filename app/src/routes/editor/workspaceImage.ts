export function svgToPng_(data, width, height, callback) {
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	var img = new Image();

	var pixelDensity = 5;
	let maxScaleI = 4096;
	var highestCScale = 0;
	var newWidth = width * pixelDensity;
	var newHeight = height * pixelDensity;

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
	img.onload = function () {
		context.drawImage(img, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
		try {
			var dataUri = canvas.toDataURL('image/png');
			callback(dataUri);
		} catch (err) {
			console.warn('Error converting the workspace svg to a png');
			callback('');
		}
	};
	img.src = data;
}

export function workspaceToSvg_(workspace, callback) {
	// Go through all text areas and set their value.
	var textAreas = document.getElementsByTagName('textarea');
	for (var i = 0; i < textAreas.length; i++) {
		textAreas[i].innerHTML = textAreas[i].value;
	}

	var bBox = workspace.getBlocksBoundingBox();
	var x = bBox.x || bBox.left;
	var y = bBox.y || bBox.top;
	var width = bBox.width || bBox.right - x;
	var height = bBox.height || bBox.bottom - y;

	var blockCanvas = workspace.getCanvas();
	var clone = blockCanvas.cloneNode(true);
	clone.removeAttribute('transform');

	var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	svg.appendChild(clone);
	svg.setAttribute('viewBox', x + ' ' + y + ' ' + width + ' ' + height);

	svg.setAttribute(
		'class',
		'blocklySvg ' +
			(workspace.options.renderer || 'geras') +
			'-renderer ' +
			(workspace.getTheme ? workspace.getTheme().name + '-theme' : '')
	);
	svg.setAttribute('width', width);
	svg.setAttribute('height', height);
	svg.setAttribute('style', 'background-color: transparent');

	var css = [].slice
		.call(document.head.querySelectorAll('style'))
		.filter(function (el) {
			return /\.blocklySvg/.test(el.innerText) || el.id.indexOf('blockly-') === 0;
		})
		.map(function (el) {
			return el.innerText;
		})
		.join('\n');
	var style = document.createElement('style');
	style.innerHTML = css;
	svg.insertBefore(style, svg.firstChild);

	var svgAsXML = new XMLSerializer().serializeToString(svg);
	svgAsXML = svgAsXML.replace(/&nbsp/g, '&#160');
	var data = 'data:image/svg+xml,' + encodeURIComponent(svgAsXML);

	svgToPng_(data, width, height, callback);
}
