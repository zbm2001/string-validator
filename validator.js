/**
 * @language: Javascript ECMA5
 * @name: datejs
 * @description: Javascript Date Object extend
 * @version: 1.0.0
 * @author: zbm2001@aliyun.com zhoubaimin@rongcapital.cn
 * @date: 2016-8-22
 * @copyright: Copyright (c) 2008-2016, Rong data service, Inc. (http://ruixuesoft.com). All rights reserved.
 * @license: See LICENSE and https://github.com/zbm2001/datejs/blob/master/LICENSE
 * @website: https://github.com/zbm2001/
 */

(function () {

  var rs = {

    roNumber: /^\d+$/,
    roInt: /^[-+]?\d+$/,
    roFloat: /^[-+]?\d+(?:\.\d+)?$/,
    rDoubleByte: /[^\x00-\xff]/,
    roDoubleByte: /^[^\x00-\xff]+$/,
    rDoubleByteG: /([^\x00-\xff]+)/g,
    rDoubleBytesG: /([^\x00-\xff]+)/g,
    rZh: /[\u4e00-\u9fa5\uf900-\ufa2d]/,
    roZh: /^[\u4e00-\u9fa5\uf900-\ufa2d]+$/,
    roMobileNumber: /^1\d{10}$/,
    // �绰������
    roAreaCode: /^0(?:10|2\d|[3-9]\d{2})$/,
    // �̶��绰����
    roTelNumber: /^[1-9]\d{6,7}$/,
    // �������
    roAreaNumber: /^(?:[1-6]\d{5}|(?:71|81|82)0{4})$/,
    // ���֤��
    roIdNumber: /^\d{17}[\dxX]$/,
    roEmail: /^[\w-.]+@(?:[\w-]+\.)+[a-z]+$/,
    roUrl: /^(?:[a-zA-Z]+:\/\/)?(?:\w+\.)+[a-z]+(?::\d+)?(?:\/\S*)?$/,
    roQQNumber: /^[1-9]\d{1,10}$/,
    roBloodTypeI: /^(?:[ABO]|AB)$/i,

    roHexColorI: /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i,
    roDate: /^\d{4}-(?:(?:0?2-(0[1-9]|[12][0-9]))|(?:0?[13578]|1[02])-(?:0?[1-9]|[1-2]\d|3[01])|(?:0?[469]|11)-(?:0?[1-9]|[1-2]\d|30))|(?:(?:(?:0[1-9]|[12][0-9])\/0?2)|(?:0?[1-9]|[1-2]\d|3[01])\/(?:0?[13578]|1[02])|(?:(?:0?[1-9]|[1-2]\d|30)\/0?[469]|11))\/\d{4}$/,
    roMonth: /^(?:0?[1-9]|1[0-2])$/,
    roWeek: /^(?:0?[1-9]|[1-4]\d|5[0-2])$/,
    roTime: /^(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$/,

    roMd5: /^[a-f0-9]{32}$/,
    oRoUuidIs: {
      3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
      4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
    }
  };

  //(function(rs) {
  //  Object.keys(rs).forEach(function (rName, i, rs) {
  //    var roName = '',
  //      r = rs[rName],
  //      roSource = '',
  //      gim = '';
  //
  //    if (rName.charAt(0) === 'r'){
  //      if(rName.charAt(1) !== 'o'){
  //        roName = 'ro' + rName.slice(1);
  //        if(!rs[roName]){
  //          roSource = '^(?:' + r.source + ')+$';
  //        }
  //      }
  //      else{
  //        roName = 'r' + rName.slice(2);
  //        if(!rs[roName] && r.source.charAt(0) === '^' && r.source.slcie(-1) === '$'){
  //          roSource = r.source.slice(0, -1);
  //        }
  //      }
  //    }
  //
  //    r.global && gim += 'g';
  //    r.ignoreCase && gim += 'i';
  //    r.multiline && gim += 'm';
  //
  //    rs[roName] = new RegExp(roSource, gim);
  //  });
  //})(rs);

  //(function(rs){
  //  var arrSfn = [];
  //  Object.keys(rs).forEach(function(rName, i, rs){
  //    if(rName.charAt(0) === 'r'){
  //      var sfn = ': function(s){ return this.' + rName + '.test(s); }';
  //      if(rName.charAt(1) === 'o'){
  //        arrSfn.push('is' + rName.slice(2) + sfn);
  //      }
  //      else{
  //        arrSfn.push('has' + rName.slice(1) + sfn);
  //      }
  //    }
  //  });
  //  console.log('{' + arrSfns.join(',') + '}');
  //})(rs);

  function Validator() {
  }

  Object.assign(Validator.prototype, rs, {
    /**
     * ����
     * @param {string} s
     * @returns {boolean}
     */
    isNumber: function (s) {
      return this.roNumber.test(s);
    },

    /**
     * ����
     * @param {string} s
     * @returns {boolean}
     */
    isInt: function (s) {
      return this.roInt.test(s);
    },

    /**
     * ��������
     * @param {string} s
     * @returns {boolean}
     */
    isFloat: function (s) {
      return this.roFloat.test(s);
    },

    /**
     * ����˫�ֽ�
     * @param {string} s
     * @returns {boolean}
     */
    hasDoubleByte: function (s) {
      return this.rDoubleByte.test(s);
    },

    /**
     * ֻ����˫�ֽ�
     * @param {string} s
     * @returns {boolean}
     */
    isDoubleByte: function (s) {
      return this.roDoubleByte.test(s);
    },

    /**
     * ��������
     * @param {string} s
     * @returns {boolean}
     */
    hasZh: function (s) {
      return this.rZh.test(s);
    },

    /**
     * ֻ��������
     * @param {string} s
     * @returns {boolean}
     */
    isZh: function (s) {
      return this.roZh.test(s);
    },

    /**
     * �ֻ�����
     * @param {string} s
     * @returns {boolean}
     */
    isMobileNumber: function (s) {
      return this.roMobileNumber.test(s);
    },

    /**
     * �绰������
     * @param {string} s
     * @returns {boolean}
     */
    isAreaCode: function (s) {
      return this.roAreaCode.test(s);
    },

    /**
     * �̶��绰����
     * @param {string} s
     * @returns {boolean}
     */
    isTelNumber: function (s) {
      return this.roTelNumber.test(s);
    },

    /**
     * �й���������
     * @param {string} s
     * @returns {boolean}
     */
    isAreaNumber: function (s) {
      return this.roAreaNumber.test(s);
    },

    /**
     * ���֤��
     * @param {string} s
     * @returns {boolean}
     */
    isIdNumber: function (s) {
      return this.roIdNumber.test(s) && this.isAreaNumber(s.slice(0, 6))
        && checkDate.bind(this)(s.slice(6, 14))
        && s.charAt(17).toUpperCase() === checksum(s.slice(0, 17));

      function checkDate(s){
        var year = s.slice(0, 4);
        return year >= 1900 &&��year <= new Date().getFullYear()
          && this.isDate(year + '-' + s.clice(4, 6), + '-' + s.clice(6, 8));
      }

      function checksum(idNumber17){
        var sum = 0;
        idNumber17.split('').reverse().forEach(function( n, i ){
          sum += n * (Math.pow(2, (i + 2) - 1) % 11);
        });
        sum = (12 - sum % 11) % 11;
        return sum > 9 ? 'X' : String(sum);
      }
    },

    /**
     * email ��ʽ
     * @param {string} s
     * @returns {boolean}
     */
    isEmail: function (s) {
      return this.roEmail.test(s);
    },

    /**
     * url ��ʽ
     * @param {string} s
     * @returns {boolean}
     */
    isUrl: function (s) {
      return s.length < 2084 && this.roUrl.test(s);
    },

    /**
     * QQ ��
     * @param {string} s
     * @returns {boolean}
     */
    isQQNumber: function (s) {
      return this.roQQNumber.test(s);
    },

    /**
     * Ѫ��
     * @param {string} s
     * @returns {boolean}
     */
    isBloodTypeI: function (s) {
      return this.roBloodTypeI.test(s);
    },

    /**
     * rgb256ɫ
     * @param {string} s
     * @returns {boolean}
     */
    isHexColor: function (s) {
      return this.roHexColorI.test(s);
    },

    /**
     * md5���ܴ���ʽ
     * @param {string} s
     * @returns {boolean}
     */
    isMd5: function (s) {
      return this.roMd5.test(s);
    },

    /**
     * uuid��ʽ���ְ汾��
     * @param {string} s
     * @param {number|string} version
     * @returns {boolean}
     */
    isUuid: function (s, version) {
      var r = this.oRoUuidIs[version];
      return !!r && r.test(s);
    },

    /**
     * ���ڸ�ʽ maxlength="10"
     * @param {string} s
     * @returns {boolean}
     */
    isDate: function(s, format){
      var year = s.slice(0,4);
      return this.roDate.test(s) && ( RegExp.$1 !== '29' || ( !(year%4) && !!(year%400) ) );
    },

    /**
     * �·� 1-12
     * @param {string} s
     * @returns {boolean}
     */
    isMonth: function (s) {
      return this.roMonth.test(s);
    },

    /**
     * ���� 1-52
     * @param {string} s
     * @returns {boolean}
     */
    isWeek: function (s) {
      return this.roWeek.test(s);
    },

    /**
     * ʱ���ʽ hh:mm:ss SSS
     * @param {string} s
     * @returns {boolean}
     */
    isTime: function (s) {
      return this.roTime.test(s);
    },

    /**
     * ��ȡ�ַ������ֽڳ���
     * @param {string} s
     * @returns {number}
     */
    getByteLength: function (s) {
      return s.replace(this.roDoubleBytesG, "$1$1").length;
    }
  });

})();