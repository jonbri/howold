// called for each member of window.aData
function transformData(o) {
  o.formattedAge = getFormattedDateDiff(o.birthday, moment());
  var sBirthdayCurrentYear = o.birthday.replace(
    /^[\d]+/,
    new Date().getFullYear()
  );
  var iBirthdayDayOfYear = getDayOfYear(sBirthdayCurrentYear);
  var iCurrentDayOfYear = getDayOfYear(moment());
  if (iBirthdayDayOfYear > iCurrentDayOfYear) {
    // birthday has not yet passed
    o.daysUntilBirthday = iBirthdayDayOfYear - iCurrentDayOfYear;
  } else {
    o.daysUntilBirthday = iBirthdayDayOfYear + (365 - iCurrentDayOfYear);
  }
  return o;
}

function getDayOfYear(m) {
  return parseInt(moment(m).format("DDD"));
}

// https://codepen.io/blackjacques/pen/RKPKba
function getFormattedDateDiff(date1, date2, intervals) {
  var b = moment(date1),
    a = moment(date2),
    out = [];
  intervals = intervals || ["years", "months"];
  function singularize(s, num) {
    return num === 1 ? s.slice(0, -1) : s;
  }
  intervals.forEach(function(interval) {
    var diff = a.diff(b, interval);
    b.add(diff, interval);
    if (diff > 0) {
      out.push(diff + " " + singularize(interval, diff));
    }
  });
  return out.join(", ") || "0";
}

// top-level React control
function Home(props) {
  function createTimestamp() {
    return React.createElement(
      "h3",
      null,
      "Today is " + moment().format("MMMM DD, YYYY") + "."
    );
  }
  function createTable(data) {
    function createHeaderRow() {
      return React.createElement("tr", null, [
        React.createElement("th", null, ""),
        React.createElement("th", null, ""),
        React.createElement("th", null, ""),
        React.createElement("th", null, "Days Until")
      ]);
    }
    function createRows() {
      return data.map(function(o) {
        return React.createElement("tr", null, [
          React.createElement("td", null, o.name),
          React.createElement("td", null, o.birthday),
          React.createElement("td", null, o.formattedAge),
          React.createElement("td", null, o.daysUntilBirthday)
        ]);
      });
    }
    return React.createElement(
      "table",
      {},
      [createHeaderRow()].concat(createRows())
    );
  }
  return React.createElement(
    "div",
    {},
    createTimestamp(),
    createTable(props.birthdays),
    React.createElement(
      "br", {}
    ),
    createTable(props.other)
  );
}

function go() {
  ReactDOM.render(
    React.createElement(
      Home,
      {
        birthdays: window.aData.birthdays.map(transformData),
        other: window.aData.other.map(transformData)
      },
      null
    ),
    document.getElementById("root")
  );
  setTimeout(go, 1000);
}
go();
