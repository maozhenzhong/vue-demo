# 控件规范

### 控件类型

> **title** detail
> 
> ### 规则
> 
> * 控件规则
> * 控件规则
> * 控件规则
> * ...  
> 
> ### 错误提示
> 
> * `ER-id1`
> * `ER-id2`
> 

### 员工管理

* 1、`INPUT-REALNAME`:  员工姓名
* 2、`INPUT-STAFF`: 员工编号
* 3、`INPUT-CELLPHONE`: 员工手机号
* 4、`AVATAR-UPLOAD`: 员工头像
* 5、`INPUT[disabled]-USERGROUP`: 所属银行机构
* 6、`INPUT-OLD-PASSWORD`: 原密码
* 7、`INPUT-PASSWORD`: 新密码
* 8、`INPUT-REPASSWORD`: 确认密码
* 9、`INPUT-VERIFICATION-CODE`: 手机验证码

****

### 1、`INPUT-REALNAME`

**员工姓名** 控件规范：用于描述员工姓名控件规范

#### 验证规则

* 不能为空
* 2-10位汉字

#### 错误提示

* `ER_REALNAME_EMPTY` 员工姓名不能为空
* `ER_REALNAME` 员工姓名格式不正确，2-10位汉字

### 2、`INPUT-STAFF`

**员工编号** 控件规范：用于描述员工编号控件规范

#### 验证规则

* 不能为空
* 2-30位英文字母+数字

#### 错误提示

* `ER_STAFF_EMPTY` 员工编号不能为空
* `ER_STAFF` 员工编号格式不正确，包含2-30位英文字母或数字

### 3、`INPUT-CELLPHONE`

**员工手机号** 控件规范：用于描述手机号控件规范
[手机验证规则在公共部分](./common.md/#cellphone)

### 4、`AVATAR-UPLOAD`

**员工头像** 控件规范：用于描述头像控件规范
[头像验证规则在公共部分](./common.md/#avatar)

### 5、INPUT[disabled]-USERGROUP

> 所属银行机构没有修改权限，前端不做验证

### 6、`INPUT-OLD-PASSWORD`

**原密码** 控件规范：用于描述原密码控件规范  
[原密码验证规则在公共部分](./common.md/#oldPassword)

### 7、`INPUT-PASSWORD`

**新密码** 控件规范：用于描述新密码控件规范  
[新密码验证规则在公共部分](./common.md/#password)

### 8、`INPUT-RE-PASSWORD`

**确认密码** 控件规范：用于描述确认密码控件规范  
[确认密码验证规则在公共部分](./common.md/#rePassword)

### 9、`INPUT-VERIFICATION-CODE`

**手机验证码** 控件规范：用于描述手机验证码控件规范  
[手机验证码验证规则在公共部分](./common.md/#verificationCode)