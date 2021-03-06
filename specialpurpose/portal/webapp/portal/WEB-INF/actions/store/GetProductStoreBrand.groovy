import org.ofbiz.base.util.UtilValidate
import org.ofbiz.entity.condition.*
import org.ofbiz.entity.util.EntityUtil;
import javolution.util.FastList;

if (userLogin) {
    condList = FastList.newInstance();
    condList.add(EntityCondition.makeCondition("partyId", EntityOperator.EQUALS, userLogin.partyId));
    condList.add(EntityCondition.makeCondition("roleTypeId", EntityOperator.EQUALS, "OWNER"));
    rolesCond = EntityCondition.makeCondition(condList, EntityOperator.AND);
    productStoreRoleList = delegator.findList("ProductStoreRole", rolesCond, null, ["-sequenceNum"], null, false);

    productStoreRoleList = EntityUtil.filterByDate(productStoreRoleList);
    if (UtilValidate.isNotEmpty(productStoreRoleList)) {
        productStoreRole = EntityUtil.getFirst(productStoreRoleList);
        context.productStoreId = productStoreRole.productStoreId;
        productStore = delegator.findOne("ProductStore", [productStoreId : productStoreRole.productStoreId], false)
        context.productStore = productStore;
    }
    if(productStoreBrandId){
    	productStoreBrand = delegator.findOne("ProductStoreBrand",[productStoreBrandId: productStoreBrandId,productStoreId:productStoreRole.productStoreId], false);
    	context.productStoreBrand = productStoreBrand;				
    }
    println "---------------------------------context.productStoreBrand="+context.productStoreBrand;
    
}