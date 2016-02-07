
$(function(){

//图片发光效果
var fg=$(".fg");
for(var i=0;i<fg.length;i++){
  fg[i].index=i;
  fg[i].onmouseover=function(){
    animate(fg[this.index],{opacity:0.85},50,function(){
      animate(fg[this.index],{opacity:1},50)
    }) 
  }
}

/*var floors=$(".floors");
  for(var i=0;i<floors.length;i++){
  var imageS=$("img",floors[i]);
  alert(imageS.length);
   for(var j=0;j<imageS.length;j++){
    imageS[j].style.opacity=0.85;
    imageS[j].index=j;
    imageS[j].onmouseover=function(){
    animate(imageS[this.index],{opacity:0.85},500)
    imageS[this.index].style.opacity=1;
    }
  }
}*/


//固定定位背景添加修改

var fixedimg=$(".fixed-img");
var fixed=$(".fixed")[0];
fixed.style.display="none";
for(var i=0;i<fixedimg.length;i++){
	fixedimg[i].style.background="url(images/dw"+(i+1)+".jpg)";
}

for(var j=0;j<fixedimg.length;j++){
	fixedimg[j].index=j;
	fixedimg[j].onmouseover=function(){
        fixedimg[this.index].style.background="url(images/dv"+(this.index+1)+".jpg)"
	}
	fixedimg[j].onmouseout=function(){
        fixedimg[this.index].style.background="url(images/dw"+(this.index+1)+".jpg)"
	}
}

//banner轮播效果
    var img=$(".banner-banner");
  	var anniua=$(".banner-one");
		var t=setInterval(move,2000);
    var num=1;	
    var anniu3=$(".anniu3")[0];
    var anniu4=$(".anniu4")[0];

		function move(){
			if(num==8){
      	num=0;
      }
			for(var i=0;i<img.length;i++){
					img[i].style.zIndex=2;
					anniua[i].style.background="#ccc";
				}							 
             	img[num].style.zIndex=3;
             	anniua[num].style.background="#FF3C3C";
              num++;
}
   
     anniu3.onclick=function(){
    for(var j=0;j<anniua.length;j++){
          img[j].style.zIndex=2;
          anniua[j].style.background="#ccc";
        }
         if(num==1){
          num=9
        }
         img[num-2].style.zIndex=3;
         anniua[num-2].style.background="#FF3C3C";
         num--;
       

       }
      

anniu4.onclick=function(){
    for(var j=0;j<anniua.length;j++){
          img[j].style.zIndex=2;
          anniua[j].style.background="#ccc";
        }
         img[num].style.zIndex=3;
         anniua[num].style.background="#FF3C3C";
         num++;
        if(num==8){
          num=0
        }
       }
      




			
			for(var i=0;i<anniua.length;i++){
				anniua[i].index=i;
				anniua[i].onmouseover=function(){
				clearInterval(t);
				for(var j=0;j<anniua.length;j++){
					img[j].style.zIndex=2;
					anniua[j].style.background="#ccc";
				}
				img[this.index].style.zIndex=3;
				anniua[this.index].style.background="#FF3C3C";
				}
				anniua[i].onmouseout=function(){
					t=setInterval(move,2000);
					num=this.index+1;
				}
			}

for(var i=0;i<img.length;i++){
  img[i].index=i;
          img[i].onmouseover=function(){
            clearInterval(t);
            anniu3.style.display="block";
            anniu4.style.display="block";
          }
          img[i].onmouseout=function(){
            t=setInterval(move,2000);
            anniu3.style.display="none";
            anniu4.style.display="none";
          }
}

anniu3.onmouseover=anniu4.onmouseover=function(){
  clearInterval(t);
  anniu3.style.display="block";
  anniu4.style.display="block";
}
anniu3.onmouseout=anniu4.onmouseout=function(){
  t=setInterval(move,2000);
            anniu3.style.display="none";
            anniu4.style.display="none";
}

// 按需加载

  window.onscroll=function(){
  var ch=document.documentElement.clientHeight;
    var floor=$(".floors");
             	var scrollT=getScrollT();
             	for(var i=0;i<floor.length;i++){             		
             		floor[i]=floor[i].offsetTop;
             		if(floor[i].offsetTop<ch+scrollT){
             			var img=$("img",floor[i]);
             			for(var j=0;j<img.length;j++){
                          img[j].src=img[j].getAttribute("aa");
                      }
             		}
             	} 
//楼层跳转

    if(scrollT>=500){
	        	jump.style.display="block";
	        }else{
	        	jump.style.display="none";
	        }


	         for(var i=0;i<floors.length;i++){
              floors[i].t=floors[i].offsetTop;
                if(floors[i].t<scrollT+100){//如果scrollTop大于当前楼层的top
                for(var j=0;j<fimg.length;j++){
                  fimg[j].style.background="url(images/dw"+(j+1)+".jpg)";
                }
                  fimg[i].style.background="url(images/dv"+(i+1)+".jpg)"
              }
            }

}


//楼层轮播效果1

for(var i=0;i<8;i++){
 	lunbolc(i);
 }

//楼层轮播效果2
   lunbo(0);



//楼层跳转
 
        var floors=$(".floors");
	    var jump=$(".fixed")[0];
        var btn=$("li",jump);
        var fimg=$(".fixed-img");
//按钮控制滚动条
        
        for(var i=0;i<btn.length;i++){
        	btn[i].index=i;
        	btn[i].onclick=function(){
                var obj=document.documentElement.scrollTop?document.documentElement:document.body;//获取滚动条的对象
                animate(obj,{scrollTop:floors[this.index].t})//当前按钮的对应楼层的top赋值给滚动条

            for(var j=0;j<fimg.length;j++){
               fimg[j].style.background="url(images/dw"+(j+1)+".jpg)";
            }
            fimg[this.index].style.background="url(images/dv"+(this.index+1)+".jpg)"
        	}  
        }

//回到顶部
var fixedimage1=$(".fixed-imga1")[0];
fixedimage1.onclick=function(){
  var obj=document.documentElement.scrollTop?document.documentElement:document.body;//获取滚动条的对象
     animate(obj,{scrollTop:0},500)
}
//图片左移效果
var f212img1=$(".f212img1");
//alert(f212img1.length)
for(var i=0;i<f212img1.length;i++){
	f212img1[i].index=i;
	f212img1[i].onmouseover=function(){
		animate(f212img1[this.index],{left:-6},200)
	}
	f212img1[i].onmouseout=function(){
		animate(f212img1[this.index],{left:0},200)
	}
}

//floor7 效果
var floor7li=$(".f2-t-right-li");

var floor7box=$(".floor7box");
for(var i=0;i<floor7li.length;i++){
   floor7li[i].index=i;
   floor7li[i].onmouseover=function(){
    for(var j=0;j<floor7box.length;j++){
      floor7box[j].style.display="none";
      floor7li[j].style.color="black"
    }    
    floor7box[this.index].style.display="block";
    floor7li[this.index].style.color="#CEA145"
   }
}


//搜索框效果

    var text=$(".sousuo-input")[0];
text.onfocus=function(){//表单获得焦点事件
  if(text.value=="品牌盛宴：欢迎光临！"){
    text.value="";
  }
}
text.onblur=function(){
  if(text.value){
       
  }else{
    text.value="品牌盛宴：欢迎光临！";
  }
}



//banner效果
var bannerli=$(".banner-li");
var bannerdan=$(".banner-dan");
var bannerul2=$(".banner-ul2");
for(var i=0;i<bannerli.length;i++){
  bannerli[i].index=i;
  bannerli[i].onmouseover=function(){
    bannerdan[this.index].style.zIndex=5;
    bannerul2[this.index].style.display="block"
  }
  bannerli[i].onmouseout=function(){
    bannerdan[this.index].style.zIndex=0;
    bannerul2[this.index].style.display="none"
  }
}


for(var i=0;i<bannerul2.length;i++){
  bannerul2[i].index=i;
  bannerul2[i].onmouseover=function(){
    bannerul2[this.index].style.display="block"
  }
  bannerul2[i].onmouseout=function(){
    bannerul2[this.index].style.display="none"
  }
}

//top list 效果

var topleftli=$(".top-left-li")[5];
var dis1=$(".dis1")[0];
  topleftli.onmouseover=function(){
     
       dis1.style.display="block";
   }
   topleftli.onmouseout=function(){
     
       dis1.style.display="none";
   }
     dis1.onmouseover=function(){
     
       dis1.style.display="block";
   }
   dis1.onmouseout=function(){
     
       dis1.style.display="none";
   }

         //hover(topleftli,function(){ dis1.style.display="block";},function(){dis1.style.display="none";})
})