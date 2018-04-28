# 控件规范

****

### 控件类型

> **title** detail
> 
> #### 规则
> 
> * 控件规则
> * 控件规则
> * 控件规则
> * ...  
> 
> #### 错误提示
> 
> * `ER-id1`
> * `ER-id2`
> 

## 联系方式控件规范

<span id="cellphone"></span>
### `INPUT-CELLPHONE`

**手机号** 控件规范：用于描述手机号码控件规范

#### 验证规则

* 不能为空
* 11位数手机号（13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9]{8}）

#### 错误提示

* `ER_CELLPHONE_EMPTY` 请输入手机号码
* `ER_CELLPHONE` 手机号码格式不正确



<span id="contactNumber"></span>
### `TEXTAREA-CONTACT-NUMBER`
**联系电话** 控件规范：用于描述联系电话控件规范

#### 验证规则

* 联系电话不能为空
* 国内联系电话/\d{3}-\d{8}|\d{4}-\d{7}/

#### 错误提示

* `ER_CONTACT_NUMBER_EMPTY` 请输入联系电话
* `ER_CONTACT_NUMBER` 联系电话格式不正确

****



## 通用人控件规范

<span id="realName"></span>
### `INPUT-REALNAME`

**人员姓名** 控件规范：用于描述人员姓名控件规范

#### 验证规则

* 不能为空
* 2-10位汉字|英文字母

#### 错误提示

* `ER_REALNAME_EMPTY` 请输入姓名
* `ER_REALNAME` 姓名格式不正确



<span id="staff"></span>
### `INPUT-STAFF`

**人员姓名** 控件规范：用于描述人员姓名控件规范

#### 验证规则

* 不能为空
* 2-10位汉字|英文字母

#### 错误提示

* `ER_STAFF_EMPTY` 请输入姓名
* `ER_ STAFF` 姓名格式不正确



<span id="avatar"></span>
### `AVATAR-UPLOAD`

**用户头像** 控件规范：用于描述用户头像控件规范

#### 验证规则

* 不能为空
* PNG|JPEG|JPG|GIF

#### 错误提示

* `ER_AVATAR_EMPTY` 请上传头像
* `ER_AVATAR` 上传头像格式不正确，支持PNG|JPEG|JPG|GIF等格式

****



## 通用密码控件规范

<span id="oldPassword"></span>
### `INPUT-OLDPASSWORD`

**原密码** 控件规范：用于描述原密码控件规范

#### 验证规则

* 不能为空
* 原密码不正确

#### 错误提示

* `ER_ OLDPASSWORD_EMPTY` 请输入原密码
* `ER_ OLDPASSWORD ` 原密码不正确



<span id="password"></span>
### `INPUT-PASSWORD`

**新密码** 控件规范：用于描述新密码控件规范

#### 验证规则

* 不能为空
* 6-30位必须包含英文字母和数字

#### 错误提示

* `ER_ PASSWORD_EMPTY` 请输入新密码
* `ER_ PASSWORD ` 新密码格式不正确



<span id="rePassword"></span>
### `INPUT-REPASSWORD`

**确认密码** 控件规范：用于描述确认密码控件规范

#### 验证规则

* 不能为空
* 确认密码 === 新密码

#### 错误提示

* `ER_REPASSWORD_EMPTY` 请输入确认密码
* `ER_REPASSWORD` 确认密码与新密码不相等

****



## 验证码控件规范

<span id="verificationCode"></span>
### `INPUT-VERIFICATION-CODE`

**手机验证码** 控件规范：用于描述手机验证码控件规范

#### 验证规则

* 不能为空
* 手机验证码不正确

#### 错误提示

* `ER_VERIFICATION_CODE_EMPTY` 请输入确认密码
* `ER_VERIFICATION_CODE` 手机验证码不正确



<span id="aliyunCapcha"></span>
### `ALIYUN-CAPCHA`

**滑动验证** 控件规范：用于描述登录滑动验证控件规范

#### 验证规则

* 进行滑动验证

#### 错误提示

* `ER_SLIDING_CAPTCHA` 进行滑动验证

****


## 其他控件规范
<span id="name"></span>
### `INPUT-NAME`

**名称** 控件规范：用于描述名称控件规范

#### 验证规则

* 不能为空
* 2-10位汉字

#### 错误提示

* `ER_NAME_EMPTY` 请输入名称
* `ER_NAME` 名称格式不正确



<span id="introduction"></span>
### `TEXTAREA-INTRODUCTION`

**简介** 控件规范：用于描述简介控件规范

#### 验证规则

* 简介不能为空
* 在6-1000字左右

#### 错误提示

* `ER_ INTRODUCTION_EMPTY` 请输入简介
* `ER_INTRODUCTION` 简介不少于6字，不多余1000字