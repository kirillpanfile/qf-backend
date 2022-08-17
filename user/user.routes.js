"use strict";var router=require("express").Router(),_require=require("../middleware/jwt.middleware"),verifyToken=_require.verifyToken,isAdmin=_require.isAdmin,_require2=require("./user.controller"),getAllUsers=_require2.getAllUsers,getPages=_require2.getPages,deleteMultipleUsers=_require2.deleteMultipleUsers,deleteUser=_require2.deleteUser,searchUsers=_require2.searchUsers,getUserById=_require2.getUserById,updateUser=_require2.updateUser,getRoles=_require2.getRoles;router.get("/all",[verifyToken,isAdmin],getAllUsers),router.get("/pages",[verifyToken,isAdmin],getPages),router.post("/deleteMultiple",[verifyToken,isAdmin],deleteMultipleUsers),router.delete("/delete/:id",[verifyToken,isAdmin],deleteUser),router.get("/search/:name",[verifyToken,isAdmin],searchUsers),router.get("/:id",[verifyToken,isAdmin],getUserById),router.put("/update/:id",[verifyToken,isAdmin],updateUser),router.get("/roles/all",[verifyToken,isAdmin],getRoles),module.exports=router;