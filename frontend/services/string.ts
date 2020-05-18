import moment from "moment-timezone";
import { WPCategoryColors } from "src/styles/css";

const TIME_ZONE = moment.tz.guess();

export function camelCaseToSnakeCase(str: string): string {
  return str.replace(/\.?([A-Z])/g, function(x, y) {
    return `_${y.toLowerCase()}`;
  }).replace(/^_/, "");
}

export function pluralize(number: number, string: string): string {
  if (number === 1) {
    return string;
  }

  return `${string}s`;
}

/**
 * @param {string} gmtDatetime : ISO 8601 date e.g: "2015-08-05T08:40:51.620Z"
 * @returns {String} e.g: "Sep 2nd 2007"
 */
export function formatDate(gmtDatetime: string): string {
  return moment.tz(gmtDatetime).local().format("MMM Do YYYY").toString();
}

export function getWPCategoryColor(categoryId: number): string {
  return WPCategoryColors[categoryId % WPCategoryColors.length];
}
