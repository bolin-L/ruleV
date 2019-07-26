import validator from './validator';

let ruleV = validator;
/**
 * 增强/覆盖校验对象，与默认校验方法合并
 * @param {object} enhance - 校验方法对象
 * @param {boolean} override - 覆盖源校验对象方法，如果有同名方法
 * @returns {object}
 */
function install(enhance, override) {
    ruleV = override ? Object.assign({}, ruleV, enhance) : Object.assign({}, enhance, ruleV);
    return ruleV;
}

/**
 * 递进获取对象属性
 * @param {string} attr - 对象的属性
 * @param {object} obj - 源对象
 * @example
 * // return 1
 * getValueStepIn('a.b', { a: { b: 1 } })
 * @returns <any>
 */
function getValueStepIn(attr, obj) {
    const attribute = (attr || '').toString();
    const source = obj || {};

    if (source[attribute]) {
        return source[attribute];
    }

    const dotReg = /[^.[\]]+/g;
    /** 兼容 a.b 与 a[b] */
    const attrSteps = attribute.match(dotReg) || [];
    let tmp = source;
    let i = 0;

    do {
        tmp = tmp[attrSteps[i]];
        i++;
    } while (tmp && i < attrSteps.length);

    return tmp;
}

/**
 * 单个值校验
 * @param {string} value - 需要校验的值
 * @param {array} rules - 校验规则数组
 * @param {string} [ checkAttr ] - 需要被校验的属性(可选), type为自定义校验方法时可用
 * @param {object} [ source ] - 属性的源对象(可选) , type为自定义校验方法时可用
 * @example
 * // return { success: false, message: '请输入正确的手机号码', checkAttr: undefined, }
 * check('123412', [ { type: 'isRequired', message: '请输入手机号码' }, { type: 'isMobilePhone', message: '请输入正确的手机号码' } ])
 * @returns {object} { success: true, message: '', checkAttr, }
 */
function check(value = '', rules = [], checkAttr, source) {
    let conclusion = {
        success: true,
        message: '',
        checkAttr,
    };
    let success = true;
    let rule;

    if (rules.length === 0) {
        return conclusion;
    }

    for (let i = 0, len = rules.length; i < len; i++) {
        rule = rules[i] || {};

        if (ruleV[rule.type]) {
            success = ruleV[rule.type].call(null, value || '', rule);
        } else if (rule.method && typeof rule.method === 'function') {
            success = rule.method.call(null, value, rule, checkAttr, source);
        } else {
            conclusion = {
                success: false,
                message: '找不到此规则的校验方法',
                checkAttr,
            };
        }

        if (!success || !conclusion.success) {
            conclusion.message = rule.message || conclusion.message;
            conclusion.success = false;
            break;
        }
    }

    return conclusion;
}

/**
 * 根据属性配置进行批量校验
 * @param {object} source - 需要校验的属性的源对象
 * @param {object} ruleConfig - 需要校验的属性与校验规则数组的配置对象
 * @param {boolean} immediately - 校验第一个错误立即停止返回
 * @example
 * // return [ { success: false, message: '请输入正确的手机号码', checkAttr: 'user.mobile', } ]
 * checkAll({ user: { mobile: '12345' } }, { 'user.mobile': [ { type: 'isRequired', message: '请输入手机号码' }, { type: 'isMobilePhone', message: '请输入正确的手机号码' } ] })
 * @returns {array}
 */
function checkAll(source, ruleConfig, immediately = true) {
    const errors = [];
    let value;

    const keys = Object.keys(ruleConfig);
    for (let index = 0; index < keys.length; index++) {
        const checkAttr = keys[index];
        value = getValueStepIn(checkAttr, source);

        const result = check(value, ruleConfig[checkAttr], checkAttr, source);

        if (!result.success) {
            errors.push(result);

            if (immediately) {
                break;
            }
        }
    }

    return errors;
}

export default {
    getValueStepIn,
    check,
    checkAll,
    install,
    validator: ruleV,
};
