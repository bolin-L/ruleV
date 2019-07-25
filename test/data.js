module.exports = {
    getValueStepInData: {
        age: 18,
        address: {
            province: '浙江',
            city: '杭州',
        },
    },
    checkRuleConfig: {
        'applicant.cname': [
            {
                type: 'isFilled',
                message: '请输入投保人姓名',
            },
        ],
        'applicant.cardCode': [
            {
                type: 'isFilled',
                message: '请输入投保人身份证号码',
            },
            {
                type: 'isIdCard',
                message: '请输入正确的身份证号码',
            },
        ],
        'insurants.cardCode': [
            {
                method(value) {
                    const ID_CARD_REG = /^\d{15}$|\d{17}[Xx]$|\d{18}$/;
    
                    return ID_CARD_REG.test(value);
                },
                message: '请输入正确的身份证号码',
            },
        ],
        'insurants.mobile': [
            {
                type: 'isMobilePhone',
                message: '请输入正确的手机号码',
            },
        ],
        'compare.a': [
            {
                method(value, rule, attr, source) {
                    if (attr === 'compare.a' && rule) {
                        return value > source.compare.b;
                    }
                    return false;
                },
                message: '请输入正确的手机号码',
            },
        ],
    },
    checkSourceData: {
        applicant: {
            cname: '廖柏林',
            cardCode: 'xxxxxxsss',
        },
        insurants: {
            cardCode: '452123199271001011',
            mobile: '',
        },
        compare: {
            a: 5,
            b: 2,
        },
    },
    notExistRule: [
        {
            type: 'isNotExist',
            message: '这个校验方法不存在',
        },
    ],
    notExistRule1: [
        {
            type: 'isNotExist',
        },
    ],
};
