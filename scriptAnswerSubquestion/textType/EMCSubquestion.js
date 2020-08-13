//EMCSubquestions.js

class EMCSubquestion extends TextType {
	constructor(text, probe, isEMCFav) {
		super(isEMCFav ? OLType.EMCFav : OLType.arrayWithProbe);

		if (text=="" || probe=="") {
			return;
		}

		this.probe = probe;

		this.setOptionListByLine = function (line, lineIndex) {
			let code = "";
			let content = line;
			let probe = "";

			for (let letterCount = 0; letterCount < line.length - 2; letterCount++) {
				if (line.substring(letterCount, letterCount+2) == ".\t") {
					code = line.substring(0, letterCount).trim();
					content = this.removeFirstBracket(line.substring(letterCount + 2).trim());
					// content = line.substring(letterCount + 2).trim();
					break;
				} else if (line[letterCount] == "\t") {
					code = line.substring(0, letterCount).trim();
					content = this.removeFirstBracket(line.substring(letterCount + 2).trim());
					// content = line.substring(letterCount + 2).trim();
					break;
				} else if (letterCount > 3) {
					return;
				}
			}

			probe = this.probe.replace(/\(QX\)/gi, content);
			this.OL.addOption(content, probe, code);
		}

		this.format = function (text) {
			this.setOptionList(text);
		}
		this.format(text);
	}
}
