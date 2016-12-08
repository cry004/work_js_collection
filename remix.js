/**
 * article and pr remix process controller
 *
 * @class Remix
 * @author Barble Lee
 * @created 2016/10/19
 */

class Remix {

	static init(scene) {
		scene && new Remix(scene);
	}

	constructor(scene){
		this.article = scene.querySelectorAll(".Article[data-type=article]");
		this.pr = scene.querySelectorAll(".Article[data-type=pr]");
		this.parent = scene;
		this.frequency = 1;   // n: 記事*n + PR*1
		this.copy = {
			"article"  :[],
			"pr"       :[]
		};
		this.remixArray = [];
		this.totalLength = this.article.length + this.pr.length;

		//this.copy["article"] = Array.prototype.slice.call(this.article);
		this.article.forEach(function(value){
			this.copy["article"].push(value);
		}.bind(this));

		//this.copy["pr"] = Array.prototype.slice.call(this.pr);
		this.pr.forEach(function(value){
			this.copy["pr"].push(value);
		}.bind(this));
		this.doRemix();
	}

	doRemix() {
		let k = 0;
		for(let i = 0; i < this.pr.length; i++){
			for(let j = 0; j < this.frequency; j++){
				this.remixArray[k] = this.copy["article"][0];
				k++;
				if(j != -1) this.copy["article"].splice(0,1);
			}
			this.remixArray[k] = this.copy["pr"][i];
			k++;
		}
		if (this.copy["article"].length) {
			this.remixArray = this.remixArray.concat(this.copy["article"]);
		}
		this.insertBack();
	}
	insertBack(){
		while(this.parent.firstChild){
			this.parent.removeChild(this.parent.firstChild);
		}
		this.remixArray.forEach(function(value){
			if(value){
				this.parent.appendChild(value);
			}
		}.bind(this));
	}
 }

 (() => {
 	Remix.init(document.querySelector(".ArticleList"));
 })();