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
import org.ofbiz.entity.Delegator;
import org.ofbiz.entity.GenericValue;
import org.ofbiz.entity.GenericEntityException;
import org.ofbiz.security.Security;
import org.ofbiz.entity.model.ModelReader;
import org.ofbiz.entity.model.ModelEntity;
import org.ofbiz.entity.model.ModelViewEntity;
import org.ofbiz.entity.model.ModelViewEntity.ModelAlias;
import org.ofbiz.entity.model.ModelField;
import org.ofbiz.entity.model.ModelFieldType;
import org.ofbiz.entity.GenericEntity;
import org.ofbiz.base.util.UtilFormatOut;
import org.ofbiz.base.util.UtilProperties;
import org.ofbiz.base.util.UtilValidate;
import org.ofbiz.entity.condition.EntityExpr;
import org.ofbiz.entity.condition.EntityCondition;
import org.ofbiz.entity.condition.EntityConditionList;
import org.ofbiz.entity.condition.EntityFieldMap;
import org.ofbiz.entity.condition.EntityOperator;
import org.ofbiz.entity.transaction.TransactionUtil;
import org.ofbiz.entity.util.EntityFindOptions;
import org.ofbiz.entity.util.EntityListIterator;
import org.ofbiz.base.util.Debug;
import java.sql.Timestamp;
import java.sql.Date;
import java.sql.Time;
import javolution.util.FastList;
import javolution.util.FastMap;
import javolution.util.FastSet;
ModelReader reader = delegator.getModelReader();
ModelEntity modelEntity = reader.getModelEntity(parameters.entityName);
List fieldList = FastList.newInstance();
fieldIterator = modelEntity.getFieldsIterator();
while (fieldIterator.hasNext()) {
    ModelField field = fieldIterator.next();
    ModelFieldType type = delegator.getEntityFieldType(modelEntity, field.getType());

    Map fieldMap = FastMap.newInstance();
    fieldMap.put("name", field.getName());
    fieldMap.put("description", field.getDescription());
    fieldMap.put("isPk", (field.getIsPk() == true) ? "Y" : "N");
    fieldMap.put("javaType", type.getJavaType());
    fieldMap.put("sqlType", type.getSqlType());
    fieldMap.put("param", (parameters.get(field.getName()) != null ? parameters.get(field.getName()) : ""));
    if(field.getIsPk() == false&&UtilValidate.isNotEmpty(field.getDescription())){
	fieldList.add(fieldMap);
    }
}
request.setAttribute("fieldList",fieldList);
return "success";