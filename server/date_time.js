'use strict';

require('date-utils');

var moment = require('moment-timezone');

module.exports = {

	/**
	 * 現在日時(ミリ秒)をフォーマットして返します。
	 * フォーマットを指定しなかった場合はデフォルトのフォーマットを適用します。
	 *
	 * @param format {String} - フォーマット
	 * @return フォーマットされた日本現在時刻(ミリ秒)
	 */
	moment: function (format) {
		return this.momentAsJST().format(format || constants.TIMESTAMP_FORMAT);
	},
	/**
	 * 指定日時を日本時刻で返します。
	 * @return 日本現在時刻
	 */
	momentSetDate: function (date, format) {
		return this.momentAsJSTSetDate(date).format(format || constants.TIMESTAMP_FORMAT);
	},
	/**
	 * 現在日時を日本時刻で返します。
	 * @return 日本現在時刻
	 */
	momentAsJST: function () {
		return moment().tz("Asia/Tokyo");
	},
	/**
	 * 指定日時を日本時刻で返します。
	 * @return 日本現在時刻
	 */
	momentAsJSTSetDate: function (date) {
		return moment(date).tz("Asia/Tokyo");
	},
	/**
	 * 現在日時をフォーマットして返します。
	 * フォーマットを指定しなかった場合はデフォルトのフォーマットを適用します。
	 *
	 * @param format {String} - フォーマット
	 * @return フォーマットされた日本現在時刻
	 */
	now: function(format) {
		return this.momentAsJST().format(format || 'YYYY-MM-DD HH:mm:ss');
	}
};
