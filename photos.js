var intervalID=0; //interval id for set interval
var vx; //position increments to the left attribute
var vy; //position increments to the top attribute
var i;
var j=0;
var temp1=0; 
var temp2=0;

//on page load 

function initialize()
{
	//court attributes
	var court= document.getElementById("court").getBoundingClientRect();
	var courtTop=parseInt(court.top,10);
	var courtLeft=parseInt(court.left,10);
	var courtHeight=parseInt(court.height,10);
	var courtWidth=parseInt(court.width,10);
	//intial photo attributes
	var photo=document.getElementById("photos").getBoundingClientRect();
	var photosArray=document.getElementById("photos").getElementsByTagName("img");
	var photoTop=parseInt(photo.top,10);
	var photoLeft=parseInt(photo.left,10);
	var photoHeight=parseInt(photo.height,10);
	var photoWidth=parseInt(photo.width,10);
	
	i=0;
	
	//top an dleft attribtes of each photo maintained in an array
	var photoInitialPositionTop =new Array(photosArray.length+1);
	var photoInitialPositionLeft =new Array(photosArray.length+1);
	
	//photos placed at random on the court on page load
	for(i=0;i<=photosArray.length-1;i++)
	{
		photoInitialPositionTop[i] = Math.random()*(courtTop-courtHeight) + (courtHeight-photoHeight);
		photoInitialPositionLeft[i] = Math.random()*(courtTop-courtHeight) + (courtHeight-photoHeight);
			
		//assigning the top and left attributes for each photo		
		document.getElementById("photos").getElementsByTagName("img")[i].style.top = photoInitialPositionTop[i]+"px";
		document.getElementById("photos").getElementsByTagName("img")[i].style.left = photoInitialPositionLeft[i]+"px";
	}
	
	
	j=0;
	
	//if two photos are overlapping to change the intial position before the page loads
	for(i=0;i<=photosArray.length-1;i++)
	{
	photosArray=document.getElementById("photos").getElementsByTagName("img");
	photoTop=parseInt(document.getElementById("photos").getElementsByTagName("img")[i].getBoundingClientRect().top,10);
	photoLeft=parseInt(document.getElementById("photos").getElementsByTagName("img")[i].getBoundingClientRect().left,10);
	photoHeight=parseInt(document.getElementById("photos").getElementsByTagName("img")[i].getBoundingClientRect().height,10);
	photoWidth=parseInt(document.getElementById("photos").getElementsByTagName("img")[i].getBoundingClientRect().width,10);		
				
		for(j=0;j<=photosArray.length-1;j++)
		{
			
		var jphotoTop = parseInt(document.getElementById("photos").getElementsByTagName("img")[j].getBoundingClientRect().top,10);
		var jphotoLeft = parseInt(document.getElementById("photos").getElementsByTagName("img")[j].getBoundingClientRect().left,10);
		var jphotoHeight = parseInt(document.getElementById("photos").getElementsByTagName("img")[j].getBoundingClientRect().height,10);
		var jphotoWidth = parseInt(document.getElementById("photos").getElementsByTagName("img")[j].getBoundingClientRect().width,10);	
		if(j==i){
			continue;
		}	
		//checking if two photos are overlapping
		if (((photoTop+photoHeight)>jphotoTop) &&
			(photoTop<(jphotoTop+jphotoHeight)) &&
			((photoLeft+photoWidth)>jphotoLeft) &&
			(photoLeft<(jphotoLeft+jphotoWidth)))
		{
			photoInitialPositionTop[i] = Math.random()*(courtTop-courtHeight) + (courtHeight-jphotoHeight);
			photoInitialPositionLeft[i] = Math.random()*(courtTop-courtHeight) + (courtHeight-jphotoHeight);
			//checking if after change of initial position the photos are overlapping with the court borders
			if (photoInitialPositionLeft[i] < courtLeft){
					photoInitialPositionLeft[i] = Math.random()*(courtTop-courtHeight) + (courtHeight-jphotoHeight);
				}
				
				if (photoInitialPositionTop[i]<courtTop){
					photoInitialPositionTop[i] = Math.random()*(courtTop-courtHeight) + (courtHeight-jphotoHeight);
				}
				
				if ((photoInitialPositionLeft[i]+photoWidth)> (courtLeft+courtWidth)){
					photoInitialPositionLeft[i] = Math.random()*(courtTop-courtHeight) + (courtHeight-jphotoHeight);
				}
				
				if ((photoHeight+photoInitialPositionTop[i]) >(courtHeight+courtTop)){
					photoInitialPositionTop[i] = Math.random()*(courtTop-courtHeight) + (courtHeight-jphotoHeight);
				}
			document.getElementById("photos").getElementsByTagName("img")[i].style.top = photoInitialPositionTop[i]+"px";
			document.getElementById("photos").getElementsByTagName("img")[i].style.left = photoInitialPositionLeft[i]+"px";
		}
		}
	}
	//random assignment of vx and vy for each photo
	vx = new Array(photosArray.length+1);
	vy = new Array(photosArray.length+1);
	var max = 2;
	var min=-2;
	for(i=0;i<=photosArray.length-1;i++){
		vx[i]=0;
		vy[i]=0;
		while(vx[i]==0||vy[i]==0 || (vx[i]<1 && vx[i]>-1) || (vy[i]<1 && vy[i]>-1))
				{					
					vx[i]=Math.random() * (+max - +min) + +min;
					vy[i]=Math.random() * (+max - +min) + +min;
					
				}
	}

	
}

//on click inside the court
function resumeAction(event)
{
	
	//court attributes
	var court= document.getElementById("court").getBoundingClientRect();
	var courtTop=parseInt(court.top,10);
	var courtLeft=parseInt(court.left,10);
	var courtHeight=parseInt(court.height,10);
	var courtwidth=parseInt(court.width,10);
	var courtBottom=courtTop+courtHeight;
	var photosArray=document.getElementById("photos").getElementsByTagName("img"); 
	


	i = 0;
	
	
	//to pause the movement of photos
	if(intervalID!=0){
		clearInterval(intervalID);
		intervalID=0;
		
	}
	//to start or resume the movement of photos
	else{
	intervalID=setInterval(function(){ fun() ;
		function fun()
		{
	
			for (i=0;i<=photosArray.length-1;i++)
			{
				
				
				
				var photo=document.getElementById("photos").getElementsByTagName("img")[i];
				var photoTop = parseInt(document.getElementById("photos").getElementsByTagName("img")[i].getBoundingClientRect().top,10);
				var photoLeft = parseInt(document.getElementById("photos").getElementsByTagName("img")[i].getBoundingClientRect().left,10);
				var photoHeight = parseInt(document.getElementById("photos").getElementsByTagName("img")[i].getBoundingClientRect().height,10);
				var photoWidth = parseInt(document.getElementById("photos").getElementsByTagName("img")[i].getBoundingClientRect().width,10);				
				
				
				
				//to bounce off the left border of the court 
				if ((photoLeft+vx[i]) < courtLeft){
					vx[i]=-vx[i]; 
				}
				
				//to bounce off the top border of the court
				if ((photoTop+vy[i])<courtTop){
					vy[i]=-vy[i];
				}
				//to bounce off the right border of the court
				if ((photoLeft+photoWidth)> (courtLeft+courtwidth)){
					vx[i]=-vx[i];
				}
				//to bounce of the bottom border of the court
				if ((photoHeight+photoTop) >(courtHeight+courtTop)){
					vy[i]=-vy[i];
				}
				
				j=0;
				temp1=0;
				temp2=0;
				//to bouce off of each other when two photos collide
				for(j=0;j<=photosArray.length-1;j++)
				{
					var jphotoTop = parseInt(document.getElementById("photos").getElementsByTagName("img")[j].getBoundingClientRect().top,10);
					var jphotoLeft = parseInt(document.getElementById("photos").getElementsByTagName("img")[j].getBoundingClientRect().left,10);
					var jphotoHeight = parseInt(document.getElementById("photos").getElementsByTagName("img")[j].getBoundingClientRect().height,10);
					var jphotoWidth = parseInt(document.getElementById("photos").getElementsByTagName("img")[j].getBoundingClientRect().width,10);	
					if(j==i){
						continue;
					}
					//check if they are colliding
					if (((photoTop+photoHeight)>jphotoTop) &&
							(photoTop<(jphotoTop+jphotoHeight)) &&
							((photoLeft+photoWidth)>jphotoLeft) &&
							(photoLeft<(jphotoLeft+jphotoWidth)))
					{
						temp1=vx[i];
						vx[i]=vx[j];
						vx[j]=temp1;
						
						temp2=vy[i];
						vy[i]=vy[j];
						vy[j]=temp2;
						
						var jpTop= jphotoTop+vy[j];
						var jpLeft = jphotoLeft+vx[j];
				
						document.getElementById("photos").getElementsByTagName("img")[j].style.top=jpTop+"px";
						document.getElementById("photos").getElementsByTagName("img")[j].style.left=jpLeft+"px";
						break;
					}
				}	
				
				
				//new vy and vx values to be assigned to each photo
				var pTop= photoTop+vy[i];
				var pLeft = photoLeft+vx[i];
				
				
				
				document.getElementById("photos").getElementsByTagName("img")[i].style.top=pTop+"px";
				document.getElementById("photos").getElementsByTagName("img")[i].style.left=pLeft+"px";	

			}
	
		}
	},10);
	}
	


}