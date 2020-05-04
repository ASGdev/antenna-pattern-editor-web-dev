class Test {
  constructor() {
	this._defaults = [
	]
	
    this._data = [
		{
			a: 7,
			g: 10,
			id: "p1"
		},
		{
			a:10,
			g:15,
			id:"p2"
		}
	]
	
	this._config = {
		h: {
			viz: {
				patternPlot:{
					line: {
						show: true,
						strokeColor: "",
						strokeWidth: "",
						strokeType: "",
						strokeDashArray: "",
						fill: "",
						interpolation: ""
					},
					points: {
						show: true
					}
				},
				polarPlot: {
					isotropic: {
						show: true,
						lineStyle: "",
						lineColor: "red",
						lineWidth: "2"
					},
					mainLobeMark: {
						lineStyle: "",
						lineColor: ""
					},
					aAxis: {
						lineColor: "",
						lineStyle: "",
						dashStyle: "1,4"
					},
					gAxis: {
						lineColor: "",
						lineStyle: "",
						dashStyle: "1,4"
					}
				}
			}
		}
	}

	this._configSetter = {
		h: {
			polarPlot: {
				isotropic: {
					setLineColor: (color) => {
						this._config.h.viz.polarPlot.isotropic.lineColor = color
					}
				}
			}
		}
	}
  }
 
  get data() {
    return this._data;
  }
  
  get config(){
	  return this._config;
  }

  get configSetter(){
	  return this._configSetter;
  }
  
  addDataPoint(d){
	  d.id = "p3"
	  this._data.push(d)
  }
  
  get getTest(){
	return "returned"
  }
  
	showIsotropic(view, value){
		console.log("setting isotropic option of " + view + " to " + value);
		this._config[view].viz.polarPlot.isotropic.show = value;
	}

}

export default Test
//module.exports = Test

