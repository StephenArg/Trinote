/**
 * Sorting of cell text whose type isn't known in advance, following Trilium's `autoSort`
 * (`packages/commons/src/lib/auto_sort.ts`): each value is a time, a date, a number, text or empty. Ascending order is
 * times, dates, numbers, then text; descending reverses that; empties always come last; equal values keep their order.
 */
(function (global) {
  'use strict';

  var KIND_RANKS = { time: 0, date: 1, number: 2, text: 3, empty: 4 };
  // A sign and a currency symbol in either order, then digits with grouping and decimal marks.
  var NUMBER_START = /^([-+−]?)(?:\p{Sc}\s*)?([-+−]?)(\d+(?:(?:[.,]|[\s'’](?=\d{3}(?!\d)))\d+)*)/u;

  function parseDigits(run, decimalMark) {
    var groups = run.split(/\D/);
    var marks = run.match(/\D/g) || [];
    var last = marks.length - 1;
    var lastMark = marks[last];
    var decimalAt = -1;
    if (lastMark === '.' || lastMark === ',') {
      var isUnique = marks.indexOf(lastMark) === last;
      var hasOtherMark = marks.indexOf(lastMark === '.' ? ',' : '.') !== -1;
      if (hasOtherMark && !isUnique) return null;
      var isDecimalByDigits = groups[last + 1].length !== 3 || lastMark === decimalMark;
      if (hasOtherMark || (isUnique && isDecimalByDigits)) decimalAt = last;
    }
    for (var i = 1; i < groups.length; i++) {
      if (i - 1 !== decimalAt && groups[i].length !== 3) return null;
    }
    var integer = groups.slice(0, decimalAt === -1 ? undefined : decimalAt + 1).join('');
    var fraction = decimalAt === -1 ? '0' : groups[decimalAt + 1];
    return Number(integer + '.' + fraction);
  }

  function parseNumber(text, decimalMark) {
    var match = NUMBER_START.exec(text);
    if (!match) return null;
    var value = parseDigits(match[3], decimalMark);
    if (value === null || (match[1] && match[2])) return null;
    var sign = match[1] || match[2];
    return sign === '-' || sign === '−' ? -value : value;
  }

  function parseTime(text) {
    var match = /^(\d{1,2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?\s*([AaPp][Mm])?$/.exec(text);
    if (!match) return null;
    var hour = Number(match[1]);
    var meridiem = match[5] && match[5].toLowerCase();
    if (meridiem) {
      if (hour < 1 || hour > 12) return null;
      hour = (hour % 12) + (meridiem === 'pm' ? 12 : 0);
    } else if (hour > 23) {
      return null;
    }
    var minute = Number(match[2]);
    var second = Number(match[3] || 0);
    if (minute > 59 || second > 59) return null;
    return hour * 3600 + minute * 60 + second + Number(match[4] || 0) / 1000;
  }

  function validDate(year, month, day) {
    var date = new Date(Date.UTC(year, month - 1, day));
    return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day ? date.getTime() : null;
  }

  /** Which of `D/M/Y` and `M/D/Y` the locale writes. */
  function dayComesFirst(locale) {
    try {
      var parts = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(new Date(2000, 11, 25));
      return parts.findIndex(function (p) { return p.type === 'day'; }) < parts.findIndex(function (p) { return p.type === 'month'; });
    } catch (e) { return false; }
  }

  function parseDate(text, dayFirst) {
    var match = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(text);
    if (match) return validDate(Number(match[1]), Number(match[2]), Number(match[3]));
    match = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(text);
    if (match) return validDate(Number(match[3]), Number(match[2]), Number(match[1]));
    match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(text);
    if (match) {
      return dayFirst ? validDate(Number(match[3]), Number(match[2]), Number(match[1]))
        : validDate(Number(match[3]), Number(match[1]), Number(match[2]));
    }
    // "May 3, 2024" and "3 May 2024", with or without a weekday; month names need a word and a four-digit year.
    if (/[A-Za-z]{3}/.test(text) && /\b\d{4}\b/.test(text) && /\b\d{1,2}\b/.test(text)
      && /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(text)) {
      var parsed = Date.parse(text);
      return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
  }

  function classifier(locale) {
    var decimalMark = '.';
    try {
      if (new Intl.NumberFormat(locale).formatToParts(1.5).some(function (p) { return p.type === 'decimal' && p.value === ','; })) decimalMark = ',';
    } catch (e) {}
    var dayFirst = dayComesFirst(locale);
    return function (raw) {
      var text = String(raw || '').trim();
      if (!text) return { kind: 'empty', key: 0, text: text };
      var time = parseTime(text);
      if (time !== null) return { kind: 'time', key: time, text: text };
      var date = parseDate(text, dayFirst);
      if (date !== null) return { kind: 'date', key: date, text: text };
      var number = parseNumber(text, decimalMark);
      if (number !== null) return { kind: 'number', key: number, text: text };
      return { kind: 'text', key: 0, text: text };
    };
  }

  function autoSort(items, textOf, options) {
    var locale = options && options.locale;
    var direction = options && options.isDescending ? -1 : 1;
    var classify = classifier(locale);
    var collator = new Intl.Collator(locale, { numeric: true, sensitivity: 'accent' });
    return items
      .map(function (item, index) { return { item: item, index: index, value: classify(textOf(item)) }; })
      .sort(function (a, b) {
        var emptyA = a.value.kind === 'empty';
        var emptyB = b.value.kind === 'empty';
        if (emptyA || emptyB) return (Number(emptyA) - Number(emptyB)) || (a.index - b.index);
        var order = KIND_RANKS[a.value.kind] - KIND_RANKS[b.value.kind]
          || a.value.key - b.value.key
          || collator.compare(a.value.text, b.value.text);
        return (order * direction) || (a.index - b.index);
      })
      .map(function (entry) { return entry.item; });
  }

  global.trinoteAutoSort = autoSort;
})(window);
