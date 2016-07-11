function AnimationElement(args){
	args = args || {};
	this.index = 0;
	this.playing = false;
	this.script = [];
	this.ID = "#" + args.ID || "";
	this.name = args.ID || "";
	this.hiddenWhenStopped = args.hiddenWhenStopped || false;
	if(args.script) this.AddScript(args.script);					
}

AnimationElement.prototype.Initialize = function(){
	if(this.hiddenWhenStopped){
		$(this.ID).css({"visibility" : "hidden"});
	}
}

AnimationElement.prototype.AddScript = function(newScript){
	for (var keyframe of newScript){
		if(keyframe.frame){
			this.script[keyframe.frame] = keyframe.action;
		}else{
			this.script.push(keyframe);
		}
	}
}

AnimationElement.prototype.Animate = function(){
	if(this.playing){					
		this.index++;
		if(this.index >= this.script.length){
			this.index = 0;
		}
		if (this.script[this.index]){
			$(this.ID).css(this.script[this.index]);
		}
	}
}

AnimationElement.prototype.Start = function(){
	this.playing = true;
	if(this.hiddenWhenStopped){
		$(this.ID).css({"visibility" : "visible"});
	}
}

AnimationElement.prototype.Stop = function(){
	this.index = 0;
	this.playing = false;
	if(this.hiddenWhenStopped){
		$(this.ID).css({"visibility" : "hidden"});
	}
}