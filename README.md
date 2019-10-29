## npm 规则校验工具 ruleV
* 大小4kb, 其他完整的校验库太大也用不到，有点浪费
* 可以集成[validator](https://github.com/validatorjs/validator.js)，做底层校验
* 自定义覆盖底层校验方法

## 安装

```
npm install rulev --save
```

## 使用

### 单个校验

```
import ruleV from 'rulev';

rulev.check('123456', { type: 'isMobilePhone', message: '请输入正确的手机号' });
// return { success: false, message: '请输入正确的手机号' }

```

### 校验对象

```
import ruleV from 'rulev';

const source = { a: 1, b: { c: '啦啦啦' } };
const ruleConfig = { 
    a: [{ type: 'isRquired', message: '值不能为空' }],
    'b.c': [
        { type: 'isRquired', message: '请输入字符' },
        { type: 'isEnglish', message: '请输入英文字符' },
    ] 
}

rulev.checkAll(source, ruleConfig);
// return { success: false, message: '请输入英文字符', checkAttr: 'b.c' }
```

### 覆盖/增强顶层校验

```
import ruleV from 'rulev';

ruleV.install({
    isMe(name) { return name === 'me' }
});

ruleV.check('me', { type: 'isMe' }); // true

```


## Functions

<dl>
<dt><a href="#install">install(enhance, override)</a> ⇒ <code>object</code></dt>
<dd><p>增强/覆盖校验对象，与默认校验方法合并</p>
</dd>
<dt><a href="#getValueStepIn">getValueStepIn(attr, obj)</a> ⇒</dt>
<dd><p>递进获取对象属性</p>
</dd>
<dt><a href="#check">check(value, rules, [checkAttr], [source], errReturnWay)</a> ⇒ <code>object</code></dt>
<dd><p>单个值校验</p>
</dd>
<dt><a href="#checkAll">checkAll(source, ruleConfig, immediately, errReturnWay)</a> ⇒ <code>array</code></dt>
<dd><p>根据属性配置进行批量校验</p>
</dd>
<dt><a href="#is">is(value, rule)</a> ⇒ <code>boolean</code></dt>
<dd><p>正则校验值</p>
</dd>
<dt><a href="#isRequired">isRequired(value)</a> ⇒ <code>boolean</code></dt>
<dd><p>校验值是否为空</p>
</dd>
<dt><a href="#isFilled">isFilled(value)</a> ⇒ <code>boolean</code></dt>
<dd><p>校验值是在trim后否存在</p>
</dd>
<dt><a href="#isChinese">isChinese(value)</a> ⇒ <code>boolean</code></dt>
<dd><p>检查值是否全为中文</p>
</dd>
<dt><a href="#isEnglish">isEnglish(value)</a> ⇒ <code>boolean</code></dt>
<dd><p>检查值是否全为英文字符a-zA-Z</p>
</dd>
<dt><a href="#isName">isName(value)</a> ⇒ <code>boolean</code></dt>
<dd><p>检查值是否全为中英文混合/姓名</p>
</dd>
<dt><a href="#isLength">isLength(value, rule)</a> ⇒ <code>boolean</code></dt>
<dd><p>检查值的长度是否在限制的范围</p>
</dd>
<dt><a href="#calDateAndSex">calDateAndSex(length, id)</a> ⇒ <code>boolea</code></dt>
<dd><p>根据位数计算身份证的合理性</p>
</dd>
<dt><a href="#strictValidateIdCard">strictValidateIdCard(idCard)</a> ⇒ <code>boolean</code></dt>
<dd><p>严格校验身份证</p>
</dd>
<dt><a href="#isIdCard">isIdCard(value)</a> ⇒ <code>boolean</code></dt>
<dd><p>检查值是否符合身份证 15|17X|18位</p>
</dd>
<dt><a href="#isQQ">isQQ(value)</a> ⇒ <code>boolean</code></dt>
<dd><p>检查值是否符合QQ号 4+位数字</p>
</dd>
<dt><a href="#isMobilePhone">isMobilePhone(value)</a> ⇒ <code>boolean</code></dt>
<dd><p>检查值是否符合手机号</p>
</dd>
<dt><a href="#isBasePassword">isBasePassword(value)</a> ⇒ <code>boolean</code></dt>
<dd><p>检查值是否符合简单密码 5-17位的大小写数字</p>
</dd>
<dt><a href="#isSafePassword">isSafePassword(value)</a> ⇒ <code>boolean</code></dt>
<dd><p>检查值是否符合复杂密码 6-18位的大小写数字组合，开头必须英文字符</p>
</dd>
<dt><a href="#isEmail">isEmail(value)</a> ⇒ <code>boolean</code></dt>
<dd><p>检查值是否是邮箱</p>
</dd>
</dl>

<a name="install"></a>

## install(enhance, override) ⇒ <code>object</code>
增强/覆盖校验对象，与默认校验方法合并

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| enhance | <code>object</code> | 校验方法对象 |
| override | <code>boolean</code> | 覆盖源校验对象方法，如果有同名方法 |

<a name="getValueStepIn"></a>

## getValueStepIn(attr, obj) ⇒
递进获取对象属性

**Kind**: global function  
**Returns**: <any>  

| Param | Type | Description |
| --- | --- | --- |
| attr | <code>string</code> | 对象的属性 |
| obj | <code>object</code> | 源对象 |

**Example**  
```js
// return 1
getValueStepIn('a.b', { a: { b: 1 } })
```
<a name="getValueStepIn..attrSteps"></a>

### getValueStepIn~attrSteps
兼容 a.b 与 a[b]

**Kind**: inner constant of [<code>getValueStepIn</code>](#getValueStepIn)  
<a name="check"></a>

## check(value, rules, [checkAttr], [source], errReturnWay) ⇒ <code>object</code>
单个值校验

**Kind**: global function  
**Returns**: <code>object</code> - { success: true, message: '', checkAttr, }  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | 需要校验的值 |
| rules | <code>array</code> | 校验规则数组 |
| [checkAttr] | <code>string</code> | 需要被校验的属性(可选), type为自定义校验方法时可用 |
| [source] | <code>object</code> | 属性的源对象(可选) , type为自定义校验方法时可用 |
| errReturnWay | <code>boolean</code> | 校验失败返回方式 message|boolean|错误对象 |

<a name="checkAll"></a>

## checkAll(source, ruleConfig, immediately, errReturnWay) ⇒ <code>array</code>
根据属性配置进行批量校验

**Kind**: global function  
**Returns**: <code>array</code> - [ { success: false, message: '请输入正确的手机号码', checkAttr: 'user.mobile', } ]  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source | <code>object</code> |  | 需要校验的属性的源对象 |
| ruleConfig | <code>object</code> |  | 需要校验的属性与校验规则数组的配置对象 |
| immediately | <code>boolean</code> | <code>true</code> | 校验第一个错误立即停止返回 |
| errReturnWay | <code>boolean</code> |  | 校验失败返回方式 message|boolean|错误数组 |

**Example**  
```js
checkAll({ user: { mobile: '12345' } }, { 'user.mobile': [ { type: 'isRequired', message: '请输入手机号码' }, { type: 'isMobilePhone', message: '请输入正确的手机号码' } ] })
```
<a name="is"></a>

## is(value, rule) ⇒ <code>boolean</code>
正则校验值

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | 需要校验的值 |
| rule | <code>object</code> | 校验规则 reg || { reg: /xxx/ } |

<a name="isRequired"></a>

## isRequired(value) ⇒ <code>boolean</code>
校验值是否为空

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | 需要校验的值 |

<a name="isFilled"></a>

## isFilled(value) ⇒ <code>boolean</code>
校验值是在trim后否存在

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | 需要校验的值 |

<a name="isChinese"></a>

## isChinese(value) ⇒ <code>boolean</code>
检查值是否全为中文

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | 需要校验的值 |

<a name="isEnglish"></a>

## isEnglish(value) ⇒ <code>boolean</code>
检查值是否全为英文字符a-zA-Z

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | 需要校验的值 |

<a name="isName"></a>

## isName(value) ⇒ <code>boolean</code>
检查值是否全为中英文混合/姓名

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | 需要校验的值 |

<a name="isLength"></a>

## isLength(value, rule) ⇒ <code>boolean</code>
检查值的长度是否在限制的范围

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | 需要校验的值 |
| rule | <code>object</code> | 校验的规则 { min: 1, max: 5 } | { options: { min: 1, max: 5 } } |

<a name="calDateAndSex"></a>

## calDateAndSex(length, id) ⇒ <code>boolea</code>
根据位数计算身份证的合理性

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| length | <code>Number</code> | 身份证位数 |
| id | <code>String</code> | 身份证号 |

<a name="strictValidateIdCard"></a>

## strictValidateIdCard(idCard) ⇒ <code>boolean</code>
严格校验身份证

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| idCard | <code>String</code> | 身份证号 |

<a name="isIdCard"></a>

## isIdCard(value) ⇒ <code>boolean</code>
检查值是否符合身份证 15|17X|18位

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | 需要校验的身份证号 |

<a name="isQQ"></a>

## isQQ(value) ⇒ <code>boolean</code>
检查值是否符合QQ号 4+位数字

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | 需要校验的QQ号 |

<a name="isMobilePhone"></a>

## isMobilePhone(value) ⇒ <code>boolean</code>
检查值是否符合手机号

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | 需要校验的手机号 |

<a name="isBasePassword"></a>

## isBasePassword(value) ⇒ <code>boolean</code>
检查值是否符合简单密码 5-17位的大小写数字

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | 需要校验的密码 |

<a name="isSafePassword"></a>

## isSafePassword(value) ⇒ <code>boolean</code>
检查值是否符合复杂密码 6-18位的大小写数字组合，开头必须英文字符

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | 需要校验的密码 |

<a name="isEmail"></a>

## isEmail(value) ⇒ <code>boolean</code>
检查值是否是邮箱

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | 需要校验的密码 |


## CHANGE LOG

**2019-10-29 - 1.0.5**

【A】- 添加isEmail内置校验规则
【A】- checkAll、check方法支持通过传参数errReturnWay指定校验结果返回格式 boolean | message, 默认返回Array|Object

**2019-10-14 - 1.0.3**

【A】- 支持身份证通过strict字段配置严格校验

**2019-09-04 - 1.0.2**

【A】- 支持身份证校验最后以为x