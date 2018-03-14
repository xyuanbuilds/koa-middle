const models = require('./model.js');

// 调用的是db中暴露的exp的sync方法
// 同步所有model到数据库
// 方便批量修改model的同步
// 但存在一个同步顺序问题，使得无法设置外键，弃用

const {
  ShopHotelItems,
  ShopsInfos,
  ShopFoodItems,
  ShopFoodCategorys,
  UsersInfos
} = models

// 模型间的关系
// 店铺的外键: 用户的id
// belongsTo会设置外键
// ShopsInfos.belongsTo(UsersInfos, {
//   as: 'Master',
//   // foreignKey会直接设置外键的名字
//   // foreignKey: 'fk_companyname',
//   // 默认目标键是目标模型的主键，可通过该属性自定义键位
//   // targetKey: 'name' 
// })

// hasOne会为源模型添加访问器方法访问被设置了外键的模型
UsersInfos.hasOne(ShopsInfos, {
  as: 'Master'
})

ShopsInfos.hasMany(ShopFoodCategorys,{
  as: 'FoodCategorys'
})
ShopsInfos.hasMany(ShopHotelItems, {
  as: 'HotelItems'
})
ShopFoodCategorys.hasMany(ShopFoodItems, {
  as: 'FoodItems'
})

models.sync();
// 使用每个model单独的sync, 控制model的生成顺序
// models.ShopsInfos.sync();
// models.UsersInfos.sync();
// models.ShopHotelItems.sync();
// models.ShopFoodCategorys.sync();
// models.ShopFoodItems.sync();

console.log('init db ok.');

// process.exit(0);