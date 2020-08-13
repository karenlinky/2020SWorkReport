// EMCFavorability.js

class EMCFav {
	constructor(content, code) {
		this.content = content.trim();
		this.code = code.trim();
	}

	getCode() {
		return this.code;
	}

	// getContent() {
	// 	return this.content;
	// }

	getOutputString() {
		let output = "Would you say that <rot>you have never heard of " + this.content
		+ "|$$, or |you have no opinion of " + this.content + "</rot>?";
		output += "\n\n";

		output += "---Q" + this.code + "---\n";
		output += "{if(Q" + this.code + "A==5,Q" + this.code + "B.GroupID,Q" + this.code + "A)}";
		return output
	}
}
