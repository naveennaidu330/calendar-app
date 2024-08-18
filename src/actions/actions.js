import { addDays } from "date-fns";
import { MhahPanchang } from "mhah-panchang";
export const getdataBind = (dates) => {
  let _modified = dates?.reduce((accumilator, next) => {
    let _accumilator = [...[], ...accumilator];
    var obj = new MhahPanchang();
    // Getting the Panchang off the current date
    var _date = obj.calendar(addDays(next, 1), 17.385, 78.4867);
    // Binding the date and Panchang in a single object
    _accumilator.push({
      gregorian: next,
      vikramSamvat: {
        ...{},
        amantaDate: _date,
        calcDate: obj.calculate(addDays(next, 1)),
        sunTime: obj.sunTimer(addDays(next, 1), 17.385, 78.4867),
      },
    });
    return _accumilator;
  }, []);
  return _modified;
};
