import * as d3 from "d3";

class PatterEditorHelper {
	constructor() {
		this._domain = [-5, 15]
		this._range = [-5, 250]
		this._r = d3.scaleLinear()
					.domain(this._domain)
					.range(this._range);
	}
	
	get r(){
		return this._r
	}
	
	_r() {
		return d3.scaleLinear()
			.domain(this._range)
			.range(this._domain);
	}
 

}

export default PatterEditorHelper