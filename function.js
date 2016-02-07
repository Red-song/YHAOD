function getClass(classname,obj){
          var obj=obj||document;
          if(obj.getElementsByClassName){
          	return obj.getElementsByClassName(classname);
          }
          else{
          	var all=obj.getElementsByTagName("*");
          	var arr=[];
          	for(var i=0;i<all.length;i++){
          		if(checkRel(all[i].className,classname)){
          			arr.push(all[i]);
          		}
          	}return arr;
          }
             function checkRel(str,val){
                var newarr=str.splice(" ");
                for(var i=0;i<newarr.length;i++){
                	if(newarr[i]==val){
                		return true;
                	}
                }return false;
             } 
      }
     

      /*可以获取设置纯文本兼容函数*/
      function getText(obj,val){
        if(val==undefined){
            if(obj.innerText){
                   return obj.innerText;
            }else{
               return obj.textContent;
            }
          }
          else{
            if(obj.innerText||obj.innerText==""){
            //IE8,当浏览器有innerText这个属性，或者这个对象内容为空字符串时，都可以设置文本。
                   obj.innerText=val;
            }else{
               obj.textContent=val;
            }
          }
      }

      /*IE8和W3获取行内或者行外兼容问题的解决*/
      function getStyle(obj,attr){//obj 那个对象 attr那个属性
         if(obj.currentStyle){//ie8
          return obj.currentStyle[attr];
         }
         else{
          return getComputedStyle(obj,null)[attr];
         }
      }

      /*$(".box"); 类名
      $("#box");  ID
      $("div"); 标签名*/

      function $(select,obj){
        var obj=obj||document;
          if(typeof select=="string"){
            select=select.replace(/^\s*|\s*&/g,"");//解决空格的问题
               if(select.charAt(0)=="."){
                     return getClass(select.slice(1),obj);
               }else if(select.charAt(0)=="#"){
                  return obj.getElementById(select.slice(1));
               }else if(/^[a-z|1-6]{1,10}$/g.test(select)){
                    return obj.getElementsByTagName(select);
               }
          }
          else if(typeof select=="function"){
                  window.onload=function(){
                    select();
                  }
          }
      }


      //找儿子
      function getChilds(parent,type){
        var type=type||"a";
         var childs=parent.childNodes;//此句无兼容，获取所有。
         var arr=[];

         for(var i=0;i<childs.length;i++){          
          if(type=="a"){         
          if(childs[i].nodeType==1){
            arr.push(childs[i]);
          }
         }
         
          else if(type=="b"){
          if(childs[i].nodeType==1||(childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*&/g,""))){
            arr.push(childs[i]);
          }
          
      }
    }return arr;

  }

    //获得第一个儿子
    function getFirst(parent){
      return getChilds(parent)[0];
    }
     //获得最后1个儿子
    function getLast(parent){     
      return getChilds(parent)[getChilds(parent).length-1];     
    }

    //获得指定节点
    function getNum(parent,num){
      return getChilds(parent)[num];
    }
//获得下一个兄弟节点
    function getNext(obj){
      var next=obj.nextSibling;
      if(next==null){return false;} 
      while(next.nodeType==3||next.nodeType==8){
               next=next.nextSibling;
               if(next==null){return false;}               
               }return next;
      }

      //上一个
      function getUp(obj){
      var up=obj.nextSibling;
      if(up==null){return false;}//增加条件，如果直接为空则返回false
      while(up.nodeType==3||up.nodeType==8){
               up=up.previousSibling;
               if(up==null){return false;}               
               }return up;
      }


      //利用原型  插入到一个节点之后 原理是下一个节点之前
   /*   Object.prototype.insertAfter=function(obj1,obj2){
          var next=getNext(obj2);
        if(next){
          this.insertBefore(obj1,next);
        }else{
          this.appendChild(obj1);
        }
      }*/

//滚动条

    function getScrollT(){
    var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
         return scrollT;
  }
//添加多个事件火狐和ie8的兼容问题
//obj:调价事件 的对象
//ev：什么事件
//fun：时间处理程序
function addEvent(obj,ev,fun){
  if(obj.addEventListener){
    return obj.addEventListener(ev,function(){
      fun.call(obj);
    },false);
  }else{
    return obj.attachEvent("on"+ev,function(){
      fun.call(obj);
    })
    //在ie8 this不指示当前对象，而是window ff赋值一下生的出问题，之前那样没有问题
  }
}
//删除事件
function removeEvent(obj,ev,fun){
  if(obj.removeEventListener){
    return obj.removeEventListener(ev,function(){
      fun.call(obj);
    },false);
  }else{
    return obj.detachEvent("on"+ev,function(){
      fun.call(obj);
    })
    //在ie8 this不指示当前对象，而是window ff赋值一下生的出问题，之前那样没有问题
  }
}

//
function getCW(){
  return document.documentElement.clientWidth;

}

function getCH(){
  return document.documentElement.clientHeight;
  
}
//鼠标移动事件函数
function getMove(obj){
        var ch=getCH();
        var cw=getCW();
        var ow=obj.offsetWidth;
        var oh=obj.offsetHeight;
        //事件委托的思想
        obj.onmousedown=function(e){
            var ev=e||window.event;
            var ox=ev.offsetX;
            var oy=ev.offsetY;
            //阻止浏览器的默认行为
            if(ev.preventDefault){
              ev.preventDefault();//w3c
            }else{
              ev.returnValue=false;//ie
            }
            //事件委托的思想
          document.onmousemove=function(e){
                var ev=e||window.event;
                var cx=ev.clientX;
                var cy=ev.clientY;
                var newx=cx-ox;
                var newy=cy-oy;

                if(newx<=0){
                 newx=0;
                }
                if(newx>=(cw-ow)){
                  newx=cw-ow;
                }
                if(newy<=0){
                 newy=0;
                }
                if(newy>=(ch-oh)){
                  newy=ch-oh;
                }
                obj.style.left=newx+"px";
                obj.style.top=newy+"px";
          }
        }

        obj.onmouseup=function(){document.onmousemove=null;

        }
      }

      //lunbo4 效果函数
        function lunbo(num){
          var bigbox=$(".bigbox")[num];
        var anniu1=$(".anniu1")[num];
        var anniu2=$(".anniu2")[num];
        function moveleft(){
        animate(bigbox,{left:-100},1000,Tween.Linear,function(){
        var first=getFirst(bigbox);
        var last=getLast(bigbox);       
        bigbox.appendChild(first);
        bigbox.style.left=0;
        })
        } 
        function moveright(){
        var first=getFirst(bigbox);
        var last=getLast(bigbox);
         bigbox.style.left=-100+"px";       
        bigbox.insertBefore(last,first);
        animate(bigbox,{left:0},1000,Tween.Linear);
        }
        var t=setInterval(moveleft,5000);
        
        anniu1.onmouseover=anniu2.onmouseover=function(){
            clearInterval(t);
        }
        anniu1.onmouseout=anniu2.onmouseout=function(){
            t=setInterval(moveleft,5000);
        }
        
        anniu1.onclick=function(){
        moveleft();
        }
        anniu2.onclick=function(){
        moveright();
        }

      }



//滚轮函数
//obj哪个对象添加滚轮事件
//upfun处理滚轮向上的函数
//downfun处理滚轮向下的函数
function mouseWheel(obj,upfun,downfun){
    
if(obj.attachEvent){ obj.attachEvent("onmousewheel",scrollFn);  //IE、 opera 
           }else if(obj.addEventListener){ obj.addEventListener("mousewheel",scrollFn,false);  
           //chrome,safari    -webkit- 
           obj.addEventListener("DOMMouseScroll",scrollFn,false);  
           //firefox     -moz-
            }


            function scrollFn(e)
                {
                    var ev=e||window.event;
                    if (ev.preventDefault ) ev.preventDefault(); 
            //阻止默认浏览器动作(W3C) 
            else ev.returnValue = false;
            //IE中阻止函数器默认动作的 方式
                     var num=ev.detail||ev.wheelDelta;
                     if(num==-3||num==120){
                      if(upfun){
                        upfun();
                      }
                     }
                     if(num==3||num==-120){
                      if(downfun){
                        downfun();
                      }
                     }
               }

}

//下拉列表实现功能函数
//15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/

//楼层轮播函数
function lunbolc(num){
   var  boxbig1=$(".floor22-bb")[num];
   var  box1=$(".floor22-sm",boxbig1);
   var  change=$(".floor22-change")[num];
   var  one=$(".floor22-one",change);
   var  one1=$(".one1",change);
   var  image2=$("img",boxbig1);
   
    var n=setInterval(move1,2400);  
    var val=1;
    function move1(){

      if(val==3){
      animate(boxbig1,{top:0,left:-330*val},200,function(){
       for(var i=0;i<one1.length;i++){
    one1[i].style.width=0;
  }
    animate(one1[val-1],{width:30},2000);
    boxbig1.style.left=0; 
      })

        val=0;
     }
    else{
  animate(boxbig1,{top:0,left:-330*val},200,function(){
    for(var i=0;i<one1.length;i++){
    one1[i].style.width=0;
  }
    animate(one1[val-1],{width:30},2000);
  })
 
}
  val++;

  
    for(var i=0;i<one.length;i++){
  one[i].index=i;
  one[i].onmouseover=function(){
    clearInterval(n);
    for(var j=0;j<one.length;j++){
      one[j].style.background="#ccc";
      one1[j].style.width=0;
    }
    animate(boxbig1,{top:0,left:-330*this.index},200);
    //one[this.index].style.background="red";
    one1[this.index].style.width=30+"px";
  }  

  one[i].onmouseout=function(){
    n=setInterval(move1,2400);
    one[this.index].style.background="#ccc";
    val=this.index+1;
  }  

 } 
}
for(var i=0;i<image2.length;i++){
  image2[i].index=i;
  image2[i].onmouseover=function(){
    clearInterval(n);
    for(var j=0;j<one.length;j++){
      one1[j].style.width=0;
    }
    animate(one1[this.index],{width:30},0);
     animate(image2[this.index],{opacity:0.85},50,function(){
      animate(image2[this.index],{opacity:1},50)
    }) 
  }
  image2[i].onmouseout=function(){
   n=setInterval(move1,2400);
   val=this.index;
  }
}

}