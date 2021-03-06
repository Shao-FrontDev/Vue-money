import dayjs from "dayjs";
import { ref } from "vue";
interface RecordItem {
  selectedTags: Array<String>;
  selectedNotes: string;
  selectedType: "-" | "+";
  selectedAmount: number;
  createAt?: any;
}

type CloneFunction = (data: RecordItem) => RecordItem;

export const clone: CloneFunction = data => {
  return JSON.parse(JSON.stringify(data));
};

export const calculate = (data: RecordItem, type: String) => {
  let number = 0;

  if (data.selectedType === type) {
    number += data.selectedAmount;
  }
  return number;
};

export const beautify = (value: Date) => {
  const day = dayjs(value);
  const now = dayjs();

  if (day.isSame(now, "day")) {
    return "今天";
  } else if (day.isSame(now.subtract(1, "day"), "day")) {
    return "昨天";
  } else if (day.isSame(now.subtract(2, "day"), "day")) {
    return "前天";
  } else if (day.isSame(now, "year")) {
    return day.format("M月D日");
  }
};

interface tagItem {
  value: number;
  name: string;
}

export const handlerDuplicated = (state: tagItem) => {
  let result: tagItem[] = [];
  let set = new Set();

  // @ts-ignore
  for (let obj of state) {
    if (set.has(obj.name)) {
      result = result.map(item => {
        if (item.name === obj.name) {
          item.value += obj.value;
          return item;
        } else {
          return item;
        }
      });
    } else {
      set.add(obj.name);
      result.push(obj);
    }
  }
  return result;
};

//获取当前月份
export const currentMonth = dayjs().format("YYYY-MM")
