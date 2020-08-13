// phone.js

class Phone extends Mode{
	constructor(Option) {
		super (Option);
	}

	getOutput(showTags) {
		return showTags ? "<p-o>" + this.Option.getOutput() + "</p-o>" : this.Option.getOutput();
	}
}
