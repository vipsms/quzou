M.define("index",function(a){var b=function(c){this.init(c)};M.object.merge(b.prototype,{init:function(c){this.threadTime=500;this.thread=new (M.exports("thread").clazz)({time:this.threadTime});this.localStorageUtil=new (M.exports("LocalStorageUtil").clazz)();this.sliderTouchXY={};this.sliderTime=0;this.sliderImgIndex=1;this.searchHistoryLocalStorageName="searchhistory";this.themeIdList=[];this.themeImgTimer={};this.searchWord="";this.searchliIdList=[];this.searchCookie=false;this.isShowOldData=false;this.oldkeyword="";if(M.object.isObject(c)){this.downInit(c);this.sliderInit(c);this.themeImgInit(c);this.seckillInit(c)}},sliderInit:function(d){var c=this;if(d.sliderImgList&&M.object.isArray(d.sliderImgList)){c.sliderImgList=d.sliderImgList}else{c.sliderImgList=[]}},sliderSetUlWidth:function(){var c=this;if(c.sliderImgList.length>1){c.sliderWidth=$("#slider").width();$("#slider_touch").css("width",(c.sliderImgList.length+"00%"));$("#slider_touch").find("li").css("width",c.sliderWidth)}},sliderSetLiWidth:function(){var c=this;if(c.sliderImgList.length>1){$("#slider_touch").find("li").css("width",c.sliderWidth)}},sliderHTML:function(){var e=[];var f=this;for(var d=0;d<f.sliderImgList.length;d++){var c=f.sliderImgList[d];e.push('<li style="float:left;"><a href="'+c.url+'" ><img alt="'+c.title+'"  style="z-index:1;height:auto; max-width:640px; min-width:320px; width: 100%" src="'+c.img+'"  /></a></li>')}e=e.join("");$("#slider_touch").html("");$("#slider_touch").html(e)},sliderImg:function(){var c=this;if(c.sliderImgIndex<0){c.sliderImgIndex=c.sliderImgList.length-1}else{if(c.sliderImgIndex>=c.sliderImgList.length){c.sliderImgIndex=0}}$("#slider_touch").animate({left:("-"+(c.sliderImgIndex*c.sliderWidth)+"px")},200,"ease-in");$("#serial-number").find("span").removeClass("selected");$("#serial-number").find("span").eq(c.sliderImgIndex).addClass("selected");c.sliderImgIndex++},sliderRun:function(d){var c=this;if(c.sliderTime>=4000){c.sliderImg();c.sliderTime=0}else{c.sliderTime=c.sliderTime+d}},sliderRender:function(){var c=this;c.sliderSetUlWidth();c.sliderHTML();c.sliderSetLiWidth();c.thread.addOne({name:"slider",event:c.sliderRun,source:c});$("#slider").on("touchstart",function(d){c.sliderTouchXY.startX=d.touches[0].clientX;c.sliderTouchXY.startY=d.touches[0].clientY;c.sliderTouchXY.initX=c.sliderTouchXY.startX;c.sliderTouchXY.finishX=0});$("#slider").on("touchmove",function(f){var i=f.touches;var e=f.touches[0].clientX;var d=f.touches[0].clientY;if(Math.abs(d-c.sliderTouchXY.startY)>Math.abs(e-c.sliderTouchXY.startX)){return}f.preventDefault();c.thread.closeOne("slider");c.sliderTime=0;c.sliderTouchXY.finishX=e;var h=Math.abs(e-c.sliderTouchXY.startX);var g=$("#slider_touch").css("left").replace("px","");if(c.sliderTouchXY.startX>e){$("#slider_touch").css("left",(parseInt(g)-h)+"px")}else{$("#slider_touch").css("left",(parseInt(g)+h)+"px")}c.sliderTouchXY.startX=e});$("#slider").on("touchend",function(d){if(c.sliderTouchXY.finishX!=0){if(c.sliderTouchXY.initX>c.sliderTouchXY.finishX){c.sliderImg()}else{if(c.sliderTouchXY.initX<c.sliderTouchXY.finishX){c.sliderImgIndex=c.sliderImgIndex-2;c.sliderImg()}}c.sliderTouchXY.initX=0;c.sliderTouchXY.finishX=0;c.thread.openOne("slider",true)}})},themeImgInit:function(k){var g=this;if(k.themeIdList){if(M.object.isArray(k.themeIdList)){g.themeIdList=k.themeIdList}else{if(M.object.isString(k.themeIdList)){g.themeIdList.push(k.themeIdList)}}if(g.themeIdList.length>0){for(var f=0;f<g.themeIdList.length;f++){g.themeImgTimer[g.themeIdList[f]]={};g.themeImgTimer[g.themeIdList[f]].time=g.threadTime*(f+1);g.themeImgTimer[g.themeIdList[f]].imgArray=[];g.themeImgTimer[g.themeIdList[f]].imgrun=false;g.themeImgTimer[g.themeIdList[f]].rush=0;var c=0;var e=$("#"+g.themeIdList[f]).find("li");for(var d=0;d<e.length;d++){var l=$(e[d]).find("a").find("div").find("img");var h={index:0,num:0};if(l&&l.length>=2){c++;h.num=l.length}g.themeImgTimer[g.themeIdList[f]].imgArray.push(h);if(c>0){g.themeImgTimer[g.themeIdList[f]].imgrun=true}}}}}},themeImgRun:function(e){var c=this;for(var h=0;h<c.themeIdList.length;h++){var d=c.themeIdList[h];var g=c.themeImgTimer[d];if(g.imgrun){var n=$("#"+d).find("li");g.time=g.time-e;if(g.time<=0&&g.imgArray.length>0){var f=g.imgArray;var j=f[g.rush];if(g.runing){}if(j.num>1){var l=j.index;var k=j.index+1;if(k>=j.num){k=0}j.index=k;var m=$(n[g.rush]).find("div").find("img");$(m).eq(l).hide();$(m).eq(k).fadeIn(200)}g.rush++;if(g.rush==f.length){g.time=5000;g.rush=0}}}}},themeImgRender:function(){var c=this;c.thread.addOne({name:"theme",event:c.themeImgRun,source:c})},searchSelectRun:function(d){var c=this;if(d){c.searchSelect()}},searchSelect:function(){var f=this;var e=$("#keyword").val().trim();if(document.activeElement.id=="keyword"){if(e==""){f.oldkeyword="";if(!f.searchCookie){$("#searchSelect").html("");var d=f.localStorageUtil.get(f.searchHistoryLocalStorageName);if(d&&d.length>0){d=decodeURIComponent(d);var c=d.split("|");f.searchSelectUnbind();$("#searchSelect").html(f.searchSelectHtml(true,c));f.searchSelectBind(true);$("#searchSelect").show()}}f.searchCookie=true;f.isShowOldData=true}else{if(f.oldkeyword!=e){f.oldkeyword=e;f.searchCookie=false;f.isShowOldData=false;
M.http.ajax({
	url:"searchSuggestion",
	data:{keyword:e,_format_:"json"},
	success:function(j){
		$("#searchSelect").html("");
		if(j&&j.searchTipList&&j.searchTipList.length>0){
			var g=[];
			for(var h=0;h<j.searchTipList.length;h++){
				j.searchTipList[h].wname&&g.push(j.searchTipList[h].wname)
			}
			f.searchSelectUnbind();
			$("#searchSelect").html(f.searchSelectHtml(false,g));
			f.searchSelectBind(false);
			$("#searchSelect").show()
		}
	},
	error:function(g){}
	})
}else{if(!f.isShowOldData){f.searchCookie=false;f.isShowOldData=true;$("#searchSelect").show()}}}}else{f.searchCookie=false;if(f.isShowOldData){f.isShowOldData=false;$("#searchSelect").hide()}}},
searchSelectHtml:function(d,c){
	var g=this;
	var h=[];
	var f=0;
	g.searchliIdList=[];
	h.push('<ul class="history-list">');
	for(var e=0;e<c.length;e++){
		if($.trim(c[e])==""){continue}f++;
		g.searchliIdList.push("_searchhistory_"+e);
		h.push('<li  id="_searchhistory_'+e+'" class="history-item"><a class="history-link" href="javascript:void(0);">'+(c[e].length>=30?c[e].substring(0,30):c[e])+"</a></li>")
	}
	h.push('<li class="history-item">');
	if(d){h.push('<a id="clearHistory" class="history-link history-clear" href="javascript:void(0);">清除历史记录</a>')}
	h.push('<a id="closeTip" class="'+(d?"history-link":"not-history-link")+' history-close" href="javascript:void(0);">关闭</a>');
	h.push('<div class="clear"></div></li>');
	h.push("</ul>");return f>0?h.join(""):""
	},
	searchSelectUnbind:function(){
		var e=this;
		if(e.searchliIdList&&e.searchliIdList.length>0){
			for(var d=0,c=e.searchliIdList.length;d<c;d++){
				$("#"+e.searchliIdList[d]).off("click")
			}
		}
	},
	searchSelectBind:function(c){
		var e=this;
		if(e.searchliIdList.length>0){
			for(var d=0;d<e.searchliIdList.length;d++){
				$("#"+e.searchliIdList[d]).on("click",function(){
					e.searchSelectItemBind($(this).attr("id"))
				})
			}
		}
		if(c){$("#clearHistory").on("click",function(){e.clearHistory()})}
		$("#closeTip").on("click",function(){e.closeTip()})
	},
	closeTip:function(){var c=this;c.isShowOldData=false;$("#searchSelect").hide()},
	clearHistory:function(){var c=this;c.localStorageUtil.remove(c.searchHistoryLocalStorageName);c.isShowOldData=false;$("#searchSelect").hide("")},
	searchSelectItemBind:function(d){
		var c=this;
		if($("#"+d).text()!=""){
			$("#keyword").val($("#"+d).find("a").eq(0).text());
			c.addSearchHistory($("#"+d).find("a").eq(0).text());
			$("#searchSelect").html("");
			$("#searchForm").submit()
		}
	},
	searchSelectRender:function(){var c=this;c.thread.addOne({name:"searchSelect",event:c.searchSelectRun,source:c});var c=this;$("#searchbtn").on("click",function(){var d=$("#keyword").val().trim();if(d!=""){d=c.filterSContent(d);$("#searchSelect").html("");c.addSearchHistory(d);$("#keyword").val(d);$("#searchForm").submit()}})},filterSContent:function(c){if(null!=c&&""!=c){c=c.trim().replace(new RegExp(/<script>/g),"").replace(new RegExp(/<\/script>/g),"")}return c},addSearchHistory:function(c){var k=this;if($.trim(c).length>0){c=k.filterSContent(c);var j=c+"|";var f=k.localStorageUtil.get(k.searchHistoryLocalStorageName);var e=0;if(f!=null){f=decodeURIComponent(f);var h=f.split("|");for(var d=0;d<h.length;d++){if(d==(e!=0?5:4)){break}h[d]=(h[d].length>=30?h[d].substring(0,30):h[d]);c=(c.length>=30?c.substring(0,30):c);if(h[d]!=c){j+=(h[d]+"|")}else{e++}}}k.localStorageUtil.set(k.searchHistoryLocalStorageName,encodeURIComponent(j))}},seckillInit:function(d){var c=this;if(d.seckill){if(d.seckill.seckillTime&&d.seckill.timeRemain){c.endTime=d.seckill.seckillTime;c.timeRemain=d.seckill.timeRemain;c.seckillTime=1000;c.seckillTimer()}}},seckillTimer:function(){var c=this;var d=c.localStorageUtil.get("index_seckill");var k=0;if(d){d=d.split("_");var j=d[0];var n=parseInt(d[1],10);var l=M.date.toDate(d[2]);var o=parseInt(d[3],10);if(c.endTime==j&&c.timeRemain==n){var e=new Date();var i=parseInt((e.getTime()-l.getTime())/1000,10);k=o-i;c.localStorageUtil.set("index_seckill",c.endTime+"_"+c.timeRemain+"_"+M.date.toString(e,"yyyy-MM-dd HH:mm:ss")+"_"+k)}else{var e=new Date();k=c.timeRemain;c.localStorageUtil.set("index_seckill",c.endTime+"_"+c.timeRemain+"_"+M.date.toString(e,"yyyy-MM-dd HH:mm:ss")+"_"+k)}}else{var e=new Date();k=c.timeRemain;c.localStorageUtil.set("index_seckill",c.endTime+"_"+c.timeRemain+"_"+M.date.toString(e,"yyyy-MM-dd HH:mm:ss")+"_"+k)}if(k>0){var p=k%60;var f=parseInt(k/60,10);var h=f%60;var g=parseInt(f/60,10);if(g<=0){$("#seckill_time").find("span").eq(0).text("0");$("#seckill_time").find("span").eq(1).text("0")}else{if(g>99){$("#seckill_time").find("span").eq(0).text("9");$("#seckill_time").find("span").eq(1).text("9")}else{if(g>9&&g<99){var g=g+"";$("#seckill_time").find("span").eq(0).text(g[0]);$("#seckill_time").find("span").eq(1).text(g[1])}else{var g=g+"";$("#seckill_time").find("span").eq(0).text("0");$("#seckill_time").find("span").eq(1).text(g[0])}}}if(h<=0){$("#seckill_time").find("span").eq(3).text("0");$("#seckill_time").find("span").eq(4).text("0")}else{if(h>9){h=h+"";$("#seckill_time").find("span").eq(3).text(h[0]);$("#seckill_time").find("span").eq(4).text(h[1])}else{$("#seckill_time").find("span").eq(3).text(0);$("#seckill_time").find("span").eq(4).text(h)}}if(p<=0){$("#seckill_time").find("span").eq(6).text("0");$("#seckill_time").find("span").eq(7).text("0")}else{if(p>9){p=p+"";$("#seckill_time").find("span").eq(6).text(p[0]);$("#seckill_time").find("span").eq(7).text(p[1])}else{$("#seckill_time").find("span").eq(6).text(0);$("#seckill_time").find("span").eq(7).text(p)}}}else{$("#seckill_time").find("span").eq(0).text("0");$("#seckill_time").find("span").eq(1).text("0");$("#seckill_time").find("span").eq(3).text("0");$("#seckill_time").find("span").eq(4).text("0");$("#seckill_time").find("span").eq(6).text("0");$("#seckill_time").find("span").eq(7).text("0")}},seckillRun:function(d){var c=this;c.seckillTime=c.seckillTime-d;if(c.seckillTime==0){c.seckillTime=1000;c.seckillTimer()}},seckillRender:function(){var c=this;c.thread.addOne({name:"seckill",event:c.seckillRun,source:c})},downInit:function(f){var e=this;e.downloadHideTime=1;if(f.downloadHideTime){e.downloadHideTime=f.downloadHideTime}var d=Date.now();var c=24*3600*1000*e.downloadHideTime;if(!e.localStorageUtil.get("indexdownCloseDate")||(e.localStorageUtil.get("indexdownCloseDate")&&d-parseInt(e.localStorageUtil.get("indexdownCloseDate"),10)>c)){e.weiXinIsInstall=false;e.DOWN_APP_URL="http://m.jd.com/download/downApp.html";e.DOWN_APP_IOS="http://union.m.jd.com/download/go.action?to=http%3A%2F%2Fitunes.apple.com%2Fcn%2Fapp%2Fid414245413&client=apple&unionId=12532&subunionId=m-top&key=e4dd45c0f480d8a08c4621b4fff5de74";e.DOWN_APP_ANDROID="http://m.jd.com/download/downApp.html";e.DOWN_WEIXIN="http://a.app.qq.com/o/simple.jsp?pkgname=com.jingdong.app.mall&g_f=991850";e.DOWN_IPAD="https://itunes.apple.com/cn/app/jing-dong-hd/id434374726?mt=8";e.INTENT_URL="openApp.jdMobile://360buy?params=";e.Chrome_Intent="intent://m.jd.com/#Intent;scheme=openApp.jdMobile;package=com.jingdong.app.mall;end";e.isChrome=M.browser.getBrowser().browser=="chrome";e.isAndroid=M.browser.getOs().os=="android";e.isWeiXin=navigator.userAgent.indexOf("MicroMessenger")>=0;e.isInstall=false;if(e.isWeiXin){if(window.WeixinJSBridge&&WeixinJSBridge.invoke){e.downWeixincheck()}else{document.addEventListener("WeixinJSBridgeReady",e.downWeixincheck,!1)}}e.IframeId="loadIframe";$("body").append('<iframe id="'+e.IframeId+'" style="display:none;width:0px;height:0px;"></iframe>')}else{$("#home-clientapp-entry").css("display","none")}},downWeixincheck:function(){var c=this;WeixinJSBridge.invoke("getInstallState",{packageName:"com.jingdong.app.mall",packageUrl:"openApp.jdMobile://"},function(f){var g=f.err_msg,d=0;if(g.indexOf("get_install_state:yes")>-1){c.isInstall=true}})},install:function(){var c=this;if(c.isWeiXin){if(c.isInstall){location.href=c.getIntentUrl()}else{location.href=c.DOWN_WEIXIN}return}if(M.browser.getOs().cline=="ipad"){c.redirect(c.DOWN_IPAD)}else{if(M.browser.getOs().cline=="iphone"){c.redirect(c.DOWN_APP_IOS)}else{c.redirect(c.DOWN_APP_URL)}}},redirect:function(c){var d=this;var e="";if(d.isChrome){if(d.isAndroid){e=d.getChromeIntent()}else{e=d.getIntentUrl()}}else{e=d.getIntentUrl()}$("#"+d.IframeId).attr("src",e);setTimeout(function(){location.href=c},100)},getIntentUrl:function(){var c=this;return c.INTENT_URL+"&r="+(new Date()).getTime()},getChromeIntent:function(c){return"intent://m.jd.com/#Intent;scheme="+c+";package=com.jingdong.app.mall;end"},downRender:function(){var c=this;$("#openJD").on("click",function(d){c.install()});$("#entry-icon-close").on("click",function(d){c.localStorageUtil.set("indexdownCloseDate",Date.now());$("#home-clientapp-entry").css("display","none")})},resizeFunction:function(){var c=this;$(window).on("resize",function(){c.sliderSetUlWidth();c.sliderImg();c.sliderTime=0})},run:function(){var c=this;if(c.sliderImgList&&c.sliderImgList.length>1){c.sliderRender()}if(c.themeIdList&&c.themeIdList.length>0){c.themeImgRender()}if(c.endTime){c.seckillRender()}c.searchSelectRender();c.downRender();c.resizeFunction();c.thread.start()}});a.clazz=b});M.define("LocalStorageUtil",function(a){var b=function(c){this.init()};M.object.merge(b.prototype,{init:function(){this.hasStorage=window.localStorage?true:false;if(this.hasStorage){try{window.localStorage.setItem("M_test",1)}catch(c){this.hasStorage=false;M.log("localStorage�޷�set","error")}try{window.localStorage.getItem("M_test")}catch(c){this.hasStorage=false;M.log("localStorage�޷�get","error")}try{window.localStorage.removeItem("M_test")}catch(c){this.hasStorage=false;M.log("localStorage�޷�remove","error")}}},get:function(d){var e=this;var c=undefined;if(e.hasStorage&&d){c=window.localStorage.getItem(d)}return c},set:function(c,e){var d=this;if(d.hasStorage&&c){window.localStorage.setItem(c,e)}},remove:function(c){var d=this;if(d.hasStorage&&c){window.localStorage.removeItem(c)}},removeAll:function(){if(source.hasStorage){M.object.each(window.localStorage,function(c){window.localStorage.removeItem(c)})}}});a.clazz=b});M.define("thread",function(a){var b=function(c){this.init(c)};M.object.merge(b.prototype,{init:function(d){this.eventState=this.eventState||{};this.eventList=[];this.closeList=[];this.openList=[];this.time=1000;if(M.object.isObject(d)){if(d.time&&M.object.isNumber(d.time)){this.time=d.time}this.isStart=false;if(d.eventList&&M.object.isArray(d.eventList)){this.eventList=d.eventList}if(this.eventList.length>0){for(var c=0;c<this.eventList.length;c++){if(this.eventList[c].name){this.eventState[this.eventList[c].name]=true}else{throw new Error("one eventName is null")}}}}},call:function(){var d=this;if(d.eventList.length>0){for(var c=0;c<d.eventList.length;c++){if(d.eventList[c]&&d.eventList[c].event){if(d.eventState[d.eventList[c].name]){d.runFunction(d.eventList[c]);d.runObject(d.eventList[c])}}}for(var c=0;c<d.closeList.length;c++){d.eventState[d.closeList[c]]=false}for(var c=0;c<d.openList.length;c++){d.eventState[d.openList[c]]=true}d.openList=[];d.closeList=[]}if(!d.stopThread){d.threadId=setTimeout(function(){d.isStart=true;d.call()},d.time)}},runFunction:function(e){var d=this;if(M.object.isFunction(e.event)){var c=null;if(e.source){c=e.source}if(e.name){d.eventState[e.name]=true}e.event.call(c,d.time)}},runObject:function(e){var d=this;if(M.object.isObject(e.event)){var c=null;if(e.source){c=e.source}if(M.object.isObject(e.event)&&M.object.isFunction(e.event.go)){e.event.go.call(c,d.time)}}},start:function(){var c=this;if(!c.isStart){c.threadId=setTimeout(function(){c.isStart=true;c.call()},c.time)}},openOne:function(c,e){var f=this;if(!M.object.isDefined(f.eventState[c])&&!f.eventState[c]){if(!e){f.eventState[c]=true}else{if(f.getOpenListIndex(c)==-1){f.openList.push(c);var d=f.getOpenListIndex(c);if(d>0){f.openList.splice(d,1)}}}}},closeOne:function(c,e){var f=this;if(!M.object.isDefined(f.eventState[c])&&f.eventState[c]){if(!e){f.eventState[c]=false}else{if(f.getCloseListIndex(c)!=-1){f.closeList.push(c);var d=f.getCloseListIndex(c);if(d>0){f.closeList.splice(d,1)}}}}},addOne:function(d,c){var e=this;if(M.object.isObject(d)){if(M.object.isObject(d)&&d.name){if(!c){e.eventState[d.name]=true}else{e.eventState[d.name]=false;e.openList.push(d.name)}e.eventList.push(d)}}},getCloseListIndex:function(d){var f=this;var c=-1;for(var e=0;e<f.closeList.length;e++){if(f.closeList[e]==d){c=e;break}}return c},getOpenListIndex:function(d){var f=this;var c=-1;for(var e=0;e<f.openList.length;e++){if(f.openList[e]==d){c=e;break}}return c},stop:function(){var c=this;if(!c.isStart){clearTimeout(c.threadId);c.stopThread=true}}});a.clazz=b});