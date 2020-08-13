//arrayWithProbe.js

class ArrayWithProbe {
	constructor(content, probe, code) {
		this.replaceProbe = function(content, probe) {
			const replaceText = "[replace_me:)]";
			let editedText = probe.replace(/\[replace_me:\)\]/g, content);

			return editedText.trim();
		}

		this.content = content.trim();
		this.probe = this.replaceProbe(this.content, probe.trim());
		this.code = code.trim();
	}

	getCode() {
		return this.code;
	}

	getOutputString() {
		let output = this.content + "<br />\n<br />\n" + this.probe;
		return output;
	}
}
