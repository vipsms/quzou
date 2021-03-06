/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

import java.math.BigDecimal;
import java.util.*;
import java.sql.Timestamp;

import javolution.util.FastList;
import javolution.util.FastMap;

import org.ofbiz.entity.*;
import org.ofbiz.entity.condition.*;
import org.ofbiz.entity.util.*;
import org.ofbiz.base.util.*;

BigDecimal calcItemTotal(List headers) {
   BigDecimal total = BigDecimal.ZERO;
   headers.each { header ->
	   total = total.plus(header.grandTotal ?: BigDecimal.ZERO);
   }
   return total;
}

if(yearStr){
   int year = Integer.parseInt(yearStr);
   def yearResultList = FastList.newInstance();
   for(int currentMonth = 1; currentMonth <= 12; currentMonth++){
	   monthCal = Calendar.getInstance();
	   monthCal.set(Calendar.YEAR, year);
	   monthCal.set(Calendar.MONTH, currentMonth-1);
	   monthCal.set(Calendar.DAY_OF_MONTH, monthCal.getActualMinimum(Calendar.DAY_OF_MONTH));
	   monthCal.set(Calendar.HOUR_OF_DAY, monthCal.getActualMinimum(Calendar.HOUR_OF_DAY));
	   monthCal.set(Calendar.MINUTE, monthCal.getActualMinimum(Calendar.MINUTE));
	   monthCal.set(Calendar.SECOND, monthCal.getActualMinimum(Calendar.SECOND));
	   monthCal.set(Calendar.MILLISECOND, monthCal.getActualMinimum(Calendar.MILLISECOND));
	   monthBegin = new java.sql.Timestamp(monthCal.getTimeInMillis());
	   nextMonthCal = Calendar.getInstance();
	   nextMonthCal.setTimeInMillis(monthCal.getTimeInMillis());
	   nextMonthCal.set(Calendar.DAY_OF_MONTH, nextMonthCal.getActualMaximum(Calendar.DAY_OF_MONTH));
	   nextMonthCal.set(Calendar.HOUR_OF_DAY, nextMonthCal.getActualMaximum(Calendar.HOUR_OF_DAY));
	   nextMonthCal.set(Calendar.MINUTE, nextMonthCal.getActualMaximum(Calendar.MINUTE));
	   nextMonthCal.set(Calendar.SECOND, nextMonthCal.getActualMaximum(Calendar.SECOND));
	   nextMonthCal.set(Calendar.MILLISECOND, nextMonthCal.getActualMaximum(Calendar.MILLISECOND));
	   monthEnd = new java.sql.Timestamp(nextMonthCal.getTimeInMillis());
	   
	   List<EntityCondition> conditions = FastList.newInstance();
	   productStoreId = (String)parameters.get("productStoreId");
	   if(productStoreId){
		   conditions.add(EntityCondition.makeCondition("productStoreId", EntityOperator.EQUALS, productStoreId));
	   }
	   conditions.add(EntityCondition.makeCondition("orderDate", EntityOperator.GREATER_THAN_EQUAL_TO, monthBegin));
	   conditions.add(EntityCondition.makeCondition("orderDate", EntityOperator.LESS_THAN_EQUAL_TO, monthEnd));
	   conditions.add(EntityCondition.makeCondition("orderTypeId", EntityOperator.EQUALS, "SALES_ORDER"));
	   monthHeaders = delegator.findList("OrderHeader", EntityCondition.makeCondition(conditions, EntityOperator.AND), null, null, null, false);
	   monthResultMap = FastMap.newInstance();
	   //成功订单
	   monthHeadersCompleteds = EntityUtil.filterByAnd(monthHeaders, [statusId : "ORDER_COMPLETED"]);
	   monthItemCompletedTotal = calcItemTotal(monthHeadersCompleteds);//总金额
	   monthResultMap.put("monthItemCompletedTotal", monthItemCompletedTotal);
	   monthResultMap.put("currentMonth", monthBegin.toString().substring(0, 7));
	   yearResultList.add(monthResultMap);
   }
   context.yearResultList = yearResultList;
}