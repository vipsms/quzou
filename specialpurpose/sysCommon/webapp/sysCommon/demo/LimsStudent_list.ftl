<@htmlTemplate.navTitle titleProperty/>
<div class="search_area">
	<table>
		<tr>
			<td>
				<form  id='${searchForm!}' action="${searchAction}" method="post">
					<table class="searchContent">
						<tr>
							<td>
							学生姓名：<input type="text" name="studentName" value='${queryStringMap.studentName!}'/>
								<input type="hidden" value="Y" name="studentName_ic">
								<input type="hidden" value="contains" name="studentName_op">
							</td>
						</tr>
					</table>
				</form>
			<td>
				<@htmlTemplate.searchButton searchForm/>
			</td>
		</tr>
	</table>
	<div>
		<@htmlTemplate.operButton operationButton/>
	</div>
</div>
<div class="listheight" style="height:75%; width:100%; overflow-y: auto;">
   	<table class="basic-table hover-bar" cellspacing="0" width="100%">
	     <thead>
			<tr class='header-row-2'>
				<td width="10%"><input type="checkBox" class="checkboxCtrl" group="ids"></td>
		        <td sortField="studentName" >学生姓名</td>
		        <td >邮箱地址</td>
		        <td sortField="seatNo" >座位号</td>
		        <td >出生年月</td>
		        <td >性别</td>
		        <td >星座</td>
		        <td >班级名称</td>
		        <td >姓名</td>
		        <td >编辑</td>
		        <td >删除</td>
		      </tr>
	     </thead>
<#if LimsStudentList?has_content>  
    <#assign alt_row = false>
    <#assign rowCount = 0>
    <#list LimsStudentList as entityRow>
      <tr valign="middle"<#if alt_row> class="alternate-row"</#if>>
	  <td><input type="checkbox" value="${entityRow.studentId!}" name="ids" ></td>
		<td>${entityRow.studentName!}</td>
			
		<td>${entityRow.studentEmail!}</td>
			
		<td>${entityRow.seatNo!}</td>
			
		<td>${entityRow.birthDate!}</td>
			
		<td><#if entityRow.gender??> <#assign enum = delegator.findOne("Enumeration", Static["org.ofbiz.base.util.UtilMisc"].toMap("enumId", entityRow.gender), true)?if_exists>
		<#if enum??>${enum.description!}</#if></#if></td>
			
		<td>${entityRow.sign!}</td>
			
		<td><#if entityRow.classId??> <#assign relEntity = delegator.findOne("LimsClass", Static["org.ofbiz.base.util.UtilMisc"].toMap("classId", entityRow.classId), true)?if_exists>
		<#if relEntity??>${relEntity.className!}</#if></#if></td>
			
		<td><#if entityRow.girlPartyId??> <#assign relEntity = delegator.findOne("Person", Static["org.ofbiz.base.util.UtilMisc"].toMap("partyId", entityRow.girlPartyId), true)?if_exists>
		<#if relEntity??>${relEntity.firstName!}</#if></#if></td>
			
	        
	  <td><#if security.hasEntityPermission("LimsStudent", "_UPDATE", session)><a title="编辑"  href="EditLimsStudent?studentId=${entityRow.studentId!}" class="btnEdit">编辑</a></#if></td>
	  <td><#if security.hasEntityPermission("LimsStudent", "_DELETE", session)><a title="删除"  href="deleteLimsStudent?studentId=${entityRow.studentId!}" class="btnDel">删除</a></#if></td>
      </tr>
      <#assign rowCount = rowCount + 1>
      <#assign alt_row = !alt_row>
    </#list>
    </table>
  </#if>
</div>
	