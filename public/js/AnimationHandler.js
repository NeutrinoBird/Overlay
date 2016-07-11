function AnimationHandler(args){
	args = args || {};
	this.elements = {};
	this.index = 0;
	this.playing = false;
	this.script = [];
	if(args.script) this.AddScript(args.script);						
}

AnimationHandler.prototype.AddElement = function(element){
	this.elements[element.name] = element;
}

AnimationHandler.prototype.Initialize = function(){
	for(var name in this.elements){
		this.elements[name].Initialize();
	}
}

AnimationHandler.prototype.AddScript = function(newScript){
	for (var keyframe of newScript){
		if(keyframe.frame || keyframe.frame === 0){
			this.script[keyframe.frame] = keyframe.action;
		}else{
			this.script.push(keyframe);
		}
	}
}

AnimationHandler.prototype.Animate = function(){
	if(this.index >= this.script.length){
		this.Stop();
	}else if(this.playing){
		if (this.script[this.index]){		
			eval(this.script[this.index]);
		}
		this.index++;
		for(var name in this.elements){
			this.elements[name].Animate();
		}
	}
}

AnimationHandler.prototype.Start = function(){
	this.playing = true;
	for(var name in this.elements){
		this.elements[name].Start();
	}
}

AnimationHandler.prototype.Stop = function(){
	this.index = 0;
	this.playing = false;
	for(var name in this.elements){
		this.elements[name].Stop();
	}
}