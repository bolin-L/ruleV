import validator from './validator';

function getValueStepIn(attr, obj) {
    const attribute = (attr || '').toString();
    const source = obj || {};

    if (source[attribute]) {
        return source[attribute];
    }

    const dotReg = /[^.[\]]+/g;
    const attrSteps = attribute.match(dotReg) || [];
    let tmp = source;
    let i = 0;

    do {
        tmp = tmp[attrSteps[i]];
        i++;
    } while (tmp && i < attrSteps.length);

    return tmp;
}

function check(value = '', rules = [], checkAttr, source) {
    let conclusion = {
        success: true,
        message: '',
        checkAttr,
    };
    // eslint-disable-next-line valid-typeof
    let success = true;
    let rule;

    if (rules.length === 0) {
        return conclusion;
    }

    for (let i = 0, len = rules.length; i < len; i++) {
        rule = rules[i] || {};

        if (validator[rule.type]) {
            success = validator[rule.type].call(null, value || '', rule);
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

function checkAll(source, ruleConfig, immediately = true) {
    const errors = [];
    let value;
    let checkAttr;

    for (checkAttr in ruleConfig) {
        if (Object.prototype.hasOwnProperty.call(ruleConfig, checkAttr)) {
            value = getValueStepIn(checkAttr, source);

            const result = check(value, ruleConfig[checkAttr], checkAttr, source);

            if (!result.success) {
                errors.push(result);

                if (immediately) {
                    break;
                }
            }
        }
    }

    return errors;
}

export default {
    getValueStepIn,
    check,
    checkAll,
};
