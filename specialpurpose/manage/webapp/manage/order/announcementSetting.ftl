
<script type="text/javascript">
function submitFormDisableSubmits(form) {
    for (var i=0;i<form.length;i++) {
        var formel = form.elements[i];
        if (formel.type == "submit") {
            submitFormDisableButton(formel);
            var formName = form.name;
            var formelName = formel.name;
            var timeoutString = "submitFormEnableButtonByName('" + formName + "', '" + formelName + "')";
            var t = setTimeout(timeoutString, 1500);
        }
    }
}
 $(function(){ 
		$(".breadcrumb").append("<li class='active'>网站管理</li><li class='active'>公告设置</li>")
	}); 
</script>
<div class="page-content" style=" margin:15px; margin-top:5px;">
	<div style="padding-top:15px;">
		<form id="orderForm" name="orderForm" class="pageForm" method="post" action="<@ofbizUrl>mng_announcementSetting</@ofbizUrl>">
                    <div class="form-group" style="float:left;">
                        <label class="col-sm-2 control-label no-padding-right" style="width:80px; padding-top:10px;">关键字</label>

                        <div class="col-sm-9" style="width:400px;">
                            <input class="col-xs-10 col-sm-5" type="text" id="messageTitle" style="width:250px; margin-top:5px;" name="messageTitle" placeholder="输入标题名称进行查询……" value="${(advertisingName)!}">
                             &nbsp; &nbsp; &nbsp;<input class="btn btn-primary" type="submit" value=" 查询">
                        </div>
                    </div>
           </form>
    </div>                 
    <div class="page-content-area">

        <div class="row">
            <div class="col-xs-12">
                        <table id="sample-table-2"
                               class="table table-bordered table-striped table-condensed">
                            <thead>
                            <tr role="row">
                                <th class="" tabindex="0" aria-controls="sample-table-2" rowspan="1" colspan="1"
                                    aria-label="" align="center" style="text-align:center;">
                                    序号
                                </th>
                                <th class="" tabindex="0" aria-controls="sample-table-2" rowspan="1" colspan="1"
                                    aria-label="" style="text-align:center;">
                                    公告标题
                                </th>
                                <th class="" tabindex="0" aria-controls="sample-table-2" rowspan="1" colspan="1"
                                    aria-label="" style="text-align:center;">
                                    公告内容
                                </th>
                                <th class="hidden-480" tabindex="0" aria-controls="sample-table-2" rowspan="1"
                                    colspan="1" aria-label="" style="text-align:center;">
                                    创建时间
                                </th>
                                <th class="hidden-480" tabindex="0" aria-controls="sample-table-2" rowspan="1"
                                    colspan="1" aria-label="" style="text-align:center;">
                                    是否发布
                                </th>
                                <th class="hidden-480" tabindex="0" aria-controls="sample-table-2" rowspan="1"
                                    colspan="1" aria-label="" style="text-align:center;">
                            <#--          描述
                                </th>
                           <th class="hidden-480" tabindex="0" aria-controls="sample-table-2" rowspan="1"
                                    colspan="1" aria-label="">
          LOGO
                                </th>
                                  
                                <th style="width:70px;" rowspan="1" colspan="1" aria-label=""> -->
                                    操作
                                </th>
                            </tr>
                            </thead>
                            
                            <tbody>
						 		<#if MessageSetList?has_content>
						        <#list MessageSetList as messages>
                                <tr class="odd">
                                    <td style="text-align:center;">${(messages.messageId)!}</td>
                                    <td style="text-align:center;">${(messages.messageTitle)!}</td>
                                    <td style="text-align:center;"> 
                                    <#if messages.messageContent?has_content>
                                    <#if messages.messageContent?length gt 100>${(messages.messageContent[0..100])?if_exists}..<#else>${messages.messageContent?if_exists}</#if>
                                    </#if>
                                    </td>
                                    <td style="text-align:center;">${(messages.lastUpdatedStamp)!}</td>
                                    <td style="text-align:center;">${(messages.releases)!}</td>
                                  <#--   <td>${(brand.brandLogoImage)!}</td> -->
                                     <td>
                                     <div class="hidden-sm hidden-xs action-buttons" style="text-align:center;">
                                   <!--   <a class="blue" href="#"> <i class="ace-icon fa fa-search-plus bigger-130"></i> </a> -->
                                     <a class="green" href="<@ofbizUrl>create_mng_Announcement</@ofbizUrl>?messageId=${(messages.messageId)!}" title="更新"> <i class="ace-icon fa fa-pencil bigger-130"></i> </a>
                                     <a class="green" href="<@ofbizUrl>release_mng_Announcement</@ofbizUrl>?messageId=${(messages.messageId)!}" title="发布/未发布"> <image src="../../manage/images/fb.jpg"> </a>
                                     <a class="red" href="javascript:document.ListProductStoreBranddeleteLink_${(messages.messageId)!}.submit()" title="删除"> <i class="ace-icon fa fa-trash-o bigger-130"></i> </a> 
                                     
                   <form onsubmit="javascript:submitFormDisableSubmits(this)" method="post" name="ListProductStoreBranddeleteLink_${(messages.messageId)!}" action="<@ofbizUrl>removeMessage</@ofbizUrl>">
					<input name="messageId" value="${(messages.messageId)!}" type="hidden">
						<input name="VIEW_INDEX_1" value="0" type="hidden">
						<input name="VIEW_SIZE_1" value="20" type="hidden">
				   </form>
                                     </div>
                                     
                                     
                                     
             </td>
              
              

              
                                </tr>
                                </#list>
        </#if>	
                            </tbody>
                        </table>
        </div>
    </div>
    <!-- /.page-content-area -->
</div>
</body>