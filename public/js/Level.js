import Composition from './Compositor.js';

export default class Level{

	constructor(){
		this.comp = new Composition;
		this.entities = new Set;
	}

	update(deltaTime){
		this.entities .forEach( e => {
		  e.update(deltaTime);
		});
	}
}